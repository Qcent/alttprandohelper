(function (window) {
    'use strict';

    var query = uri_query();
    window.prizes = [];
    window.medallions = [0, 0];
    window.mode = query.mode;
    window.map_enabled = query.map;

    // Event of clicking on the item tracker
    window.toggle = function (label, dir = 1) {
        if (label.substring(0, 5) === 'chest') {
            var value;
            if (dir < 0) value = items.inc(label);
            else value = items.dec(label);
            document.getElementById(label).className = 'chest-' + value;
            if (map_enabled) {
                var x = label.substring(5);
                document.getElementById('dungeon' + x).className = 'dungeon ' +
                    (value ? dungeons[x].can_get_chest() : 'opened');
            }
            return;
        }
        var node = document.getElementsByClassName(label)[0],
            is_boss = node.classList.contains('boss');
        if ((typeof items[label]) === 'boolean') {
            items[label] = !items[label];
            node.classList[items[label] ? 'add' : 'remove'](is_boss ? 'defeated' : 'active');
        } else {
            var value = items.inc(label);
            node.className = node.className.replace(/ ?active-\w+/, '');
            if (value) node.classList.add('active-' + value);
        }
        // Initiate bunny graphics!
        if (label === 'moonpearl' || label === 'tunic') {
            document.getElementsByClassName('tunic')[0].classList[!items.moonpearl ? 'add' : 'remove']('bunny');
        }

        if (map_enabled) {
            for (var k = 0; k < chests.length; k++) {
                if (!chests[k].is_opened)
                    document.getElementById('chestMap' + k).className = 'chest ' + chests[k].is_available();
            }
            for (var k = 0; k < dungeons.length; k++) {
                if (!dungeons[k].is_beaten)
                    document.getElementById('bossMap' + k).className = 'boss ' + dungeons[k].is_beatable();
                if (items['chest' + k])
                    document.getElementById('dungeon' + k).className = 'dungeon ' + dungeons[k].can_get_chest();
            }
            // Clicking a boss on the tracker will check it off on the map!
            if (is_boss) {
                toggle_boss(label.substring(4));
            }
            if (label === 'agahnim' || label === 'cape' || label === 'sword' || label === 'lantern') {
                toggle_agahnim();
            }
        }
    };

    // event of clicking on a boss's pendant/crystal subsquare
    let lastPrize = 0;
    window.toggle_dungeon = function (n, dir = 1) {
        const maxCounts = {
            1: 1, // 1 prize-1 allowed
            2: 2, // 2 prize-2 allowed
            3: 5, // 5 prize-3 allowed
            4: 2  // 2 prize-4 allowed
        };

        // counts how many of each prize exist
        const countPrizes = () => {
            const counts = {};
            for (let val of prizes) {
                counts[val] = (counts[val] || 0) + 1;
            }
            return counts;
        };
        const onlyBlueCystalsLeft = (currentCounts) => {
            return (currentCounts[1] === maxCounts[1] && currentCounts[2] === maxCounts[2] && currentCounts[4] === maxCounts[4] && currentCounts[3] != maxCounts[3])
        }     

        let newPrize = prizes[n];
        const totalPrizeTypes = 5; // 0-4
        let currentCounts = countPrizes();

        let attempts = 0;
        do {
            newPrize += dir;

            if (newPrize > 4) newPrize = 0;
            if (newPrize < 0) newPrize = 4;

            attempts++;
            const count = currentCounts[newPrize] || 0;

            // set if within prize limit
            if (newPrize === 0 || count < (maxCounts[newPrize] || Infinity)) {
                prizes[n] = newPrize;
                break;
            }

            // otherwise try next value
        } while (attempts <= totalPrizeTypes); // limit loop

        lastPrize = prizes[n];
        document.getElementById('dungeonPrize' + n).className = 'prize-' + prizes[n];

        // auto set prizes
        currentCounts = countPrizes();
        if(lastPrize != 0 && (currentCounts[0] === 1 || (lastPrize === 3 && onlyBlueCystalsLeft(currentCounts)))){
            const prizeEl = document.querySelector(`.prize-0`);
            if(prizeEl) prizeEl.click();
            return;
        }

        if (map_enabled) {
            // Update Sahasralah, Fat Fairy, and Master Sword Pedestal
            var pendant_chests = [25, 61, 62];
            for (var k = 0; k < pendant_chests.length; k++) {
                if (!chests[pendant_chests[k]].is_opened)
                    document.getElementById('chestMap' + pendant_chests[k]).className = 'chest ' + chests[pendant_chests[k]].is_available();
            }
        }
    };

    // event of clicking on Mire/TRock's medallion subsquare
    window.toggle_medallion = function (n, dir = 1) {
        medallions[n] += dir;
        if (medallions[n] === 4) medallions[n] = 0;
        if (medallions[n] === -1) medallions[n] = 3;

        document.getElementById('medallion' + n).className = 'medallion-' + medallions[n];

        if (map_enabled) {
            // Update availability of dungeon boss AND chests
            dungeons[8 + n].is_beaten = !dungeons[8 + n].is_beaten;
            toggle_boss(8 + n);
            if (items['chest' + (8 + n)] > 0)
                document.getElementById('dungeon' + (8 + n)).className = 'dungeon ' + dungeons[8 + n].can_get_chest();
            // TRock medallion affects Mimic Cave
            if (n === 1) {
                chests[4].is_opened = !chests[4].is_opened;
                toggle_chest(4);
            }
            // Change the mouseover text on the map
            dungeons[8 + n].caption = dungeons[8 + n].caption.replace(/\{medallion\d+\}/, '{medallion' + medallions[n] + '}');
        }
    };

    if (map_enabled) {
        // Event of clicking a chest on the map
        window.toggle_chest = function (x) {
            chests[x].is_opened = !chests[x].is_opened;
            var highlight = document.getElementById('chestMap' + x).classList.contains('highlight');
            document.getElementById('chestMap' + x).className = 'chest ' +
                (chests[x].is_opened ? 'opened' : chests[x].is_available()) +
                (highlight ? ' highlight' : '');
        };
        // Event of clicking a dungeon location (not really)
        window.toggle_boss = function (x) {
            dungeons[x].is_beaten = !dungeons[x].is_beaten;
            document.getElementById('bossMap' + x).className = 'boss ' +
                (dungeons[x].is_beaten ? 'opened' : dungeons[x].is_beatable());
        };
        window.toggle_agahnim = function () {
            document.getElementById('castle').className = 'castle ' +
                (items.agahnim ? 'opened' : agahnim.is_available());
        };
        // Highlights a chest location and shows the caption
        window.highlight = function (x) {
            document.getElementById('chestMap' + x).classList.add('highlight');
            document.getElementById('caption').innerHTML = caption_to_html(chests[x].caption);
        };
        window.unhighlight = function (x) {
            document.getElementById('chestMap' + x).classList.remove('highlight');
            document.getElementById('caption').innerHTML = '&nbsp;';
        };
        // Highlights a chest location and shows the caption (but for dungeons)
        window.highlight_dungeon = function (x) {
            document.getElementById('dungeon' + x).classList.add('highlight');
            document.getElementById('caption').innerHTML = caption_to_html(dungeons[x].caption);
        };
        window.unhighlight_dungeon = function (x) {
            document.getElementById('dungeon' + x).classList.remove('highlight');
            document.getElementById('caption').innerHTML = '&nbsp;';
        };
        // Mouseover dungeon chest caption
        window.chestOver = function () {
            document.getElementById('caption').innerHTML = caption_to_html('Chests that ARE NOT {smallkey} | {map} | {compass} | {bigkey}');
        };
        window.chestOut = function () {
            document.getElementById('caption').innerHTML = '&nbsp;';
        };
        window.highlight_agahnim = function () {
            document.getElementById('castle').classList.add('highlight');
            document.getElementById('caption').innerHTML = caption_to_html(agahnim.caption);
        };
        window.unhighlight_agahnim = function () {
            document.getElementById('castle').classList.remove('highlight');
            document.getElementById('caption').innerHTML = '&nbsp;';
        };
        window.switchMap = function (mapSwitcher) {
            if (mapSwitcher.dataset.current === "1") {
                document.getElementById('lightmap').style.display = 'none';
                document.getElementById('darkmap').style.display = 'block';
                mapSwitcher.dataset.current = "2";
                mapSwitcher.style.opacity = 0.36;
            } else if (mapSwitcher.dataset.current === "2") {
                document.getElementById('darkmap').style.display = 'none';
                document.getElementById('lightmap').style.display = 'block';
                mapSwitcher.dataset.current = "1";
                mapSwitcher.style.opacity = 1;
            }
            mapswitch_over(mapSwitcher);
        };
        window.toggle_map_view = function (mapSwitcher) {
            if (mapSwitcher.dataset.current === "0") {
                mapSwitcher.dataset.current = "2";
                switchMap(mapSwitcher);
            } else {
                mapSwitcher.dataset.current = "0";
                mapSwitcher.style.opacity = 1;
                document.getElementById('lightmap').style.display = 'block';
                document.getElementById('darkmap').style.display = 'block';
            }

            mapSwitcher.classList.add('animate-zoom-rotate');
            mapSwitcher.addEventListener('animationend', function handler() {
                mapSwitcher.classList.remove('animate-zoom-rotate');
                mapSwitcher.removeEventListener('animationend', handler);
            });
            mapswitch_over(mapSwitcher);
        };
        window.mapswitch_over = function (mapSwitcher) {
            if (mapSwitcher.dataset.current === "0") {
                document.getElementById('caption').innerHTML = caption_to_html('Double click to toggle map view');
            } else if (mapSwitcher.dataset.current === "1") {
                document.getElementById('caption').innerHTML = caption_to_html('Click for Dark World {map}');
            } else if (mapSwitcher.dataset.current === "2") {
                document.getElementById('caption').innerHTML = caption_to_html('Click for Light World {map}');
            }
        };
    }

    function applyResponsiveStyles() {
        const caption = document.getElementById('caption');
        const tracker = document.getElementById('tracker');
        const lightmap = document.getElementById('lightmap');
        const darkmap = document.getElementById('darkmap');
        const mapswitcher = document.getElementById('mapswitcher');

        if (window.innerWidth >= 1370) {
            caption.style.order = 3;
            tracker.style.order = 0;
            lightmap.style.order = 1;
            darkmap.style.order = 2;
            mapswitcher.style.display = 'none';
            mapswitcher.dataset.current = "1";
            toggle_map_view(mapswitcher);
            chestOut();
        } else {
            caption.style.order = 1;
            tracker.style.order = 0;
            lightmap.style.order = 2;
            darkmap.style.order = 3;
            mapswitcher.style.display = 'block';
        }
    }

    window.caption_to_html = function (caption) {
        return caption.replace(/\{(\w+?)(\d+)?\}/g, function (__, name, n) {
            var dash = /medallion|pendant/.test(name)
            return '<div class="icon ' +
                (dash ? name + '-' + n :
                    n ? name + ' active-' + n :
                        name) + '"></div>';
        });
    }



    window.start = function () {
        for (var k = 0; k < dungeons.length; k++) {
            prizes[k] = 0;
        }

        if (mode !== 'open') {
            document.getElementsByClassName('sword')[0].classList.add('active-1');
        }

        if (map_enabled) {
            applyResponsiveStyles();
            window.addEventListener('resize', applyResponsiveStyles);
            for (k = 0; k < chests.length; k++) {
                document.getElementById('chestMap' + k).className = 'chest ' + (chests[k].is_opened ? 'opened' : chests[k].is_available());
            }
            document.getElementById('bossMapAgahnim').className = 'boss';
            document.getElementById('castle').className = 'castle ' + agahnim.is_available();
            for (k = 0; k < dungeons.length; k++) {
                document.getElementById('bossMap' + k).className = 'boss ' + dungeons[k].is_beatable();
                document.getElementById('dungeon' + k).className = 'dungeon ' + dungeons[k].can_get_chest();
            }
        } else {
            document.getElementById('app').classList.add('mapless');
            document.getElementById('mapswitcher').style.display = 'none';
            document.getElementById('lightmap').style.display = 'none';
            document.getElementById('darkmap').style.display = 'none';
        }
    };
}(window));
