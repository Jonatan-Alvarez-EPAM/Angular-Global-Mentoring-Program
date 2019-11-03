import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Course } from '../../../../app/app-models/course';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesItemComponent } from './courses-item.component';

@Component({
    template: `
    <app-courses-item
      [courseInfo]="course" (deleteCourse)="onDeleteCourse($event)">
    </app-courses-item>`
})
class TestHostComponent {
    public course: Course = {
        id: 'FAKE ID',
        title: 'FAKE TITLE',
        creationDate: new Date(1),
        duration: 10,
        description: 'FAKE DESCRIPTION',
    };
    public courseIdToDelete: string;
    public onDeleteCourse(courseId: string) { this.courseIdToDelete = courseId; }
}

describe('TestHostComponent', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, CoursesItemComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        hostFixture = TestBed.createComponent(TestHostComponent);
        hostFixture.detectChanges();
    });

    it('should raise course id to delete', () => {
        hostFixture.detectChanges();

        const expectedCourseId = 'FAKE ID';
        const courseItemComponent = hostFixture.debugElement.componentInstance;
        const deleteButton = hostFixture.debugElement.query(By.css('.delete-button'));
        deleteButton.triggerEventHandler('click', null);

        expect(courseItemComponent.courseIdToDelete).toEqual(expectedCourseId);

    });
});
