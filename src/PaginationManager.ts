export class PaginationManager {
    private sf: HTMLElement;
    private sections: NodeListOf<HTMLElement>;
    private horizontal: boolean;
    private paginateAxis: 'y' | 'x';
  
    constructor(sf: HTMLElement, sections: NodeListOf<HTMLElement>, horizontal: boolean, paginateAxis: 'y' | 'x') {
      this.sf = sf;
      this.sections = sections;
      this.horizontal = horizontal;
      this.paginateAxis = paginateAxis;
    }
  
    public initializePagination() {

      const paginate = document.createElement("div");
      paginate.classList.add("sf-pagination");
      this.sf.appendChild(paginate);

      if (this.horizontal || this.paginateAxis === 'x') {
        paginate.classList.add("sf-pagination-horizontal");
      }
  
      this.sections.forEach((element, index) => {
        paginate.appendChild(this.createDot(index));
      });
    }
  
    private createDot(index: number): HTMLElement {
      const dot = document.createElement("div");
      dot.classList.add("sf-dot", "sf-trigger");
      dot.setAttribute("data-sf-index", index.toString());
  
      if (index === 0) {
        dot.classList.add("active");
      }
  
      return dot;
    }
  }
  