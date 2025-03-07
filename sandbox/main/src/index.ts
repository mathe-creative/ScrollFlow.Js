import ScrollFlow from "./ScrollFlow";

document.addEventListener("DOMContentLoaded", () => {
  const scrollFlow = new ScrollFlow();

  scrollFlow.init({
    fade: "content",
    speed: 1000,
    breakpoint: 769,
    paginate: true,
  });

  scrollFlow.onChange((direction, currentIndex, targetIndex) => {
    console.log(direction, currentIndex, targetIndex);
  });
});
