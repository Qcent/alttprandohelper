class HotkeyManager {
    constructor(sequenceTimeout = 500) {
        this.hotkeys = {};        // for simultaneous combos ie. "Shift+Alt+Q"
        this.sequences = [];      // for sequential combos ie. 's','w','o','r','d'
        this.currentKeys = new Set();
        this.sequenceBuffer = [];
        this.sequenceTimeout = sequenceTimeout;
        this.sequenceTimer = null;

        window.addEventListener('keydown', (e) => this._onKeyDown(e));
        //window.addEventListener('keyup', (e) => this._onKeyUp(e));
    }

    _normalizeKeyCombo(combo) {
        return combo.toLowerCase().split('+').map(k => k.trim()).sort().join('+');
    }

    _getEventCombo(e) {
        const keys = [];
        if (e.ctrlKey) keys.push('ctrl');
        if (e.shiftKey) keys.push('shift');
        if (e.altKey) keys.push('alt');
        if (e.metaKey) keys.push('meta');
        if (!['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
            keys.push(e.key.toLowerCase());
        }
        return keys.sort().join('+');
    }

    _onKeyDown(e) {
        const combo = this._getEventCombo(e);

        // Simultaneous hotkeys
        if (this.hotkeys[combo]) {
            e.preventDefault();
            const { callback, args } = this.hotkeys[combo];
            callback(...args);
            return;
        }

        // Squential keys
        const key = e.key.toLowerCase();
        if (['control', 'shift', 'alt', 'meta'].includes(key)) return;

        if (this.sequenceTimer) clearTimeout(this.sequenceTimer);
        this.sequenceBuffer.push(key);

        // check all sequences
        let longMatch = 0;
        for (let seq of this.sequences) {
            let matchLen = 0;
            for(matchLen; matchLen<seq.sequence.length; matchLen++){
              if(this.sequenceBuffer[matchLen] != seq.sequence[matchLen]) break;
            }
            if(seq.sequence.length === matchLen){
                seq.callback(...seq.args);
                this.sequenceBuffer = [];  // clear after match
                return;
            }
            if(matchLen > longMatch) longMatch = matchLen;
        }

        if(longMatch < this.sequenceBuffer.length){ // no sequence possible
            this.sequenceBuffer = [];
            return;
        }

        // restart timer
        this.sequenceTimer = setTimeout(() => {
            this.sequenceBuffer = [];
        }, this.sequenceTimeout);
    }

    _onKeyUp(e) {
        // ... not used
    }

    registerHotkey(combo, callback, ...args) {
        const key = this._normalizeKeyCombo(combo);
        this.hotkeys[key] = { callback, args };
    }

    unregisterHotkey(combo) {
        const key = this._normalizeKeyCombo(combo);
        delete this.hotkeys[key];
    }

    registerSequence(sequenceArray, callback, ...args) {
        this.sequences.push({
            sequence: sequenceArray.map(k => k.toLowerCase()),
            callback,
            args
        });
    }

    unregisterSequence(sequenceArray) {
        const normalized = sequenceArray.map(k => k.toLowerCase()).join(' ');
        this.sequences = this.sequences.filter(seq => seq.sequence.join(' ') !== normalized);
    }
}

const hotkeys = new HotkeyManager();
const hKeyItemSequences = {
    sword: [['s', 'w']],
    tunic: [['t', 'u']],
    shield: [['s', 'h']],
    bow: [['b', 'w'], ['a', 'r']],
    boomerang: [['b', 'r'], ['b', 'm']],
    hookshot: [['h', 'o']],
    mushroom: [['m', 'u']],
    powder: [['m', 'p'], ['m', 'a'], ['p', 'o']],
    moonpearl: [['m', 'o'], ['p', 'e']],
    firerod: [['f', 'r'], ['f', 'i']],
    icerod: [['i', 'r'], ['i', 'c']],
    bombos: [['b', 'b']],
    ether: [['e', 't']],
    quake: [['q', 'u']],
    lantern: [['l', 'a'], ['t', 'o']],
    hammer: [['h', 'a']],
    shovel: [['s', 'v']],
    net: [['n', 'e'], ['b', 'n']],
    book: [['b', 'k']],
    bottle: [['b', 't']],
    somaria: [['c', 's'], ['s', 'o']],
    byrna: [['c', 'b'], ['b', 'y']],
    cape: [['c', 'a'], ['m', 'c']],
    mirror: [['m', 'i'], ['m', 'm']],
    boots: [['b', 'o']],
    glove: [['g', 'l']],
    flippers: [['f', 'l']],
    flute: [['o', 'c']],
    agahnim: [['a', 'g']],
};

// register item hotkey sequences
Object.entries(hKeyItemSequences).forEach(([id, sequences]) => {
    sequences.forEach(seq => {
        hotkeys.registerSequence(seq, toggle, id);
    });
});

// Current Dungeon setter
var currentDungeon = -1;
document.addEventListener('DOMContentLoaded', () => {
    // Register num 0-9 to current dungeon
    for (let i = 0; i < 10; i++) {
        const sequence = [i.toString()];
        hotkeys.registerSequence(sequence, () => {
            const oldBossDiv = document.querySelector(`.boss${currentDungeon}`);
            const newBossDiv = document.querySelector(`.boss${i}`);
            if (oldBossDiv) {
                removeDungeonHighlight(oldBossDiv);
            }
            if (newBossDiv) {
                addDungeonHighlight(newBossDiv, i);
            }
            currentDungeon = i;
        });
    }
    // '.' → no current dungeon
    hotkeys.registerSequence(['.'], () => {
        const oldBossDiv = document.querySelector(`.boss${currentDungeon}`);
        if (oldBossDiv) {
            removeDungeonHighlight(oldBossDiv);
        }
        currentDungeon = -1;
    });

    function addDungeonHighlight(newBossDiv, bossId) {
        if (bossId > 2) {
            // darkwrld bosses/chests are not wrapped in a .row so emulate one
            const highlight = document.createElement('div');
            highlight.classList.add('golden-box-glow');
            Object.assign(highlight.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '200%',
                pointerEvents: 'none',
                zIndex: '10',
            });
            // ensure parent is relatively positioned, or else...
            const parent = newBossDiv.parentElement;
            parent.style.position = 'relative';

            parent.insertBefore(highlight, newBossDiv);
        } else {
            const rowDiv = newBossDiv.closest('.row');
            rowDiv.classList.add('golden-box-glow');
        }
    }

    function removeDungeonHighlight(oldBossDiv) {
        if (currentDungeon > 2) { // delete dynamic highlight element for darkworld dungeons
            const highlightCell = oldBossDiv.parentElement.querySelector('.golden-box-glow');
            highlightCell.remove();
        } else {
            const rowDiv = oldBossDiv.closest('.row');
            rowDiv.classList.remove('golden-box-glow');
        }
    }

    // Map Switching
    const switcher = document.getElementById("mapswitcher");
    hotkeys.registerHotkey("Ctrl+M", () => {
        toggle_map_view(switcher);
    });
    hotkeys.registerHotkey("Alt+M", () => {
        switchMap(switcher);
    });
});

