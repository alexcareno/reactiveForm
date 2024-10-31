import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const product = {
    name: 'Test',
    price: 100,
    inStorage: 10
}

@Component({
    templateUrl: './basic-page.component.html',
    styles: ``
})
export class BasicPageComponent implements OnInit {

    // importante importar ReactiveFormsModule en el módulo
    // public myForm: FormGroup = new FormGroup({
    //     name: new FormControl(''),
    //     price: new FormControl(0),
    //     inStorage: new FormControl(0),
    // });

    public myForm: FormGroup = this.fb.group({
        name: ['', [ Validators.required, Validators.minLength(3) ]],
        price: [0, [ Validators.required, Validators.min(0) ]],
        inStorage: [0, [ Validators.required, Validators.min(0) ]]
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.myForm.reset(product);
    }

    onSave(): void {

        if(this.myForm.invalid) return;

        this.myForm.reset({ price: 0, inStorage: 0 });
    }
}
