// ScrollFlow.ts
import "./styles.css";
import { SectionManager } from './SectionManager.js';
import { PaginationManager } from './PaginationManager.js';
import { isMobileDevice } from './Utils.js';
import { ScrollFlowOptions, defaultOptions } from './Options.js';

class ScrollFlow {
  private sf: HTMLElement | null;
  private sfwrapper: HTMLElement | null;
  private sections: NodeListOf<HTMLElement>;
  private horizontal: boolean;
  private paginate: boolean;
  private paginateAxis: 'x' | 'y';
  private breakpoint: number;
  private fade: 'auto' | 'content' | 'none';
  private speed: number;
  private isMobile: boolean;
  private sectionManager: SectionManager | null;
  private onChangeCallback: ((direction: string, currentIndex: number, targetIndex: number) => void) | null;

  constructor() {
    this.sf = document.querySelector(".scrollFlow");
    this.sfwrapper = document.querySelector(".sf-wrapper");
    this.sections = document.querySelectorAll(".sf-section");
    this.horizontal = false;
    this.paginate = false;
    this.paginateAxis = 'y';
    this.breakpoint = 1024;
    this.isMobile = false;
    this.fade = 'content';
    this.speed = 900;
    
    this.sectionManager = new SectionManager(this.sfwrapper!, this.sections, this.horizontal, this.isMobile, this.onChange.bind(this));
    this.onChangeCallback = null;
  }

  private applyFade() {
    if (this.sf) {
      this.sf.classList.remove('fade', 'fade-content');
      if (this.fade === 'auto') {
        this.sf.classList.add('fade');
      } else if (this.fade === 'content') {
        this.sf.classList.add('fade-content');
      }
    }
  }

  private applyTransition() {
    const sectionStyle = document.createElement('style');
    sectionStyle.innerHTML = `
      .scrollFlow .sf-section {
        transition: transform ${this.speed}ms ease;
      }
    `;
    document.head.appendChild(sectionStyle);
  }

  private handlePaginate() {

    if(this.sf) {
      const paginationManager = new PaginationManager(this.sf!, this.sections, this.horizontal, this.paginateAxis);
      paginationManager.initializePagination();
    }
  }

  private initializeSections() {
    this.sections.forEach((el, index) => {

      el.style.zIndex = (index + 1).toString();

      if (index === 0) {

        el.classList.add("is-first");        
        return;
      }

      if (this.horizontal) {
        el.style.transform = "translateX(100%)";
        return;
      }
      
      el.style.display = "none";
      el.style.transform = "translateY(100%)";
    });
  }

  private setupEventListeners() {

    this.isMobile ? this.sectionManager!.setupMobileEvents() : this.sectionManager!.setupDesktopEvents();;

    this.startNavigation();
  }

  private startNavigation() {
    const linksNavigation: NodeListOf<HTMLElement> = document.querySelectorAll(".sf-trigger");
  
    linksNavigation.forEach((element) => {
      element.addEventListener("click", (e) => {
        const targetIndex = parseInt(element.getAttribute("data-sf-index")!, 10);
        this.sectionManager!.jumpToSection(targetIndex);

        sessionStorage.setItem("sf-anchor", targetIndex.toString());
      });
    });

    if (sessionStorage.getItem("sf-anchor")) {
      const targetIndex = parseInt(sessionStorage.getItem("sf-anchor")!, 10);
      
      setTimeout(() => {
        
        this.sectionManager!.jumpToSection(targetIndex);
        sessionStorage.removeItem("sf-anchor");
      }, this.speed);
    }
  }

  public start(options?: ScrollFlowOptions) {
    const config = { ...defaultOptions, ...options };

    // Merge options with class-based settings
    this.horizontal = config.horizontal || this.sf?.classList.contains("horizontal") || false;
    this.paginate = config.paginate || this.sf?.classList.contains("paginate") || false;
    this.paginateAxis = config.paginateAxis || 'y';
    this.breakpoint = config.breakpoint || 1024;
    this.isMobile = isMobileDevice(this.breakpoint);
    this.fade = config.fade || defaultOptions.fade || 'content';
    this.speed = config.speed || defaultOptions.speed || 900;

    this.sectionManager = new SectionManager(this.sfwrapper!, this.sections, this.horizontal, this.isMobile, this.onChange.bind(this));

    if (this.paginate) {
      this.handlePaginate();
    }

    if(this.fade !== 'none') {
      this.applyFade();
    }

    this.applyTransition();
    this.initializeSections();
    this.setupEventListeners();
  }

  public stop() {
    this.sectionManager!.stopScroll();
  }

  public allow() {
    this.sectionManager!.startScroll();
  }

  public onChangeSection(callback?: (direction: string, currentIndex: number, targetIndex: number) => void) {
    if (callback) {
      this.onChangeCallback = callback;
      return;      
    }
    
    this.onChangeCallback = null;
  }

  public getCurrentIndex(): number {
    return this.sectionManager!.getCurrentIndex();
  }

  public goToSection(index: number) {
    if (index < 0 || index >= this.sections.length) {
      console.error(`Index ${index} is out of bounds or invalid.`);
      return;
    }

    this.sectionManager!.jumpToSection(index);
  }

  private onChange(direction: string, currentIndex: number, targetIndex: number) {
    if (this.onChangeCallback) {
      this.onChangeCallback(direction, currentIndex, targetIndex);
    }
  }
}

export default ScrollFlow;
