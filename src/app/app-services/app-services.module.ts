import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: Storage, useValue: window.localStorage },
  ],
})
export class AppServicesModule { }
