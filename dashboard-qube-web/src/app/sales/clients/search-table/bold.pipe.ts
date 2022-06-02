import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {

  transform(textVal: string, subTextValue: string): string {
    return textVal.replace(subTextValue , '<b>' + subTextValue  + '</b>');
}

}
