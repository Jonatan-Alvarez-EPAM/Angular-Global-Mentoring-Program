import { Component, OnInit } from '@angular/core';

/** Main display area. */
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSearch(event: Event) {
    console.log('Searching for:', event);
  }

}
