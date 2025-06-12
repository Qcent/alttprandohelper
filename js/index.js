(function (window) {
    'use strict';

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, _this) {
            _this = _this || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(_this, this[i], i, this);
            }
        };
    }

    function launch_tracker() {

        var mode = this.getAttribute('data-mode'),
            hmap = this.getAttribute('data-map') === 'hmap',
            vmap = this.getAttribute('data-map') === 'vmap',
            map = (vmap > 0 || hmap > 0) ? 'yes' : null,
            sprite = document.getElementById('sprite').value,
            width = map ? (vmap ? 500 : 1366) : 448,
            height = map ? (hmap ? 503 : 1000) : 460;

        open('tracker.html?mode={mode}{map}{sprite}'
            .replace('{mode}', mode)
            .replace('{map}', map ? '&map' : '')
            .replace('{sprite}', sprite ? `&sprite=${sprite}` : ''),
            '',
            'width={width},height={height},titlebar=0,menubar=0,toolbar=0,scrollbars=0,resizable=0'
                .replace('{width}', width)
                .replace('{height}', height));
        if (history.length > 1) {
            history.back();
        } else {
            setTimeout('window.close()', 2000);
        }
    }

    function spriteLoad(sprite) {
        const spriteElement = document.getElementById('mainSprite');
        const bunnyElement = document.getElementById('bunnySprite');

        if (sprite) {
            spriteElement.style.backgroundImage = `url(images/sprites/${sprite}/tunic1.png)`;
            bunnyElement.style.backgroundImage = `url(images/sprites/${sprite}/tunicbunny1.png)`;
        } else { // Default
            spriteElement.style.backgroundImage = `url(images/items/tunic1.png)`;
            bunnyElement.style.backgroundImage = `url(images/items/tunicbunny1.png)`;
        }
    }
    function backgroundCycle() {    
        // Fade out background
        bg.style.opacity = '0';

        setTimeout(() => {
            setRandomBackground();
            // Fade back in
            bg.style.opacity = '1';
        }, 650); // slightly faster than CSS transition
    }

    function setRandomBackground() {
        const backgrounds = [
            'images/bg/alttp_bg1.png',
            'images/bg/alttp_bg2.jpg',
            'images/bg/alttp_bg3.jpg',
            'images/bg/alttp_bg4.jpg',
            'images/bg/alttp_bg5.jpg',
            'images/bg/alttp_bg6.jpg',
            'images/bg/alttp_bg7.png',
            ''
        ];

        // Pick a random index
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        const randomBackground = backgrounds[randomIndex];

        // Set as background
        const bg = document.getElementById('bg');
        if(bg.style.backgroundImage === `url('${randomBackground}')`) {
            setRandomBackground(); // try again
            return;
        }
        bg.style.backgroundImage = `url('${randomBackground}')`;
    }


    window.start = function () {
        setRandomBackground();

        document.querySelectorAll('.launch').forEach(
            function (launch) { launch.addEventListener('click', launch_tracker); });
        
        const spriteSelect = document.getElementById('sprite');
        spriteLoad(spriteSelect.value.replace(/-/g, "_"));

        spriteSelect.addEventListener('change', function () {
            spriteLoad(this.value.replace(/-/g, "_"))
        });

        // Start cycling every 1 min 45 sec (105000ms)
        setInterval(backgroundCycle, 105000);
    };
}(window));