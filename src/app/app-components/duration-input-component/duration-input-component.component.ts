import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-duration-input-component',
  templateUrl: './duration-input-component.component.html',
  styleUrls: ['./duration-input-component.component.scss']
})
export class DurationInputComponentComponent implements OnInit {
  private duration: number;

  set minutes(duration: number) {
    this.duration = duration;
    this.durationChange.emit(duration);
  }

  get minutes(): number {
    return this.duration;
  }

  @Output() durationChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
}
