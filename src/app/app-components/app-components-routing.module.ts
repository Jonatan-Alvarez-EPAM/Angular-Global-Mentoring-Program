import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainSectionComponent } from '../app-layout/main-section/main-section.component';
import { AuthGuard } from '@app/app-guards';
import { AddCourseComponent } from './courses/add-course/add-course.component';

export const componentRoutes: Routes = [
    {
        path: 'courses',
        component: MainSectionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
    {
        path: 'courses/new',
        component: AddCourseComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        pathMatch: 'full',
    },
    {
        path: 'courses/:id',
        component: AddCourseComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(componentRoutes)
    ],
    exports: [RouterModule],
})
export class AppComponentsRoutingModule { }
