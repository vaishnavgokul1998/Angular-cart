import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-radial-progress',
  templateUrl: './radial-progress.component.html',
  styleUrls: ['./radial-progress.component.scss']
})
export class RadialProgressComponent implements AfterViewInit {

  @Input() id:any 
  @Input() percent:any = 50

  @ViewChild('progressPer') progreeElement:ElementRef | undefined

  constructor(private renderer:Renderer2) { 

  }

  ngAfterViewInit(): void {
      this.circle()
  }

  circle() {
  

    const circumference = Math.floor(2 * Math.PI * 45);
    this.renderer.setAttribute(this.progreeElement?.nativeElement,'stroke-dasharray',circumference.toString())
    this.renderer.setStyle(this.progreeElement?.nativeElement,'strokeDashoffset',circumference - (this.percent / 100) * circumference)

  }

}
