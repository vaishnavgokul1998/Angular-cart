import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error-tip',
  templateUrl: './error-tip.component.html',
  styleUrls: ['./error-tip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorTipComponent implements OnInit ,OnChanges{
  @Input() show: boolean = false;
  @Input() type: string =""
  @Input() msg: string =""
  constructor(
    private detectChanges : ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }

}
