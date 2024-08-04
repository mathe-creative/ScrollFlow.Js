# FlowScroll
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
      scrollflow.start();
    });
</script>
```


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
  scrollFlow.start();
});
```
> Remembering that your script that calls this .js file must have the type module:
> <script type="module" src="file.js"></script>

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

## Options and Properties 
All the functionalities of ScrollFlow.Js are highly customizable to meet the specific needs of each project:

### Vertical/Horizontal Support
By default, the overlay flow occurs on the y-axis, that is, vertical. To change to the x-axis, it is necessary to assign the "horizontal" class to the "scrollflow" element or set the `horizontal` property in the start() function. Just look:

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

  scrollFlow.start({
    horizontal: true,
  });
```

### ContentOverflow
If you have a section that has or may have content longer than the height of the user's screen, ContentOverflow will ensure that all your content is displayed before calling the next overlap.

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
If you prefer, you can also set the `fade` property in start():
```js
  const scrollFlow = new ScrollFlow();

  scrollFlow.start({
    fade: 'content', //could be 'auto', 'content' or 'none'
  });
```

### Pagination and Anchor Links
The operation is simple: direct links to specific sections. With `paginate` property, we enable bullets that float on the screen according to the orientation of the overlapping flow. To enable, just set it in the start() function:

```js
  const scrollFlow = new ScrollFlow();

  scrollFlow.start({
    paginate: true,
    paginateAxis: 'y', // If you prefer, you can also change the position of the bullets using paginateAxis as 'y' or 'x'.
  });
```

To create links to other pages and specific sections, we use the "sf-trigger" class and the "data-sf-index" data attribute to inform which section should be redirected to. For example, if we are on the "Contact" page and would like to have a link to the third section of the Home page, we do:

```html
<!-- contact page -->
  ...
  
    <div class="sf-trigger" data-index="2">
      <a href="/">Go to the third section of the home</a>
    </div>
  
  ...
```
| Props |    |    |
| :---:   | :---: | :---: |
| `horizontal` | boolean   |  navigation direction  |
| `paginate` | boolean   |  bullets that float on the screen that act as triggers for the sections  |
| `paginateAxis` | 'y' | 'x'   |  bullets position on the screen  |
| `fade` | 'auto' | 'content' | 'none'   |  sections or section content entrance  |
