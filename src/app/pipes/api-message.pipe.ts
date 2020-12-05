import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'apiMessage'
})
export class ApiMessagePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const dataToArray = value.split(',').map(item => item.trim());
    return dataToArray.join('\n');
  }
}
