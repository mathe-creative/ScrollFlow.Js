import { getAutoFlowOrigin } from "./Utils";

export class SectionManager {
  private sfwrapper: HTMLElement;
  private sections: NodeListOf<HTMLElement>;
  private horizontal: boolean;
  private isMobile: boolean;
  private allowScroll: boolean;
  private scrollDirection: string;
  private onChangeCallback: ((direction: string, currentIndex: number, targetIndex: number) => void) | null;
  private activeIndex: number; 
  private isNavigating: boolean;
  private debounceTimeout: number | null;

  constructor(
    sfwrapper: HTMLElement,
    sections: NodeListOf<HTMLElement>,
    horizontal: boolean,
    isMobile: boolean,
    onChangeCallback: ((direction: string, currentIndex: number, targetIndex: number) => void) | null = null) {
    this.sfwrapper = sfwrapper;
    this.sections = sections;
    this.horizontal = horizontal;
    this.isMobile = isMobile;
    this.allowScroll = true;
    this.scrollDirection = "next";
    this.onChangeCallback = onChangeCallback;
    this.activeIndex = 0;
    this.isNavigating = false;
    this.debounceTimeout = null;
  }

  public getCurrentIndex(): number {
    return this.activeIndex;
  }

  public onChange(callback: (direction: string, fromIndex: number, toIndex: number) => void) {
    this.onChangeCallback = callback;
  }

  public stopScroll() {
    this.allowScroll = false;
  }

  public startScroll() {
    this.allowScroll = true;
  }

  public jumpToSection(targetIndex: number) {

    if (this.isNavigating || targetIndex < 0 || targetIndex >= this.sections.length) {
      return;
    }

    const currentSection = document.querySelector(".sf-section-active") as HTMLElement;
    const currentIndex = Array.prototype.indexOf.call(this.sections, currentSection);

    if (targetIndex !== currentIndex) {
      this.isNavigating = true;

      const direction = targetIndex > currentIndex ? "next" : "prev";
      const targetSection = this.sections[targetIndex];

      for (
        let i = currentIndex;
        direction === "next" ? i < targetIndex : i > targetIndex;
        direction === "next" ? i++ : i--
      ) {
        this.handleSectionActiveTranslate(
          direction,
          this.sections[i],
          this.sections[i + 1] as HTMLElement,
          i
        );
      }

      targetSection.classList.add("sf-section-active");
      this.activeIndex = targetIndex;

      const isContentOverflowing = this.checkContentOverflow(targetSection);

      if (isContentOverflowing) {
        this.stopScroll();
      } else {
        this.startScroll();
      }

      this.debounceOnChange(direction, currentIndex, targetIndex);
    }
  }
  
  public setupMobileEvents() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    const touchThreshold = 10;

