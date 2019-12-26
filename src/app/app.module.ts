import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponentsRoutingModule } from './app-components/app-components-routing.module';
import { AuthInterceptor } from '@app//app-services/AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    AppComponentsRoutingModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: 'Storage', useValue: localStorage },
    { provide: 'BASE_URL', useValue: 'http://localhost:3004' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
