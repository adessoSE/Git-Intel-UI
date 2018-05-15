import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prepTabName' })
export class PrepTabNamePipe implements PipeTransform {

    transform(value: string) {
        let retVal = value;

        if (value) {
            console.log("pipe: " + value)
            let idxFirst = value.indexOf("/");
            let idxLast = value.lastIndexOf("/");

            if (value.charAt(idxFirst) === "") {
                retVal = value.slice(idxLast + 1);
            }
            else {
                let orgName = value.slice(0, idxFirst);
                retVal = orgName + "/" + value.slice(idxLast + 1);
            }

        }
        return retVal;
    }

}