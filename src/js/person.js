import $ from 'jquery';

export class Person {
    constructor(name) {
        this.name = name;
    }

    printname() {
        console.log(this.name);
    }
}

export function doSomething() {
    console.info("Its a info log!");
    $('h1').html('Text is changed!');
}