declare module 'splitting' {
  interface SplittingOptions {
    target?: Element | string;
    by?: string;
    key?: string;
  }
  interface SplittingResult {
    el: Element;
    chars: Element[];
    words: Element[];
  }
  function Splitting(options?: SplittingOptions): SplittingResult[];
  export default Splitting;
}

declare module 'splitting/dist/splitting.css' {
  const content: string;
  export default content;
}

declare module 'splitting/dist/splitting-cells.css' {
  const content: string;
  export default content;
}
