# 🎮 Pokémon Battle Card Game

A simple **frontend-only Pokémon card battle simulator** built with **HTML, CSS, and JavaScript**, The data comes from the [PokéAPI](https://pokeapi.co/).
It’s a simple card-style game where two random Pokémon are generated, and you battle based on their stats. 

---

## 🚀 How to Run
- Just download/clone the files and open **index.html** in your browser.  
- If you’re using VS Code, you can also run it with the **Live Server extension** (that’s what I used while building it). 

---

## 🕹️ Features
- Fetches two **random Pokémon** from PokéAPI when **New Battle** is clicked.  
- Lets you **pick one Pokémon**, and the other goes to the CPU.  
- Compares their stats (**Attack, Defense, Speed**) to decide who wins.  
- There’s also a **Best-of-3 mode** if you want longer battles.  
- A **scoreboard** keeps track of the results, and you can reset it anytime using **Reset Score** button.  

---

## 🎯 How to Play
1. Click **New Battle** to generate two random Pokémon.  
2. Choose your fighter by clicking **Select** under one of the Pokémon.  
3. The CPU will automatically take the other Pokémon.  
4. The winner is decided based on:
   - Higher **Attack** stat (+1 point)  
   - Higher **Defense** stat (+1 point)  
   - Higher **Speed** stat (+1 point)  
5. Whoever wins more categories wins the round.  

✅ If **Best-of-3 Mode** is enabled → first to win 2 rounds wins the series.  

---

## ✨ Bonus Features
- Series outcomes: 🎉 **Win**, 😢 **Lose**, 🤝 **Tie**.  
- Fun gradient background + styled Pokémon cards + modern styling
- Works on any browser (no backend needed). 

---

