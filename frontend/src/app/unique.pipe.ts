import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const uniqueSet = new Set(value);
    return Array.from(uniqueSet);
  }
}
