# ScrollFlow
The goal of the ScrollFlow project is to provide a JavaScript library for scroll effects that allows controlling the flow of the page navigation, overlaying the sections based on scrolling.

### The main features
#### Overlapping on scroll
> Create a smooth navigation flow with section overlapping.

#### Vertical/Horizontal support
> Implement fluid transitions supporting navigation in any direction.

#### ContentOverflow
> Develop extensive sections without worrying about layout breaking.

#### Fade
> Apply the Fade for an even smoother experience.

#### Fade Content
> Choose 'Fade Content' for elements' entry in overlapped content.

#### Pagination
> Empower users with pagination for precise section navigation.

#### Anchor Links
> Any element in your HTML can easily be a trigger for a specific section.

<br>

# Installation

## Module

```bash
$ npm install scrollflow
```

This way you can initialize Scroll Flow in your file.js like this:

```js
import { ScrollFlow } from 'scrollflow';
import 'scrollflow/dist/style.css';

window.addEventListener('DOMContentLoaded', () => {
  const scrollFlow = new ScrollFlow();
  scrollFlow.init();
});
```
> Remembering that your script that calls this .js file must have the type module:
> <script type="module" src="file.js"></script>

<br>

## CDN

A simple and quick way for you to explore the possibilities of ScrollFlow using CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/scrollflow@latest/dist/style.css">
<script src="https://cdn.jsdelivr.net/npm/scrollflow@latest/dist/scrollflow.umd.js"></script>
```
<br>

This will create the global variable `ScrollFlow` and you can use it like this:
<br>
```html
<script src="https://cdn.jsdelivr.net/npm/scrollflow@latest/dist/scrollflow.umd.js"></script>

<script>
    window.addEventListener('DOMContentLoaded', () => {
      const scrollflow = new ScrollFlow();
      scrollflow.init();
    });
</script>
```

<br>

# Usage

Installation provides us with the constructor function `ScrollFlow()`. Calling this function returns the ScrollFlow instance.

## HTML
HTML must maintain a standard structure that includes the following tags:

```html
<div class="scrollflow">
  <div class="sf-wrapper">
    <div class="sf-section">
      ...
    </div>
  </div>
</div>
```

<br>

## Customize 
All the functionalities of ScrollFlow.Js are highly customizable to meet the specific needs of each project:

### Vertical/Horizontal Support
By default, the overlay flow occurs on the y-axis, that is, vertical. To change to the x-axis, it is necessary to assign the "horizontal" class to the "scrollflow" element or set the `horizontal` property in the init() function. Just look:

```html
<div class="scrollflow horizontal">
  <div class="sf-wrapper">
    <div class="sf-section">
      ...
    </div>
  </div>
</div>
```

```js
  const scrollFlow = new ScrollFlow();

  scrollFlow.init({
    horizontal: true,
  });
```

<br>

### ContentOverflow
If you have a section that has or may have content longer than the height of the user's screen, ContentOverflow will ensure that all your content is displayed before calling the next overlap.

<br>

### Fade and Fade Content
The input fade properties are easily applied using classes, both should be applied to the "scrollflow" element. The "Fade" is an alternative to the overlapping effect:

```html
<div class="scrollflow fade">
  <div class="sf-wrapper">
    <div class="sf-section">
      ...
    </div>
  </div>
</div>
```
The "Fade Content" applies a soft entry to all elements of a section after the final overlapping flow ends:
```html
<div class="scrollflow fade-content">
  <div class="sf-wrapper">
    <div class="sf-section">
      ...
    </div>
  </div>
</div>
```
If you prefer, you can also set the `fade` property in init():
```js
  const scrollFlow = new ScrollFlow();

  scrollFlow.init({
    fade: 'content', //could be 'auto', 'content' or 'none'
  });
```

<br>

### Pagination and Anchor Links
The operation is simple: direct links to specific sections. With `paginate` property, we enable bullets that float on the screen according to the orientation of the overlapping flow. To enable, just set it in the init() function:

```js
  const scrollFlow = new ScrollFlow();

  scrollFlow.init({
    paginate: true,
    paginateAxis: 'y', // If you prefer, you can also change the position of the bullets using paginateAxis as 'y' or 'x'.
  });
```

To create links to other pages and specific sections, we use the "sf-trigger" class and the "data-sf-index" data attribute to inform which section should be redirected to. For example, if we are on the "Contact" page and would like to have a link to the third section of the Home page, we do:

```html
<!-- contact page -->
  ...
  
    <div class="sf-trigger" data-sf-index="2">
      <a href="/">Go to the third section of the home</a>
    </div>
  
  ...
