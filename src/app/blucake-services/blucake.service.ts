import { Injectable } from '@angular/core';

@Injectable()
export class BluCakeService {

    private value;

    constructor() { }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

}
