import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
    templateUrl: './dynamic-page.component.html',
    styles: ``
})
export class DynamicPageComponent {

    public myForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this.fb.array([
            ['Metal Gear', Validators.required],
            ['Zelda', Validators.required]
        ]),
    });

    public newFavoriteGame: FormControl = this.fb.control('', [Validators.required, Validators.minLength(3)]);

    constructor(private fb: FormBuilder, private validatorsService: ValidatorsService) { }

    isValidField(field: string) {
        return this.validatorsService.isValidField(this.myForm, field);
    }

    get favoriteGames() {
        return this.myForm.get('favoriteGames') as FormArray;
    }

    isValidFieldInArray(formArray: FormArray, index: number) {
        return formArray.controls[index].errors && formArray.controls[index].touched;
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

    addToFavoriteGames(): void {
        if (this.newFavoriteGame.invalid) return;
        const newGame = this.newFavoriteGame.value;

        this.favoriteGames.push(this.fb.control(newGame, Validators.required));

        this.newFavoriteGame.reset();
    }

    onDeleteFav(index: number): void {
        this.favoriteGames.removeAt(index);
    }

    onSubmit(): void {

        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();
            return;
        }

        console.log(this.myForm.value);
        this.myForm.reset();
        (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    }

}
