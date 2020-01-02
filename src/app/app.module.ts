import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponentsRoutingModule } from './app-components/app-components-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    AppComponentsRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: 'Storage', useValue: localStorage },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
