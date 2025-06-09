## Browser-based Item Tracker for A Link to the Past
```
v 6.0.0
by qcent 06/2025
ALL VERSIONS PRE v6.0.0
by crossproduct (twitch.tv/crossproduct)
and Ohga / halfarebel (twitch.tv/halfarebel)
2017/04/07 - 2017/09/30

                                            ^
                                            |
                   /\    ¯¯¯||¯¯¯ |   |¯- |¯|¯|    /\
                  /__\     / |__  |   |  \|_|_|   /__\
                 /\  /\   /  |    |   |  /| | |  /\  /\
                /__\/__\ |__ |___ |___|_- | | | /__\/__\
                                            ^
                                            ^
```
---

## 📚 Table of Contents

- [📜 Introduction](#introduction)
- [🙏 Special Thanks](#special-thanks)
- [📬 Contact OG Author: crossproduct](#contact-crossproduct)
- [📦 Distribution](#distribution)
- [📝 Version History](#version-history)
- [🚀 Tracker Instructions](#tracker-instructions)
  - [🗂 Opening](#-opening)
  - [🧰 Item Tracker](#-item-tracker)
  - [🗺 Location Tracker](#-location-tracker)
- [⌨️ Hotkeys](#hotkeys)
  - [🔹 Item Toggle Hotkeys](#-item-toggle-hotkeys)
  - [🔹 Map View Hotkeys](#-map-view-hotkeys)
  - [🔹 Current Dungeon Selection](#-current-dungeon-selection)
  - [🔹 Current Dungeon Actions](#-current-dungeon-actions)
  - [🔹 Medallion Selector (Dungeons 8 & 9)](#-medallion-selector-dungeons-8--9)


## (:::[========> Introduction <========]:::)
This tracker is designed for use with **A Link to the Past** randomizer streams.  
It's browser-based, so it should work on most platforms!  
Just open the tracker in your browser and do a **Window Capture** in OBS.

-> Start playing ALttP Randomizer today!


## (:::[========> Special Thanks <========]:::)

### Randomizer Developers
- Karkat (mmxbass)
- Dessyreqt
- Veetorp

### Support
- jet082  
- WildAnaconda69  
- Alucard2004  
- uphier  

## (:::[========> Contact crossproduct <========]:::) 

Have questions or comments about the tracker?  
Feature or icon skin requests?  
Found a bug or a logic issue?

Reach out here:

- **Twitch:** [twitch.tv/crossproduct](https://twitch.tv/crossproduct)
- **ALTTP Discord:** [discordapp.com/invite/3Bsfnwk](https://discordapp.com/invite/3Bsfnwk)

## (:::[========> Distribution <========]:::) 

Feel free to share this tracker by posting a link to **[my Twitch channel](https://twitch.tv/crossproduct)**.

**Do NOT distribute this tracker on your own website!**  
If you want to modify and redistribute it, follow these guidelines:

- **Ask permission.** Let me know how and why you are changing and sharing it.
- Contact me via **Twitch or Discord**.
- **Changes must be significant!**
  - ✅ GOOD: layout customizability, non-browser platform, new features, etc.
  - ❌ BAD: minor logic fixes, icon customization.
- You must **credit me** and **link to my Twitch**.


## (:::[========> Version History <========]:::) 

### v6.0.0
- Split world map into Light and Dark World maps.
- Split map chests into Light and Dark World.
- Embiggened boss icons on map.
- Responsive (vertical, horizontal) Flex-box layout.
- Toggle between one and two map views.
- Additional caption icons and updated captions.
- Hotkeys for:
  - Toggling items.
  - Toggling map views.
  - Selecting current dungeon.
  - Opening/closing dungeon chests.
  - Cycling prizes and medallions.
- Current dungeon highlighting.
- Automagic dungeon prize logic

### v5.0.0 and below
See [Previous ReadMe](https://github.com/crossproduct42/alttprandohelper/blob/master/readme.txt)

## (:::[========> Tracker Instructions <========]:::) 

### 🗂 Opening

Open `index.html`.  
Choose your desired **Mode** and **Mapfulness** from the launcher window.  
> (Popup blocker no longer a problem.)

Best viewed in **Internet Explorer** for no-resize/no-title-bar support (enable scripts).  
Opening `tracker.html` directly defaults to Standard + Mapless and incorrect sizing.


### 🧰 Item Tracker

- Left box = item tracker.
- Click to toggle items!
- Dungeon chests = unique chests (not maps, keys, or compasses).
- Link square = tunic, sword, and shield info.
- Boss squares:
  - Click to toggle between Unknown → Green Pendant → Red/Blue → Crystal → Crystal 5/6.
  - Vitreous & Trinexx have medallion subsquares too.
- Location Tracker logic takes medallions into account for **Misery Mire**, **Turtle Rock**, and **Mimic Cave**.
- Clicking bosses/chests updates status — **Map clicks do not affect dungeon logic**.


### 🗺 Location Tracker

- **Middle box:** Light World map.  
- **Right box:** Dark World map.
- Hover over squares for location info.

#### Square Colors
- 🟩 **Green** = reachable (assumes you have bombs).
- 🟥 **Red** = unreachable.
- 🟨 **Yellow** = unreachable but visible.
- 🔵 **Blue** = reachable via dark rooms.
- ⬜️ **Gray** = checked.

You can click squares to check/uncheck and the tracker will recalculate availability.

> 💡 **PRO TIP:** Use the Agahnim icon smartly. If you can kill him, more items might be unlocked!

#### Dungeon Squares
- Inner square = prize (pendant/crystal).
- Outer square = number of unique items accessible.

Square Color Meanings:
- **Green** = at least 1 item reachable.
- **Yellow** = might be reachable depending on keys/medallions.
- **Gray** = already checked.
- **Red** = not reachable.
- Ice Palace special note: If crystal is yellow, **Bomb Jump** required to complete.

**Map squares are not interactive!**  
Use the Item Tracker to change dungeon states.


## (:::[========> Hotkeys <========]:::) 
This tracker includes a variety of keyboard shortcuts for tracker toggling. Below are the supported hotkeys grouped by function:
> *Customize in hotKeys.js*
---

### 🔹 Item Toggle Hotkeys
You can press the following two-letter key sequences to toggle items in the tracker:

| Item           | Key Sequences           |
|----------------|-------------------------|
| Sword          | `S W`                   |
| Tunic          | `T U`                   |
| Shield         | `S H`                   |
| Bow            | `B W`, `A R`            |
| Boomerang      | `B R`, `B M`            |
| Hookshot       | `H O`                   |
| Mushroom       | `M U`                   |
| Magic Powder   | `M P`, `M A`, `P O`     |
| Moon Pearl     | `M O`, `P E`            |
| Fire Rod       | `F R`, `F I`            |
| Ice Rod        | `I R`, `I C`            |
| Bombos         | `B B`                   |
| Ether          | `E T`                   |
| Quake          | `Q U`                   |
| Lantern        | `L A`, `T O`            |
| Hammer         | `H A`                   |
| Shovel         | `S V`                   |
| Bug Net        | `N E`, `B N`            |
| Book of Mudora | `B K`                   |
| Bottle         | `B T`                   |
| Cane of Somaria| `C S`, `S O`            |
| Cane of Byrna  | `C B`, `B Y`            |
| Magic Cape     | `C A`                   |
| Magic Mirror   | `M I`, `M M`            |
| Boots          | `B O`                   |
| Gloves         | `G L`                   |
| Flippers       | `F L`                   |
| Flute (Ocarina)| `O C`                   |
| Agahnim        | `A G`                   |

> *Press the key sequences in order. For example, to toggle the Fire Rod, press `F` then `R`.* 

---
### 🔹 **Map View Hotkeys**

| Action                      | Keys       |
|-----------------------------|------------|
| Toggle 1-map/2-map display  | `Ctrl + M` |
| Switch between light/dark   | `Alt + M`  |

---
### 🔹 **Current Dungeon Selection**

- `0`–`9`: Select dungeon 0 through 9 as the current dungeon.
- `.`: Deselect the current dungeon (no dungeon selected).
> *Lightworld Dungeons (0-2), Darkworld Dungeons (3-9)*
---
### 🔹 **Current Dungeon Actions**

These hotkeys affect the **currently selected dungeon**:

| Action                           | Key(s)                    |
|----------------------------------|---------------------------|
| Open a chest                     | `+`, `=`                  |
| Close a chest                    | `-`                       |
| Toggle boss state                | `Enter`                   |
| Cycle dungeon prize (forward)    | `→`, `]`, `*`             |
| Cycle dungeon prize (backward)   | `←`, `[`                  |

#### 🔹 **Medallion Selector (Dungeons 8 & 9)**

| Action                           | Key(s)     |
|----------------------------------|------------|
| Cycle medallion (forward)        | `↑`, `\`   |
| Cycle medallion (backward)       | `↓`        |

---

