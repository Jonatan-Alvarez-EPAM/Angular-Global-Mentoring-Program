import { Pipe, PipeTransform } from '@angular/core';

/** Formats given duration in minutes and outputs as hh h mm m. In case of duration less than 1 hr displays only minutes. */
@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(duration: number, ...args: never[]): any {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    let text = '';

    if (hours !== 0) {
      text = `${hours}h `;
    }

    if (minutes !== 0) {
      text = `${text}${minutes}min`;
    }

    return text;
  }

}
