import "./styles.css";
import ScrollFlow from "./ScrollFlow";

document.addEventListener("DOMContentLoaded", () => {
  const scrollFlow = new ScrollFlow();

  scrollFlow.start({
    horizontal: false,
    paginate: true,
    breakpoint: 769,
    fade: "content",
    speed: 900,
  });
});
