import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'routeName'})
export class RouteNamePipe implements PipeTransform {

    transform(value:string) {
        if (value) {
            return value.slice(value.lastIndexOf("/") + 1);
        }
        return value;
    }

}