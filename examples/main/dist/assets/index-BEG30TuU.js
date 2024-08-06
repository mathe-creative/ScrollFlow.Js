(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();function v(s,n){if(!(s instanceof n))throw new TypeError("Cannot call a class as a function")}function w(s,n){for(var e=0;e<n.length;e++){var t=n[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(s,m(t.key),t)}}function p(s,n,e){return n&&w(s.prototype,n),Object.defineProperty(s,"prototype",{writable:!1}),s}function b(s,n,e){return(n=m(n))in s?Object.defineProperty(s,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):s[n]=e,s}function g(s,n){var e=Object.keys(s);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(s);n&&(t=t.filter(function(i){return Object.getOwnPropertyDescriptor(s,i).enumerable})),e.push.apply(e,t)}return e}function y(s){for(var n=1;n<arguments.length;n++){var e=arguments[n]!=null?arguments[n]:{};n%2?g(Object(e),!0).forEach(function(t){b(s,t,e[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(e)):g(Object(e)).forEach(function(t){Object.defineProperty(s,t,Object.getOwnPropertyDescriptor(e,t))})}return s}function k(s,n){if(typeof s!="object"||!s)return s;var e=s[Symbol.toPrimitive];if(e!==void 0){var t=e.call(s,n);if(typeof t!="object")return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}function m(s){var n=k(s,"string");return typeof n=="symbol"?n:n+""}var S=function(){function s(n,e,t,i){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:null;v(this,s),this.sfwrapper=n,this.sections=e,this.horizontal=t,this.isMobile=i,this.allowScroll=!0,this.scrollDirection="next",this.onChangeCallback=a,this.activeIndex=0,this.isNavigating=!1,this.debounceTimeout=null}return p(s,[{key:"getCurrentIndex",value:function(){return this.activeIndex}},{key:"onChange",value:function(e){this.onChangeCallback=e}},{key:"stopScroll",value:function(){this.allowScroll=!1}},{key:"startScroll",value:function(){this.allowScroll=!0}},{key:"jumpToSection",value:function(e){if(!(this.isNavigating||e<0||e>=this.sections.length)){var t=document.querySelector(".sf-section-active"),i=Array.prototype.indexOf.call(this.sections,t);if(e!==i){this.isNavigating=!0;for(var a=e>i?"next":"prev",r=this.sections[e],o=i;a==="next"?o<e:o>e;a==="next"?o++:o--)this.handleSectionActiveTranslate(a,this.sections[o],this.sections[o+1],o);r.classList.add("sf-section-active"),this.activeIndex=e;var l=this.checkContentOverflow(r);l?this.stopScroll():this.startScroll(),this.debounceOnChange(a,i,e)}}}},{key:"setupMobileEvents",value:function(){var e=this,t=0,i=0,a=0,r=0,o=10;this.sfwrapper&&this.sfwrapper.addEventListener("touchstart",function(l){t=l.touches[0].clientX,i=l.touches[0].clientY}),this.sfwrapper&&this.sfwrapper.addEventListener("touchend",function(l){a=l.changedTouches[0].clientX,r=l.changedTouches[0].clientY;var c=document.querySelector(".sf-section-active"),f=Array.prototype.indexOf.call(e.sections,c),h=a-t,u=r-i;(Math.abs(h)>o||Math.abs(u)>o)&&(Math.abs(h)>Math.abs(u)?e.scrollDirection=h>0?"prev":"next":e.scrollDirection=u>0?"prev":"next",e.allowScroll&&e.handleSectionActiveTranslate(e.scrollDirection,c,e.sections[f+1],f))})}},{key:"setupDesktopEvents",value:function(){var e=this;this.sections.forEach(function(t,i){t.addEventListener("wheel",function(a){if(e.allowScroll){e.scrollDirection=a.deltaY<0?"prev":"next";var r=e.scrollDirection==="next"?e.sections[i+1]:e.sections[i-1];r&&e.handleSectionActiveTranslate(e.scrollDirection,t,r,i)}})})}},{key:"handleSectionActiveTranslate",value:function(e,t,i,a){var r=this;this.sections.forEach(function(f){f.style.display="block"});var o=Array.from(document.querySelectorAll(".sf-trigger")),l=[],c=e==="prev"?a-1:a+1;e==="prev"&&c<0||e==="next"&&c>=this.sections.length||(e==="prev"&&t?(this.setActiveSection(t,"prev"),t.classList.contains("is-first")||(this.horizontal?t.style.transform="translateX(100%)":t.style.transform="translateY(100%)"),l=o.filter(function(f){return f.getAttribute("data-sf-index")===c.toString()}),this.activeIndex=c):e==="next"&&i&&(this.setActiveSection(i,"next"),this.horizontal?i.style.transform="translateX(0%)":i.style.transform="translateY(0%)",l=o.filter(function(f){return f.getAttribute("data-sf-index")===c.toString()}),this.activeIndex=c),l.forEach(function(f){r.clearAllAndSetThisActive(f)}),this.debounceOnChange(e,a,c))}},{key:"setActiveSection",value:function(e,t){if(this.sections.forEach(function(a){a.classList.remove("sf-section-active")}),t==="next"&&e)e.classList.add("sf-section-active"),this.handleOverflowContent(e);else if(t==="prev"&&e){var i=e.previousElementSibling;i?(i.classList.add("sf-section-active"),this.handleOverflowContent(i)):(e.classList.add("sf-section-active"),this.handleOverflowContent(e))}}},{key:"handleOverflowContent",value:function(e){var t=e.scrollWidth>e.clientWidth,i=e.scrollHeight>e.clientHeight;if(!t&&!i){e.style.overflow="hidden";return}var a=e.querySelector(".sf-content-overflow");a||(a=document.createElement("div"),a.classList.add("sf-content-overflow"),Array.from(e.childNodes).forEach(function(l){l!==a&&a.appendChild(l)}),e.appendChild(a));var r=a.scrollWidth>e.clientWidth,o=a.scrollHeight>e.clientHeight;r?(a.classList.add("horizontal"),e.style.overflowX="auto",this.setupHorizontalScroll(e,a)):(a.classList.remove("horizontal"),e.style.overflowX="hidden"),o?(e.style.overflowY="auto",this.setupVerticalScroll(e,a)):e.style.overflowY="hidden"}},{key:"setupHorizontalScroll",value:function(e,t){var i=this;if(this.isMobile){var a=0;e.addEventListener("touchstart",function(r){a=r.touches[0].clientX}),e.addEventListener("touchend",function(r){i.allowScroll=!1;var o=r.changedTouches[0].clientX,l=o-a,c=e.scrollLeft,f=c>=t.clientWidth-(window.innerWidth+15),h=c<=15;(l>0&&h||l<0&&f)&&(i.allowScroll=!0)})}else this.allowScroll=!1,e.addEventListener("wheel",function(r){var o=t.clientWidth-window.innerWidth-10,l=e.scrollLeft<=10;r.deltaY>0?(e.scrollLeft+=35,e.scrollLeft>o&&(i.allowScroll=!0)):(e.scrollLeft-=35,l&&(i.allowScroll=!0))})}},{key:"setupVerticalScroll",value:function(e,t){var i=this;if(this.isMobile){var a=0;e.addEventListener("touchstart",function(r){a=r.touches[0].clientY}),e.addEventListener("touchend",function(r){i.allowScroll=!1;var o=r.changedTouches[0].clientY,l=o-a,c=e.scrollTop,f=c>=t.clientHeight-(window.innerHeight+15),h=c<=15;(l>0&&h||l<0&&f)&&(i.allowScroll=!0)})}else this.allowScroll=!1,e.addEventListener("wheel",function(r){var o=e.scrollTop>=t.clientHeight-(window.innerHeight+15),l=e.scrollTop<=15;(o&&r.deltaY>0||r.deltaY<0&&l)&&(i.allowScroll=!0)})}},{key:"checkContentOverflow",value:function(e){var t=e.querySelector(".sf-content-overflow");if(t)return t.clientHeight>e.clientHeight||t.clientWidth>e.clientWidth}},{key:"debounceOnChange",value:function(e,t,i){var a=this;this.debounceTimeout&&clearTimeout(this.debounceTimeout),this.debounceTimeout=window.setTimeout(function(){a.onChangeCallback&&a.onChangeCallback(e,t,i),a.isNavigating=!1},500)}},{key:"clearAllAndSetThisActive",value:function(e){var t=Array.from(document.querySelectorAll(".sf-trigger"));t.forEach(function(i){return i.classList.remove("active")}),e.classList.add("active")}}])}(),C=function(){function s(n,e,t,i){v(this,s),this.sf=n,this.sections=e,this.horizontal=t,this.paginateAxis=i}return p(s,[{key:"initializePagination",value:function(){var e=this,t=document.createElement("div");t.classList.add("sf-pagination"),this.sf.appendChild(t),(this.horizontal||this.paginateAxis==="x")&&t.classList.add("sf-pagination-horizontal"),this.sections.forEach(function(i,a){t.appendChild(e.createDot(a))})}},{key:"createDot",value:function(e){var t=document.createElement("div");return t.classList.add("sf-dot","sf-trigger"),t.setAttribute("data-sf-index",e.toString()),e===0&&t.classList.add("active"),t}}])}();function L(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1024;return window.innerWidth<s}var d={horizontal:!1,paginate:!1,paginateAxis:"y",breakpoint:1024,fade:"none",speed:900},O=function(){function s(){v(this,s),this.sf=document.querySelector(".scrollFlow"),this.sfwrapper=document.querySelector(".sf-wrapper"),this.sections=document.querySelectorAll(".sf-section"),this.horizontal=!1,this.paginate=!1,this.paginateAxis="y",this.breakpoint=1024,this.isMobile=!1,this.fade="none",this.speed=900,this.sectionManager=new S(this.sfwrapper,this.sections,this.horizontal,this.isMobile,this.onSectionChange.bind(this)),this.onChangeCallback=null}return p(s,[{key:"applyFade",value:function(){this.sf&&(this.sf.classList.remove("fade","fade-content"),this.fade==="auto"?this.sf.classList.add("fade"):this.fade==="content"&&this.sf.classList.add("fade-content"))}},{key:"applyTransition",value:function(){var e=document.createElement("style");e.innerHTML=`
      .scrollFlow .sf-section {
        transition: transform `.concat(this.speed,`ms ease;
      }
    `),document.head.appendChild(e)}},{key:"handlePaginate",value:function(){if(this.sf){var e=new C(this.sf,this.sections,this.horizontal,this.paginateAxis);e.initializePagination()}}},{key:"initializeSections",value:function(){var e=this;this.sections.forEach(function(t,i){if(t.style.zIndex=(i+1).toString(),i===0){t.classList.add("is-first");return}if(e.horizontal){t.style.transform="translateX(100%)";return}t.style.display="none",t.style.transform="translateY(100%)"})}},{key:"setupEventListeners",value:function(){this.isMobile?this.sectionManager.setupMobileEvents():this.sectionManager.setupDesktopEvents(),this.startNavigation()}},{key:"startNavigation",value:function(){var e=this,t=document.querySelectorAll(".sf-trigger");if(t.forEach(function(a){a.addEventListener("click",function(r){var o=parseInt(a.getAttribute("data-sf-index"),10);e.sectionManager.jumpToSection(o),sessionStorage.setItem("sf-anchor",o.toString())})}),sessionStorage.getItem("sf-anchor")){var i=parseInt(sessionStorage.getItem("sf-anchor"),10);setTimeout(function(){e.sectionManager.jumpToSection(i),sessionStorage.removeItem("sf-anchor")},this.speed)}}},{key:"start",value:function(e){var t,i,a=y(y({},d),e);this.horizontal=a.horizontal||((t=this.sf)===null||t===void 0?void 0:t.classList.contains("horizontal"))||!1,this.paginate=a.paginate||((i=this.sf)===null||i===void 0?void 0:i.classList.contains("paginate"))||!1,this.paginateAxis=a.paginateAxis||"y",this.breakpoint=a.breakpoint||1024,this.isMobile=L(this.breakpoint),this.fade=a.fade||d.fade||"none",this.speed=a.speed||d.speed||900,this.sectionManager=new S(this.sfwrapper,this.sections,this.horizontal,this.isMobile,this.onSectionChange.bind(this)),this.paginate&&this.handlePaginate(),this.fade!=="none"&&this.applyFade(),this.applyTransition(),this.initializeSections(),this.setupEventListeners()}},{key:"stop",value:function(){this.sectionManager.stopScroll()}},{key:"allow",value:function(){this.sectionManager.startScroll()}},{key:"onChange",value:function(e){if(e){this.onChangeCallback=e;return}this.onChangeCallback=null}},{key:"getCurrentIndex",value:function(){return this.sectionManager.getCurrentIndex()}},{key:"goToSection",value:function(e){if(e<0||e>=this.sections.length){console.error("Index ".concat(e," is out of bounds or invalid."));return}this.sectionManager.jumpToSection(e)}},{key:"onSectionChange",value:function(e,t,i){this.onChangeCallback&&this.onChangeCallback(e,t,i)}}])}();document.addEventListener("DOMContentLoaded",function(){var s=new O;s.start({horizontal:!1,paginate:!0,breakpoint:769,fade:"content",speed:900}),s.onChange(function(n,e,t){console.log(n,e,t)})});