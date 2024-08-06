var g = Object.defineProperty;
var u = (c, t, e) => t in c ? g(c, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : c[t] = e;
var o = (c, t, e) => u(c, typeof t != "symbol" ? t + "" : t, e);
class p {
  constructor(t, e, s, i, a = null) {
    o(this, "sfwrapper");
    o(this, "sections");
    o(this, "horizontal");
    o(this, "isMobile");
    o(this, "allowScroll");
    o(this, "scrollDirection");
    o(this, "onChangeCallback");
    o(this, "activeIndex");
    o(this, "isNavigating");
    o(this, "debounceTimeout");
    this.sfwrapper = t, this.sections = e, this.horizontal = s, this.isMobile = i, this.allowScroll = !0, this.scrollDirection = "next", this.onChangeCallback = a, this.activeIndex = 0, this.isNavigating = !1, this.debounceTimeout = null;
  }
  getCurrentIndex() {
    return this.activeIndex;
  }
  onChange(t) {
    this.onChangeCallback = t;
  }
  stopScroll() {
    this.allowScroll = !1;
  }
  startScroll() {
    this.allowScroll = !0;
  }
  jumpToSection(t) {
    if (this.isNavigating || t < 0 || t >= this.sections.length)
      return;
    const e = document.querySelector(".sf-section-active"), s = Array.prototype.indexOf.call(this.sections, e);
    if (t !== s) {
      this.isNavigating = !0;
      const i = t > s ? "next" : "prev", a = this.sections[t];
      for (let n = s; i === "next" ? n < t : n > t; i === "next" ? n++ : n--)
        this.handleSectionActiveTranslate(i, this.sections[n], this.sections[n + 1], n);
      a.classList.add("sf-section-active"), this.activeIndex = t, this.checkContentOverflow(a) ? this.stopScroll() : this.startScroll(), this.debounceOnChange(i, s, t);
    }
  }
  setupMobileEvents() {
    let t = 0, e = 0, s = 0, i = 0;
    const a = 10;
    this.sfwrapper && this.sfwrapper.addEventListener("touchstart", (l) => {
      t = l.touches[0].clientX, e = l.touches[0].clientY;
    }), this.sfwrapper && this.sfwrapper.addEventListener("touchend", (l) => {
      s = l.changedTouches[0].clientX, i = l.changedTouches[0].clientY;
      const n = document.querySelector(".sf-section-active"), r = Array.prototype.indexOf.call(this.sections, n), h = s - t, f = i - e;
      (Math.abs(h) > a || Math.abs(f) > a) && (Math.abs(h) > Math.abs(f) ? this.scrollDirection = h > 0 ? "prev" : "next" : this.scrollDirection = f > 0 ? "prev" : "next", this.allowScroll && this.handleSectionActiveTranslate(this.scrollDirection, n, this.sections[r + 1], r));
    });
  }
  setupDesktopEvents() {
    this.sections.forEach((t, e) => {
      t.addEventListener("wheel", (s) => {
        if (this.allowScroll) {
          this.scrollDirection = s.deltaY < 0 ? "prev" : "next";
          const i = this.scrollDirection === "next" ? this.sections[e + 1] : this.sections[e - 1];
          i && this.handleSectionActiveTranslate(this.scrollDirection, t, i, e);
        }
      });
    });
  }
  handleSectionActiveTranslate(t, e, s, i) {
    this.sections.forEach((r) => {
      r.style.display = "block";
    });
    const a = Array.from(document.querySelectorAll(".sf-trigger"));
    let l = [], n = t === "prev" ? i - 1 : i + 1;
    t === "prev" && n < 0 || t === "next" && n >= this.sections.length || (t === "prev" && e ? (this.setActiveSection(e, "prev"), e.classList.contains("is-first") || (this.horizontal ? e.style.transform = "translateX(100%)" : e.style.transform = "translateY(100%)"), l = a.filter((r) => r.getAttribute("data-sf-index") === n.toString()), this.activeIndex = n) : t === "next" && s && (this.setActiveSection(s, "next"), this.horizontal ? s.style.transform = "translateX(0%)" : s.style.transform = "translateY(0%)", l = a.filter((r) => r.getAttribute("data-sf-index") === n.toString()), this.activeIndex = n), l.forEach((r) => {
      this.clearAllAndSetThisActive(r);
    }), this.debounceOnChange(t, i, n));
  }
  setActiveSection(t, e) {
    if (this.sections.forEach((s) => {
      s.classList.remove("sf-section-active");
    }), e === "next" && t)
      t.classList.add("sf-section-active"), this.handleOverflowContent(t);
    else if (e === "prev" && t) {
      const s = t.previousElementSibling;
      s ? (s.classList.add("sf-section-active"), this.handleOverflowContent(s)) : (t.classList.add("sf-section-active"), this.handleOverflowContent(t));
    }
  }
  handleOverflowContent(t) {
    const e = t.scrollWidth > t.clientWidth, s = t.scrollHeight > t.clientHeight;
    if (!e && !s) {
      t.style.overflow = "hidden";
      return;
    }
    let i = t.querySelector(".sf-content-overflow");
    i || (i = document.createElement("div"), i.classList.add("sf-content-overflow"), Array.from(t.childNodes).forEach((n) => {
      n !== i && i.appendChild(n);
    }), t.appendChild(i));
    const a = i.scrollWidth > t.clientWidth, l = i.scrollHeight > t.clientHeight;
    a ? (i.classList.add("horizontal"), t.style.overflowX = "auto", this.setupHorizontalScroll(t, i)) : (i.classList.remove("horizontal"), t.style.overflowX = "hidden"), l ? (t.style.overflowY = "auto", this.setupVerticalScroll(t, i)) : t.style.overflowY = "hidden";
  }
  setupHorizontalScroll(t, e) {
    if (this.isMobile) {
      let s = 0;
      t.addEventListener("touchstart", (i) => {
        s = i.touches[0].clientX;
      }), t.addEventListener("touchend", (i) => {
        this.allowScroll = !1;
        const l = i.changedTouches[0].clientX - s, n = t.scrollLeft, r = n >= e.clientWidth - (window.innerWidth + 15), h = n <= 15;
        (l > 0 && h || l < 0 && r) && (this.allowScroll = !0);
      });
    } else
      this.allowScroll = !1, t.addEventListener("wheel", (s) => {
        const i = e.clientWidth - window.innerWidth - 10, a = t.scrollLeft <= 10;
        s.deltaY > 0 ? (t.scrollLeft += 35, t.scrollLeft > i && (this.allowScroll = !0)) : (t.scrollLeft -= 35, a && (this.allowScroll = !0));
      });
  }
  setupVerticalScroll(t, e) {
    if (this.isMobile) {
      let s = 0;
      t.addEventListener("touchstart", (i) => {
        s = i.touches[0].clientY;
      }), t.addEventListener("touchend", (i) => {
        this.allowScroll = !1;
        const l = i.changedTouches[0].clientY - s, n = t.scrollTop, r = n >= e.clientHeight - (window.innerHeight + 15), h = n <= 15;
        (l > 0 && h || l < 0 && r) && (this.allowScroll = !0);
      });
    } else
      this.allowScroll = !1, t.addEventListener("wheel", (s) => {
        const i = t.scrollTop >= e.clientHeight - (window.innerHeight + 15), a = t.scrollTop <= 15;
        i && s.deltaY > 0 ? this.allowScroll = !0 : s.deltaY < 0 && a && (this.allowScroll = !0);
      });
  }
  checkContentOverflow(t) {
    const e = t.querySelector(".sf-content-overflow");
    if (e)
      return e.clientHeight > t.clientHeight || e.clientWidth > t.clientWidth;
  }
  debounceOnChange(t, e, s) {
    this.debounceTimeout && clearTimeout(this.debounceTimeout), this.debounceTimeout = window.setTimeout(() => {
      this.onChangeCallback && this.onChangeCallback(t, e, s), this.isNavigating = !1;
    }, 500);
  }
  clearAllAndSetThisActive(t) {
    Array.from(document.querySelectorAll(".sf-trigger")).forEach((s) => s.classList.remove("active")), t.classList.add("active");
  }
}
class v {
  constructor(t, e, s, i) {
    o(this, "sf");
    o(this, "sections");
    o(this, "horizontal");
    o(this, "paginateAxis");
    this.sf = t, this.sections = e, this.horizontal = s, this.paginateAxis = i;
  }
  initializePagination() {
    const t = document.createElement("div");
    t.classList.add("sf-pagination"), this.sf.appendChild(t), (this.horizontal || this.paginateAxis === "x") && t.classList.add("sf-pagination-horizontal"), this.sections.forEach((e, s) => {
      t.appendChild(this.createDot(s));
    });
  }
  createDot(t) {
    const e = document.createElement("div");
    return e.classList.add("sf-dot", "sf-trigger"), e.setAttribute("data-sf-index", t.toString()), t === 0 && e.classList.add("active"), e;
  }
}
function S(c = 1024) {
  return window.innerWidth < c;
}
const d = {
  horizontal: !1,
  paginate: !1,
  paginateAxis: "y",
  breakpoint: 1024,
  fade: "content",
  speed: 900
};
class m {
  constructor() {
    o(this, "sf");
    o(this, "sfwrapper");
    o(this, "sections");
    o(this, "horizontal");
    o(this, "paginate");
    o(this, "paginateAxis");
    o(this, "breakpoint");
    o(this, "fade");
    o(this, "speed");
    o(this, "isMobile");
    o(this, "sectionManager");
    o(this, "onChangeCallback");
    this.sf = document.querySelector(".scrollFlow"), this.sfwrapper = document.querySelector(".sf-wrapper"), this.sections = document.querySelectorAll(".sf-section"), this.horizontal = !1, this.paginate = !1, this.paginateAxis = "y", this.breakpoint = 1024, this.isMobile = !1, this.fade = "content", this.speed = 900, this.sectionManager = new p(this.sfwrapper, this.sections, this.horizontal, this.isMobile, this.onSectionChange.bind(this)), this.onChangeCallback = null;
  }
  applyFade() {
    this.sf && (this.sf.classList.remove("fade", "fade-content"), this.fade === "auto" ? this.sf.classList.add("fade") : this.fade === "content" && this.sf.classList.add("fade-content"));
  }
  applyTransition() {
    const t = document.createElement("style");
    t.innerHTML = `
      .scrollFlow .sf-section {
        transition: transform ${this.speed}ms ease;
      }
    `, document.head.appendChild(t);
  }
  handlePaginate() {
    this.sf && new v(this.sf, this.sections, this.horizontal, this.paginateAxis).initializePagination();
  }
  initializeSections() {
    this.sections.forEach((t, e) => {
      if (t.style.zIndex = (e + 1).toString(), e === 0) {
        t.classList.add("is-first");
        return;
      }
      if (this.horizontal) {
        t.style.transform = "translateX(100%)";
        return;
      }
      t.style.display = "none", t.style.transform = "translateY(100%)";
    });
  }
  setupEventListeners() {
    this.isMobile ? this.sectionManager.setupMobileEvents() : this.sectionManager.setupDesktopEvents(), this.startNavigation();
  }
  startNavigation() {
    if (document.querySelectorAll(".sf-trigger").forEach((e) => {
      e.addEventListener("click", (s) => {
        const i = parseInt(e.getAttribute("data-sf-index"), 10);
        this.sectionManager.jumpToSection(i), sessionStorage.setItem("sf-anchor", i.toString());
      });
    }), sessionStorage.getItem("sf-anchor")) {
      const e = parseInt(sessionStorage.getItem("sf-anchor"), 10);
      setTimeout(() => {
        this.sectionManager.jumpToSection(e), sessionStorage.removeItem("sf-anchor");
      }, this.speed);
    }
  }
  start(t) {
    var s, i;
    const e = {
      ...d,
      ...t
    };
    this.horizontal = e.horizontal || ((s = this.sf) == null ? void 0 : s.classList.contains("horizontal")) || !1, this.paginate = e.paginate || ((i = this.sf) == null ? void 0 : i.classList.contains("paginate")) || !1, this.paginateAxis = e.paginateAxis || "y", this.breakpoint = e.breakpoint || 1024, this.isMobile = S(this.breakpoint), this.fade = e.fade || d.fade || "content", this.speed = e.speed || d.speed || 900, this.sectionManager = new p(this.sfwrapper, this.sections, this.horizontal, this.isMobile, this.onSectionChange.bind(this)), this.paginate && this.handlePaginate(), this.fade !== "none" && this.applyFade(), this.applyTransition(), this.initializeSections(), this.setupEventListeners();
  }
  stop() {
    this.sectionManager.stopScroll();
  }
  allow() {
    this.sectionManager.startScroll();
  }
  onChange(t) {
    if (t) {
      this.onChangeCallback = t;
      return;
    }
    this.onChangeCallback = null;
  }
  getCurrentIndex() {
    return this.sectionManager.getCurrentIndex();
  }
  goToSection(t) {
    if (t < 0 || t >= this.sections.length) {
      console.error(`Index ${t} is out of bounds or invalid.`);
      return;
    }
    this.sectionManager.jumpToSection(t);
  }
  onSectionChange(t, e, s) {
    this.onChangeCallback && this.onChangeCallback(t, e, s);
  }
}
export {
  m as default
};
