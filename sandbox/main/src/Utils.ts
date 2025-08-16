export function isMobileDevice(breakpoint: number = 1024): boolean {
  return window.innerWidth < breakpoint;
}

export function getAutoFlowOrigin (section: HTMLElement, isHorizontal: boolean): string {

      if(section.classList.contains('sf-autoflow-left')) {
        return "translateX(-100%)";
      }

      if(section.classList.contains('sf-autoflow-top')) {
        return "translateY(-100%)";
      }

      if(section.classList.contains('sf-autoflow-right')) {
        return "translateX(100%)";
      }

      if(section.classList.contains('sf-autoflow-bottom')) {
        return "translateY(100%)";
      }

      if (isHorizontal) {
        return "translateX(100%)";
      }
      
      return "translateY(100%)";
}