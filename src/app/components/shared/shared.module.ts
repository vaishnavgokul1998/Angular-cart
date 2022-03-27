import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragToScrollComponent } from './drag-to-scroll/drag-to-scroll.component';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { ErrorTipComponent } from './error-tip/error-tip.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    DragToScrollComponent,
    RadialProgressComponent,
    DialogComponent,
    ErrorTipComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    NgxSpinnerModule
  ],
  exports:[
    DragToScrollComponent,
    RadialProgressComponent,
    DialogComponent,
    ErrorTipComponent,
    NgxSpinnerModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
