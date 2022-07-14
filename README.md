# jQuery DrawSVG

This plugin uses the jQuery built-in animation engine to transition the `stroke` on every `<path>` inside the selected `<svg>` element, using `stroke-dasharray` and `stroke-dashoffset` properties.

* Weighs less than 2KB minified and 800 bytes gzipped.
* Easy to use.
* Easing and stagger support.
* Free!

## Usage

Include jQuery DrawSVG after jQuery

```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="jquery.drawsvg.js"></script>
```

Initialize the plugin on the <svg> element you want to animate and store in a variable

```js
var mySVG = $('#my_svg_element').drawsvg({
				duration: 1000,
				stagger: 200,
				easing: 'swing',
				reverse: false,
				callback: function() {
          console.log('animation complete!');
        }
			});
```

Run the animation

```js
mySVG.animate();
```

## Options

| Option     | Type     | Default         | Description                                                                                                                                                  |
| ---------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `duration` | Integer  | `1000`          | The time to complete the animation of each path.                                                                                                             |
| `stagger`  | Integer  | `200`           | Delay to start animating each individual path.                                                                                                               |
| `easing`   | String   | `swing`         | Which easing function each path will use to transition. <br> Use [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/) for different easing functions. |
| `reverse`  | Boolean  | `false`         | Direction that the line will be drawn.                                                                                                                       |
| `callback` | Function | `function() {}` | A function to call once the animation has been completed. |


