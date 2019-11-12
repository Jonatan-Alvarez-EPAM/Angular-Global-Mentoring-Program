import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { OrderByPipe } from './order-by.pipe';
import { FilterByPipe } from './filter-by.pipe';



@NgModule({
  declarations: [DurationPipe, OrderByPipe, FilterByPipe],
  imports: [
    CommonModule
  ],
  exports: [DurationPipe, OrderByPipe, FilterByPipe]
})
export class AppPipesModule { }