```
<br>

## Instance Props 


| Props |  Type  |  Default  |  Description  |
| :---:   | :---: | :---: | :---: |
| `horizontal` | boolean   | `false` |  Navigation direction  |
| `paginate` | boolean   | `false` | Bullets that float on the screen that act as triggers for the sections  |
| `paginateAxis` | 'y', 'x'   | `'y'` | Bullets position on the screen  |
| `fade` | 'all', 'content', 'none' | `'none'` |  Sections or section content entrance  |
| `breakpoint` | number | `1024` |  Breakpoint that informs what the page break is to change mobile x desktop interactions  |
| `speed` | number | `900` |  Transition time, in milliseconds, for the overlapping interaction  |

<br>

## Instance Methods 

#### <em>`init()`</em>
This method is responsible for starting ScrollFlow, activating the features and applying the defined settings.
```js
    document.addEventListener('DOMContentLoaded', () => {
    
        const scrollFlow = new ScrollFlow();    
    
        scrollFlow.init();  // If necessary, include the properties here
    });
```

<br>

#### <em>`onChange()`</em>
This method is a listener that allows you to execute specific actions whenever a new section is reached while scrolling. It can be very useful for adding dynamic functionalities that depend on the current section the user is viewing. For example, you might want to change the content of a menu, update a progress indicator, or trigger specific animations when the user reaches a certain part of the page.

We can use it with a callback to access the scroll direction (next or previous), the starting index and the destination index, or just listen for section changes:
```js
    document.addEventListener('DOMContentLoaded', () => {
    
        const scrollFlow = new ScrollFlow();    
    
        scrollFlow.init();

        // Example of using onChange callback
        scrollFlow.onChange((direction, currentIndex, targetIndex) => {
            console.log(direction, currentIndex, targetIndex);
        });

        // Example of using onChange without callback
        scrollFlow.onChange(() => {
            console.log('section changed');
        })
    });
```
<br>

#### <em>`stop()`</em>
This method allows you to interrupt the page's navigation flow. When called, scrolling ceases to function, whether in the vertical or horizontal direction. This is especially useful in situations where it's necessary to pause the page's movement temporarily, such as during the display of a modal or alert, ensuring that the user remains in the current position until the specific action is completed.
```js
    document.addEventListener('DOMContentLoaded', () => {
    
        const scrollFlow = new ScrollFlow();    
    
        scrollFlow.init();

        //Using the stop() method to stop the scroll when reaching the third section
        scrollFlow.onChange((direction, currentIndex, targetIndex) => {
            if(targetIndex === 2) {
                scrollFlow.stop();
            }
        });

    });
```
<br>

#### <em>`allow()`</em>
This method allows you to reactivate the navigation flow, both vertically and horizontally, after it has been interrupted. This is especially useful in cases where the navigation flow was deliberately paused, whether to perform a specific action or to prevent accidental page movement. By calling this method, navigation is resumed smoothly and continuously, ensuring a seamless and uninterrupted user experience.
```js
    document.addEventListener('DOMContentLoaded', () => {
    
        const scrollFlow = new ScrollFlow();    
    
        scrollFlow.init();

        //Using the stop() method to stop the scroll when reaching the third section
        //start it again after 5 seconds
        scrollFlow.onChange((direction, currentIndex, targetIndex) => {
            if(targetIndex === 2) {
                scrollFlow.stop();

                setTimeout(() => {
                    scrollFlow.allow();
                }, 5000);
            }
        });

    });
```
<br>

#### <em>`getCurrentIndex()`</em>
This method returns the index of the currently displayed section.
```js
    document.addEventListener('DOMContentLoaded', () => {
    
        const scrollFlow = new ScrollFlow();    
    
        scrollFlow.init();

        window.addEventListener('wheel', () => {

            const currentSection = scrollFlow.getCurrentIndex();

            if (currentSection === 0) {
                console.log('first section');
            }
        });
    });
```

<br>

#### <em>`goToSection(index)`</em>
The `goToSection(index)` method allows you to navigate directly to a specific section, identified by the index passed as a parameter. This method is particularly useful for creating navigation links or buttons that let the user jump directly to different sections without having to scroll manually.
```js
    document.addEventListener('DOMContentLoaded', () => {
    
        const scrollFlow = new ScrollFlow();    
    
        scrollFlow.init();

        //When the user reaches the last section, stop the scroll and start the first one after 5 seconds
        scrollFlow.onChange((direction, currentIndex, targetIndex) => {
            if (targetIndex === 5){
                scrollFlow.stop();

                setTimeout(() => {
                    scrollFlow.goToSection(0);
            }, 5000);
            }
        });
    });
```

<br>

# Support
**Chat support for Patreon members of  <a href="https://www.patreon.com/MatheCreative" target="_blank">Mathe. Creative</a>**

For help or support, feel free to open an issue on the project's GitHub or contact the maintainers directly at contact@scrollflowjs.com.

<br>

# License

The MIT License.
