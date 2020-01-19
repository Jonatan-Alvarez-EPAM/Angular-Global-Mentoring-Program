import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  showOverlay$ = new BehaviorSubject<boolean>(false);
  constructor() { }
}
