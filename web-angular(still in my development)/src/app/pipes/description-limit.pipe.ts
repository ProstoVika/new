import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'descriptionLimit'
})
export class DescriptionLimitPipe implements PipeTransform {
  transform(value: string, limit: number, suffix: string = '...'): string {
    if (value.length > limit) {
      return value.substring(0, limit) + suffix;
    }
    return value;
  }
}

