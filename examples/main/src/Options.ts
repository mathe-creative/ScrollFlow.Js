// Options.ts

export namespace ScrollFlowOptions {
  export interface Options {
    horizontal?: boolean;
    paginate?: boolean;
    paginateAxis?: 'y' | 'x';
    breakpoint?: number;
    fade?: 'all' | 'content' | 'none';
    speed?: number; 
  }

  export const defaultOptions: Options = {
    horizontal: false,
    paginate: false,
    paginateAxis: 'y',
    breakpoint: 1024,
    fade: 'none',
    speed: 900,
  };
}

  