// Options.ts

export interface ScrollFlowOptions {
    horizontal?: boolean;
    paginate?: boolean;
    paginateAxis?: 'y' | 'x';
    breakpoint?: number;
    fade?: 'auto' | 'content' | 'none';
    speed?: number; 
  }
  
  export const defaultOptions: ScrollFlowOptions = {
    horizontal: false,
    paginate: false,
    paginateAxis: 'y',
    breakpoint: 1024,
    fade: 'none',
    speed: 900,
  };
  