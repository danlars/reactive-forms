# Reactive Forms

A reactive forms library, built in vanilla Javascript. 
Helps separate validation logic from the rest of your application logic.

## Install

```bash
$ npm i reactive-forms-js
```

## Usage 

```javascript
import { FormControl, FormGroup, requiredValidator } from "reactive-forms-js";

const formControl = new FormControl('Hello', {
    validators: {
        requiredValidator,
    }
});

const formGroup = new FormGroup({
    controls: {
        formControl,
    }
});

console.log(formGroup.valid); // True
console.log(formControl.valid); // True
formControl.value = '';
console.log(formGroup.valid); // False
console.log(formControl.valid); // False
```

## Development

```bash
$ npm start
```

## Testing

```bash
$ npm run test
```

## License
MIT © [danlars](https://github.com/danlars)

