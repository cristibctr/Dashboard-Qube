import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {

  transform(textVal: string, subTextValue: string): string {
    const indexOfSubText = textVal.toUpperCase().indexOf(subTextValue.toUpperCase());
    if (indexOfSubText > -1) {
      return textVal.slice(0, indexOfSubText) + '<b>' + textVal.slice(indexOfSubText, indexOfSubText + subTextValue.length) + '</b>' + textVal.slice(indexOfSubText + subTextValue.length);
    }
    return textVal;
  }

}
