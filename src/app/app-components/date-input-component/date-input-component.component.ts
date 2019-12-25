import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/** #WIP Date picker. */
@Component({
  selector: 'app-date-input-component',
  templateUrl: './date-input-component.component.html',
  styleUrls: ['./date-input-component.component.scss']
})
export class DateInputComponentComponent implements OnInit {

  @Input()
  set date(d: Date) {
    this.dateChange.emit(d);
  }
  @Output() dateChange = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

}