// helper for currentDungeon boss/chest toggles
function withDungeon(callback) {
    return () => {
        if (currentDungeon < 0) return;
        callback(currentDungeon);
    };
}
// helper for medallion setting for dungeons 8 & 9
function withMedallion(callback) {
    return () => {
        if (currentDungeon !== 8 && currentDungeon !== 9) return;
        callback(currentDungeon - 8);
    };
}
// open chest
['+', '='].forEach(key =>
    hotkeys.registerSequence([key], withDungeon(id => toggle('chest' + id)))
);
// close chest
hotkeys.registerSequence(['-'], withDungeon(id => toggle('chest' + id, -1)));
// boss toggle
hotkeys.registerSequence(['Enter'], withDungeon(id => toggle('boss' + id)));
// dungeon prize cycle dec/inc
['ArrowLeft', '['].forEach(key =>
    hotkeys.registerSequence([key], withDungeon(id => toggle_dungeon(id, -1)))
);
['ArrowRight', ']', '*'].forEach(key =>
    hotkeys.registerSequence([key], withDungeon(id => toggle_dungeon(id)))
);
// medallion for dungeon 8,9 cycle inc/dec
['ArrowUp', '\\'].forEach(key =>
    hotkeys.registerSequence([key], withMedallion(id => toggle_medallion(id)))
);
hotkeys.registerSequence(['ArrowDown'], withMedallion(id => toggle_medallion(id, -1)));
