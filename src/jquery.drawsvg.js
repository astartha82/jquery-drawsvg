/*!
 * jQuery DrawSVG v2.0.0 (Jul 14 2022) - http://astartha82.github.io/jquery-drawsvg/
 *
 * Copyright (c) 2016 Leonardo Santos; MIT License
 * Copyright (c) 2022 Lilith Zakharyan; MIT License
 *
 */

(function($) {
	'use strict';

	$.fn.DrawSvg = function(options) {
		var pluginName = 'drawsvg',
			defaults = {
				duration: 1000,
				stagger: 200,
				easing: 'swing',
				reverse: false,
				callback: $.noop
			},
			_this = this,
			opts = $.extend(defaults, options);

		return this.each(function(i, el) {
			_this.init = function(callback) {
				_this.$elm = $(el);
				if ( !_this.$elm.is('svg') )
					return;

				_this.options = opts;
				_this.$paths = _this.$elm.find('path');

				_this.totalDuration = opts.duration + (opts.stagger * _this.$paths.length);
				_this.duration = opts.duration / _this.totalDuration;

				_this.$paths.each(function(index, elm) {
					var pathLength = elm.getTotalLength();

					elm.pathLen = pathLength;
					elm.delay = (opts.stagger * index) / _this.totalDuration;
					elm.style.strokeDasharray = [pathLength, pathLength].join(' ');
					elm.style.strokeDashoffset = pathLength;
				});

				_this.$elm.attr('class', function(index, classNames) {
					return [classNames, pluginName + '-initialized'].join(' ');
				});
				if(callback && typeof(callback) === 'function') {
					callback();
				}
			};

			_this.getVal = function(p, easing) {
				return 1 - $.easing[easing](p, p, 0, 1, 1);
			};

			_this.progress = function progress(prog) {
				var _this = this,
					opts = _this.options,
					duration = _this.duration;

				_this.$paths.each(function(index, elm) {
					var elmStyle = elm.style;

					if ( prog === 1 ) {
						elmStyle.strokeDashoffset = 0;
					} else if ( prog === 0 ) {
						elmStyle.strokeDashoffset = elm.pathLen + 'px';
					} else if ( prog >= elm.delay && prog <= duration + elm.delay ) {
						var p = ((prog - elm.delay) / duration);
						elmStyle.strokeDashoffset = ((_this.getVal(p, opts.easing) * elm.pathLen) * (opts.reverse ? -1 : 1)) + 'px';
					}
				});
			};

			_this.animate = function() {

				_this.$elm.attr('class', function(index, classNames) {
					return [classNames, pluginName + '-animating'].join(' ');
				});

				$({ len: 0 }).animate({
					len: 1
				}, {
					easing: 'linear',
					duration: _this.totalDuration,
					step: function(now, fx) {
						_this.progress.call(_this, now / fx.end);
					},
					complete: function() {
						_this.options.callback.call(this);

						_this.$elm.attr('class', function(index, classNames) {
							return classNames.replace(pluginName + '-animating', '');
						});
					}
				});
			};
			_this.init();
		});
	}

})(jQuery);
