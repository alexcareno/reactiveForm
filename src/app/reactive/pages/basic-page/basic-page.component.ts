import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

const product = {
    name: 'Test',
    price: 100,
    inStorage: 10
};

@Component({
    templateUrl: './basic-page.component.html',
    styles: ``
})
export class BasicPageComponent {

    // importante importar ReactiveFormsModule en el módulo
    // public myForm: FormGroup = new FormGroup({
    //     name: new FormControl(''),
    //     price: new FormControl(0),
    //     inStorage: new FormControl(0),
    // });

    public myForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.required, Validators.min(0)]],
        inStorage: [0, [Validators.required, Validators.min(0)]]
    });

    constructor(private fb: FormBuilder, private validatorsService: ValidatorsService) { }

    isValidField(field: string) {
        return this.validatorsService.isValidField(this.myForm, field);
    }

    getFieldError(field: string): string | null {

        if (!this.myForm.controls[field]) return null;

        const errors = this.myForm.controls[field].errors || {};

        for (const key of Object.keys(errors)) {

            switch (key) {
                case 'required':
                    return 'El campo es requerido';
                case 'minlength':
                    return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
            }

        }

        return null;
    }

    onSave(): void {

        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores al enviar
            return;
        };

        this.myForm.reset({ price: 0, inStorage: 0 });
    };
}
