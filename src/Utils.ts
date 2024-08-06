export function isMobileDevice(breakpoint: number = 1024): boolean {
  return window.innerWidth < breakpoint;
}