    this.sfwrapper &&
      this.sfwrapper.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      });

    this.sfwrapper &&
      this.sfwrapper.addEventListener("touchend", (event) => {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;

        const element = document.querySelector(
          ".sf-section-active"
        ) as HTMLElement;
        const index = Array.prototype.indexOf.call(this.sections, element);

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (
          Math.abs(deltaX) > touchThreshold ||
          Math.abs(deltaY) > touchThreshold
        ) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.scrollDirection = deltaX > 0 ? "prev" : "next";
          } else {
            this.scrollDirection = deltaY > 0 ? "prev" : "next";
          }

          if (this.allowScroll) {
            this.handleSectionActiveTranslate(
              this.scrollDirection,
              element,
              this.sections[index + 1] as HTMLElement,
              index
            );
          }
        }
      });
  }

  public setupDesktopEvents() {
    this.sections.forEach((element, index) => {
      element.addEventListener("wheel", (e) => {
        if (this.allowScroll) {
          this.scrollDirection = e.deltaY < 0 ? "prev" : "next";
          const nextSection = this.scrollDirection === "next" ? this.sections[index + 1] : this.sections[index - 1];

          if (nextSection) {
            this.handleSectionActiveTranslate(
              this.scrollDirection,
              element,
              nextSection as HTMLElement,
              index
            );
          }
        }
      });
    });
  }

  public handleSectionActiveTranslate(
    direction: string,
    sectionCurrent: HTMLElement,
    sectionNext: HTMLElement,
    index: number
  ) {

    this.sections.forEach((el) => {
      el.style.display = "block";
    });

    const linksNavigation = Array.from(
      document.querySelectorAll(".sf-trigger")
    );
    let activeIndicators: Element[] = [];
    let nextIndex = direction === "prev" ? index - 1 : index + 1;

    if ((direction === "prev" && nextIndex < 0) || (direction === "next" && nextIndex >= this.sections.length)) {
      return; 
    }

    if (direction === "prev" && sectionCurrent) {
      this.setActiveSection(sectionCurrent, "prev");

      if (!sectionCurrent.classList.contains("is-first")) {
        
        sectionCurrent.style.transform = getAutoFlowOrigin(sectionCurrent, this.horizontal);
      }

      activeIndicators = linksNavigation.filter(
        (link) => link.getAttribute("data-sf-index") === nextIndex.toString()
      );

      this.activeIndex = nextIndex;
    } else if (direction === "next" && sectionNext) {
      this.setActiveSection(sectionNext, "next");

      const transformPrefix = sectionNext.style.transform.split("(")[0];
      
      sectionNext.style.transform = `${transformPrefix}(0%)`;

      activeIndicators = linksNavigation.filter(
        (link) => link.getAttribute("data-sf-index") === nextIndex.toString()
      );

      this.activeIndex = nextIndex;
    }

    activeIndicators.forEach((el) => {
      this.clearAllAndSetThisActive(el as HTMLElement);
    });

    this.debounceOnChange(direction, index, nextIndex);
  }
  private setActiveSection(section: HTMLElement, origin: string) {
    this.sections.forEach((child) => {
      child.classList.remove("sf-section-active");
    });

    if (origin === "next" && section) {
      section.classList.add("sf-section-active");
      this.handleOverflowContent(section);
    } else if (origin === "prev" && section) {
      const previous = section.previousElementSibling as HTMLElement;
      if (previous) {
        previous.classList.add("sf-section-active");
        this.handleOverflowContent(previous);
      } else {
        section.classList.add("sf-section-active");
        this.handleOverflowContent(section);
      }
    }
  }
  private handleOverflowContent(section: HTMLElement) {

    const isHorizontalOverflow = section.scrollWidth > section.clientWidth;
    const isVerticalOverflow = section.scrollHeight > section.clientHeight;

    if (!isHorizontalOverflow && !isVerticalOverflow) {
        section.style.overflow = "hidden";
        return;
    }

    let contentOverflowDiv = section.querySelector(".sf-content-overflow") as HTMLElement;

    if (!contentOverflowDiv) {
        contentOverflowDiv = document.createElement("div");
        contentOverflowDiv.classList.add("sf-content-overflow");

        // Movendo os filhos para a nova div
        Array.from(section.childNodes).forEach(child => {
            if (child !== contentOverflowDiv) {
                contentOverflowDiv.appendChild(child);
            }
        });

        section.appendChild(contentOverflowDiv);
    }

    const isHorizontalContentOverflow = contentOverflowDiv.scrollWidth > section.clientWidth;
    const isVerticalContentOverflow = contentOverflowDiv.scrollHeight > section.clientHeight;

    if (isHorizontalContentOverflow) {
        contentOverflowDiv.classList.add("horizontal");
        section.style.overflowX = "auto";
        this.setupHorizontalScroll(section, contentOverflowDiv);
    } else {
        contentOverflowDiv.classList.remove("horizontal");
        section.style.overflowX = "hidden";
    }

    if (isVerticalContentOverflow) {
        section.style.overflowY = "auto";
        this.setupVerticalScroll(section, contentOverflowDiv);
    } else {
        section.style.overflowY = "hidden";
    }
}


  private setupHorizontalScroll(section: HTMLElement, content: HTMLElement) {
    if (this.isMobile) {
      let startX = 0;
      section.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
      });

      section.addEventListener("touchend", (e) => {
        this.allowScroll = false;

        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        const currentScrollLeft = section.scrollLeft;
        const isSectionEnd =
          currentScrollLeft >= content.clientWidth - (window.innerWidth + 15);
        const isSectionStart = currentScrollLeft <= 15;

        if ((deltaX > 0 && isSectionStart) || (deltaX < 0 && isSectionEnd)) {
          this.allowScroll = true;
        }
      });
    } else {
      this.allowScroll = false;
      section.addEventListener("wheel", (e) => {
        const scrollLeftLimit = content.clientWidth - window.innerWidth - 10;
        const isSectionStart = section.scrollLeft <= 10;

        if (e.deltaY > 0) {
          section.scrollLeft += 35;

          if (section.scrollLeft > scrollLeftLimit) {
            this.allowScroll = true;
          }
        } else {
          section.scrollLeft -= 35;

          if (isSectionStart) {
            this.allowScroll = true;
          }
        }
      });
    }
  }

  private setupVerticalScroll(section: HTMLElement, content: HTMLElement) {
    if (this.isMobile) {
      let startY = 0;
      section.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
      });

      section.addEventListener("touchend", (e) => {
        this.allowScroll = false;

        const endY = e.changedTouches[0].clientY;
        const deltaY = endY - startY;

        const currentScrollTop = section.scrollTop;
        const isSectionEnd =
          currentScrollTop >= content.clientHeight - (window.innerHeight + 15);
        const isSectionStart = currentScrollTop <= 15;

        if ((deltaY > 0 && isSectionStart) || (deltaY < 0 && isSectionEnd)) {
          this.allowScroll = true;
        }
      });
    } else {
      this.allowScroll = false;

      section.addEventListener("wheel", (e) => {
        const isSectionEnd =
          section.scrollTop >= content.clientHeight - (window.innerHeight + 15);
        const isSectionStart = section.scrollTop <= 15;

        if (isSectionEnd && e.deltaY > 0) {
          this.allowScroll = true;
        } else if (e.deltaY < 0 && isSectionStart) {
          this.allowScroll = true;
        }
      });
    }
  }

  private checkContentOverflow(section: HTMLElement) {
    const content = section.querySelector(".sf-content-overflow");

    if (!content) {
      return;
    }

    return (content.clientHeight > section.clientHeight || content.clientWidth > section.clientWidth);
  }

  private debounceOnChange(direction: string, currentIndex: number, targetIndex: number) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = window.setTimeout(() => {
      if (this.onChangeCallback) {
        this.onChangeCallback(direction, currentIndex, targetIndex);
      }
      this.isNavigating = false;
    }, 500);
  }

  private clearAllAndSetThisActive(element: HTMLElement) {
    const activeLinks = Array.from(document.querySelectorAll(".sf-trigger"));
    activeLinks.forEach((el) => el.classList.remove("active"));
    element.classList.add("active");
  }
}
