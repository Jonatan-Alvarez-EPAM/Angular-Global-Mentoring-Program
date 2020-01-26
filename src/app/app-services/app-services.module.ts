import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuthorization from '@app/store/reducers/authorization.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuthorization.authorizationFeatureKey, fromAuthorization.reducer),
  ],
})
export class AppServicesModule { }
