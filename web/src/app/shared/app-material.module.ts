import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, FlexLayoutModule],
  exports: [MatButtonModule, MatCheckboxModule, FlexLayoutModule],
})
export class AppMaterialModule { }

