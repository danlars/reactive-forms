# Reactive Forms

A reactive forms library, built in vanilla Javascript. 
Helps separate validation logic from the rest of your application logic.

## Install

```bash
$ npm i reactive-forms-js
```

## Usage 

```javascript
import { FormControl, FormGroup, isEmptyValidator } from "reactive-forms-js";

const formControl = new FormControl('Hello', {
    validators: {
        isEmptyValidator,
    }
});

const formGroup = new FormGroup({
    controls: {
        formControl,
    }
});

console.log(formGroup.valid); // True
console.log(formGroup.invalid); // False
console.log(formGroup.errors); // {}
console.log(formControl.valid); // True
console.log(formControl.invalid); // False
console.log(formControl.errors); // Null
formControl.value = '';
console.log(formGroup.valid); // False
console.log(formGroup.invalid); // True
console.log(formGroup.errors); // {formControl: { isEmptyValidator: True } }
console.log(formControl.valid); // False
console.log(formControl.invalid); // True
console.log(formControl.errors); // { isEmptyValidator: True }
```

## FormControl

### value 
Contains the value 

### errors
Displays all validation errors for the set value

### invalid
Displays the invalid state of the FormControl

### valid 
Displays the valid state of the FormControl

### disable()
Disables the FormControl and puts all variables in a pristine state

### enable()
Enables the Form Control with the latest validation state

### runValidations()
Execute all validations in the FormControl

### release()
Prevents validation checks from occuring in the FormControl

## FormGroup

### controls 
Displays all registered controls for the form group

### addControl(name, control)
Registers form control to the form group

### removeControl(name) 
Unregisters form control from the form group

### release()
Unregisters all form controls and puts all variables in the form group in a pristine state.

### valid 
Represents the valid state for all registered form controls

### invalid 
Represents the invalid state for all registered form controls

### errors
Displays all registered formcontrols containing errors

## Development

```bash
$ npm start
```

## Build

```bash
$ npm run build
```

## Testing

```bash
$ npm run test
```

## License
MIT © [danlars](https://github.com/danlars)

