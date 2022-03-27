import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

enum ScrollAxis {
  Right,
  Left
}
@Component({
  selector: 'app-drag-to-scroll',
  templateUrl: './drag-to-scroll.component.html',
  styleUrls: ['./drag-to-scroll.component.scss']
})
export class DragToScrollComponent implements AfterViewInit {

  public isLeft: boolean = false
  isRight: boolean = true

  public scrollAxis = ScrollAxis

  navValue = 0

  @ViewChild("scrollContainer") scrollContainer!: ElementRef;

  private removeScrollListenScrollerFn: (() => void) | undefined

  constructor(
    private hostElement: ElementRef,
    private renderer: Renderer2,
    private changeDetection: ChangeDetectorRef
  ) {

  }

  ngAfterViewInit(): void {

    // this.renderer.setStyle(this.hostElement.nativeElement,'cursor',"grab")
    this.removeScrollListenScrollerFn = this.renderer.listen(this.scrollContainer.nativeElement, 'scroll', () => {
      if (this.navValue) {
        window.cancelAnimationFrame(this.navValue)
      }
      this.navValue = window.requestAnimationFrame(() => {
        this.navigationsShow()
      })
    })
    this.navigationsShow()
  }

  @HostListener('window:resize', ['$event'])
  onResize(ui: UIEvent) {
    this.navigationsShow()
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    console.log(event)
  }
  navigationsShow() {
    const { scrollLeft, scrollWidth, offsetWidth } = this.scrollContainer.nativeElement
    // console.log(scrollLeft,scrollWidth,offsetWidth)

    this.isLeft = Math.floor(scrollLeft) > 0;
    this.isRight = Math.floor(scrollLeft + offsetWidth) < scrollWidth;

    this.changeDetection.detectChanges()
  }

  onClick(axis: ScrollAxis) {

    const currentLeft = this.scrollContainer.nativeElement.scrollLeft;

    let updatedleftValue: ScrollToOptions = {
      left: 0,
      behavior: 'smooth'
    }
    if (axis === ScrollAxis.Left) {
      updatedleftValue.left = Math.max(currentLeft - 250, 0);
    } else {
      updatedleftValue.left = Math.min(currentLeft + 250, this.scrollContainer.nativeElement.scrollWidth);
    }
    this.scrollContainer.nativeElement.scrollTo(updatedleftValue)

  }

}
