const API = "https://pokeapi.co/api/v2/pokemon/";
let playerWins = 0;
let cpuWins = 0;
let currentPair = [null, null];
let playerPick = null;
let cpuPick = null;

let bestOf3 = false;
let series = { player: 0, cpu: 0, round: 1, max: 1 };


async function getRandomPokemon() {
  let id = Math.floor(Math.random() * 200) + 1; 
  let res = await fetch(API + id);
  let data = await res.json();
  return {
    name: data.name,
    img: data.sprites.front_default,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat
  };
}


async function newBattle() {
  playerPick = null;
  cpuPick = null;
  series = { player: 0, cpu: 0, round: 1, max: bestOf3 ? 3 : 1 };
  updateRoundInfo();
  document.getElementById("battle-result").textContent = "Pick your fighter!";

  let p1 = await getRandomPokemon();
  let p2 = await getRandomPokemon();

  currentPair = [p1, p2];
  showPokemon(p1, 1);
  showPokemon(p2, 2);
}

function showPokemon(p, idx) {
  document.getElementById(`poke${idx}-name`).textContent = p.name.toUpperCase();
  document.getElementById(`poke${idx}-img`).src = p.img;
  document.getElementById(`poke${idx}-attack`).textContent = p.attack;
  document.getElementById(`poke${idx}-defense`).textContent = p.defense;
  document.getElementById(`poke${idx}-speed`).textContent = p.speed;
}


function selectPokemon(which) {
  playerPick = currentPair[which - 1];
  cpuPick = currentPair[which === 1 ? 1 : 0];
  playRound();
}


function playRound() {
  let ps = 0, cs = 0;

  if (playerPick.attack > cpuPick.attack) ps++; else if (cpuPick.attack > playerPick.attack) cs++;
  if (playerPick.defense > cpuPick.defense) ps++; else if (cpuPick.defense > playerPick.defense) cs++;
  if (playerPick.speed > cpuPick.speed) ps++; else if (cpuPick.speed > playerPick.speed) cs++;

  if (ps > cs) {
    series.player++;
    document.getElementById("battle-result").textContent =
      `Round ${series.round}: You win!`;
  } else if (cs > ps) {
    series.cpu++;
    document.getElementById("battle-result").textContent =
      `Round ${series.round}: CPU wins!`;
  } else {
    document.getElementById("battle-result").textContent =
      `Round ${series.round}: It's a draw.`;
  }

  updateRoundInfo();

  // To Check if the series ends or not
  const need = Math.ceil(series.max / 2);
  if (series.player === need || series.cpu === need || series.round === series.max) {
    endSeries();
  } else {
    series.round++;
    updateRoundInfo();
  }
}

function endSeries() {
  if (series.player > series.cpu) {
    playerWins++;
    document.getElementById("battle-result").textContent += " 🎉 Series Won!";
  } else if (series.cpu > series.player) {
    cpuWins++;
    document.getElementById("battle-result").textContent += " 😢 Series Lost!";
  } else {
    document.getElementById("battle-result").textContent += " 🤝 Series Tied!";
  }
  updateScore();
}

function updateScore() {
  document.getElementById("player-wins").textContent = playerWins;
  document.getElementById("cpu-wins").textContent = cpuWins;
}

function updateRoundInfo() {
  document.getElementById("round-info").textContent =
    `Round: ${series.round} / ${series.max}`;
}


document.getElementById("new-battle").addEventListener("click", newBattle);
document.getElementById("select-poke1").addEventListener("click", () => selectPokemon(1));
document.getElementById("select-poke2").addEventListener("click", () => selectPokemon(2));
document.getElementById("reset-score").addEventListener("click", () => {
  playerWins = 0;
  cpuWins = 0;
  updateScore();
  document.getElementById("battle-result").textContent = "Scores reset. Start a new battle!";
});
document.getElementById("bestof3").addEventListener("change", (e) => {
  bestOf3 = e.target.checked;
  document.getElementById("battle-result").textContent =
    bestOf3 ? "Best-of-3 Mode ON" : "Best-of-3 Mode OFF";
});


newBattle();
