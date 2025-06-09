(function(window) {
    'use strict';

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function(callback, _this) {
            _this = _this || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(_this, this[i], i, this);
            }
        };
    }

    function launch_tracker() {
        var mode = this.getAttribute('data-mode'),
            map = this.getAttribute('data-map') === 'yes',
            width = map ? 1260 : 448,
	    height = map ? 452 : 460;

        open('tracker.html?mode={mode}{map}'
                .replace('{mode}', mode)
                .replace('{map}', map ? '&map' : ''),
            '',
            'width={width},height={height},titlebar=0,menubar=0,toolbar=0,scrollbars=0,resizable=0'
                .replace('{width}', width)
                .replace('{height}', height));
        setTimeout('window.close()', 2000);
    }

    window.start = function() {
        document.querySelectorAll('.launch').forEach(
            function(launch) { launch.addEventListener('click', launch_tracker); });
    };
}(window));
