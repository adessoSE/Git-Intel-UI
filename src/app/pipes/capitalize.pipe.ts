import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

    transform(value: string) {
        let word = value;
        if (value) {
            word = word.charAt(0).toUpperCase() + word.slice(1);

            let startIdx = 0;
            for (let i = 1; i < word.length; i++) {
                if (word.charAt(i) === "/" || word.charAt(i) === "-" || word.charAt(i) === "_") {
                    word = word.substr(startIdx, i + 1) + word.charAt(i + 1).toUpperCase() + word.substr(i + 2);
                }
            }

        }
        return word;
    }

}