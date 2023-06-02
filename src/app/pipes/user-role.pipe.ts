import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: string): string {
    let result: string = value;
    switch (value.toLowerCase()) {
      case 'administrator':
        result = 'Администратор';
        break;
      case 'creator':
        result = 'Разработчик';
        break;
      case 'editor':
        result = 'Методист';
        break;
      case 'viewer':
        result = 'Вьюер';
        break;
      case 'dean':
        result = 'Декан';
        break;
    }
    return result;
  }

}
