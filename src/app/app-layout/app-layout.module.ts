import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { AppComponentsModule } from '../app-components/app-components.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainSectionComponent],
  imports: [
    CommonModule,
    AppComponentsModule,
  ],
  exports: [HeaderComponent, FooterComponent, MainSectionComponent],
})
export class AppLayoutModule { }
