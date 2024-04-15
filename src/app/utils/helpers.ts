import { Validators } from '@angular/forms'

let Validator = {
  required: Validators.required,
  email: Validators.pattern(/.+@.+\..+/), 
  correo: Validators.pattern(/.+@.+\..+/), 
  minLength: Validators.minLength(4),
  onlyNumbers: (ev: any) => {
    (isNaN(ev.key) && !['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(ev.key) && ev.key !== 'Backspace') ? ev.preventDefault() : true
  },

}
export {
  Validator
}