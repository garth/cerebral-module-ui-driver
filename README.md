# ui-driver

The ui-driver is helper that simplifies the connecting of [material-components](http://garth.github.io/material-components) (react form components) to [cerebral](http://www.cerebraljs.com/). It automates signals, validation, i18n and more to simplify and reduce repetative code in React form components.

## Overview

When the user interface is pure and all app state is managed centrally, hooking up all data and events between the user interface components and controller can be a tedious task. Take the example of a pure select component that renders labels and error messages.

```js
<Select
  label="Options"
  value={selectedValue}
  options={options}
  isError={isError}
  message="Please select"
  isOpen={isSelectOpen}
  onOpen={setOpenState}
  onChange={optionSelected}
  onClose={setClosedState}/>
```

Whist not complicated, we need to hookup the selected value, list items and onChange events. But becuase this Select control does a little more we also need to hookup the label, error status and message. Finally, since this is a pure component, we also need to pass the isOpen state and handle the onOpen and onClose events which toggle the isOpen state.

What you also don't see is the work that each event handler must do, which can ammount to 2 or 3 times as much code again. And for some controlls where we need to do validation, such as email inputs or password complixity checks, this can add up to much more.

Imagine now that we have a form with 10 or even 20 of these components. Together with other components we have a lot of typing to do. What if instead of manually hooking up the properties and events we could just do the following:

```js
<Select ...bindings.selectProps('options', options)/>
```

This is the ui-driver. All background event handling is built-in as well as field and form level validation.

## Example

Let's take the example of a sign-in form.

```js
// signin component

import React, { Component, PropTypes } from 'react';
import { Decorator as State } from 'cerebral-react';
import { Form, Button, Input, Row, Col } from 'material-components';
import driver from 'ui-driver';
import i18n from 'i18n-lib';

// create an instance of the form driver that is bound to the /signin object
// in the state tree
const formDriver = driver.createForm('signin');

// the form driver will generate the neccessary cerebral properties that it
// needs
@State(Object.assign({
  locale: ['locale']
}, formDriver.props()))
export default class Signin extends Component {
  render() {
    const {
      locale,
      signals
    } = this.props;

    // This is an optional translation library, without this the field labels
    // and error messages can be defined directly on each binding.
    // We use messageformat (https://github.com/SlexAxton/messageformat.js), but
    // any object t that has a function properties that return a string should
    // work (eg t.emailLabel() => 'Email')
    const t = i18n(locale, 'signin');

    // create the bindings by passing the current props and optional t to the
    // form driver
    const bindings = formDriver.getBindings(this.props, t);

    // create the form, notice the formDriver.getValidationData() that is
    // passed to the onSubmit signal, this will gather all form data and pass
    // it to the ui-driver actions for validaton purposes
    return (
      <Form
        style={{ marginTop: '30px' }}
        onSubmit={() => signals.signinRequested(formDriver.getValidationData())}
      >
        <Input ...bindings.inputEmailProps('email', { required: true })/>
        <Input ...bindings.inputPasswordProps('password', { required: true })/>
        <Button type="submit">{t.submitButton()}</Button>
      </Form>
    );
  }
}
```

The ui-driver also provides two actions that you can use in your signals to validate submitted forms and to clear the driver data after the form editing has completed.

```js
// signin signal

import controller from './path/to/cerebral/controller';
import ajax from './path/to/actions/ajax';
import showSnackbar from './path/to/actions/showSnackbar';
import stateToOutput from 'cerebral-addons/stateToOutput';
import { validateForm, resetFormDriver } from 'ui-driver/actions';

controller.signal('signinRequested', [
  validateForm, { // validateForm accepts all data passed by the onSubmit signal
                  // and outputs success or error paths
    success: [
      stateToOutput('signin', 'data'),
      [ajax.post('/api/signin'), {
        success: [
          resetFormDriver('signin') // tidy up the temp driver form data
                                    // from the central state tree
        ],
        error: [
          ...showSnackbar('signin')
        ]
      }]
    ],
    error: showSnackbar('signin', 'hasValidationErrors')
  }
]);
```

## Setup

The ui-driver has some internal signals that must be registered with your cerebral controller.

```js
import controller from './path/to/cerebral/controller';
import signals from 'ui-driver/signals';

signals.register(controller);
```

## Supported Bindings

ui-driver currently supports the following bindings:

### Checkbox

Field value must be a bool

```js
checkboxProps('fieldName', {
  label: 'checkbox' // optional unless t is not given
})
```

### Date

Field must be a date

```js
inputDateProps('fieldName', {
  label: 'date',   // optional unless t is not given
  required: true,  // optional
  dateFormat: 'L', // optional, momentjs date format defaults to 'L'
  messages: {      // optional, taken from t when given, defaults are shown
    invalid: 'invalid',
    required: 'required'
  }
})
```

### Email

Field must be a string

```js
inputEmailProps('fieldName', {
  label: 'email',  // optional unless t is not given
  required: true,  // optional
  messages: {      // optional, taken from t when given, defaults are shown
    invalid: 'invalid',
    required: 'required'
  }
})
```

### Equals

Field must be a string, field must === comparisonValue to validate

```js
inputEqualsProps('fieldName', comparisonValue, {
  label: 'Confirm',      // optional unless t is not given
  inputType: 'password', // optional
  messages: {            // optional, taken from t when given, default is shown
    invalid: 'invalid'
  }
})
```

### Input

Field must be a string

```js
inputProps('fieldName', {
  label: 'name',  // optional unless t is not given
  required: true, // optional
  messages: {     // optional, taken from t when given, defaults are shown
    invalid: 'invalid',
    required: 'required'
  },
  signalData: {   // optional, validation params
    maxLength: 10
  }
})
```

### Int

Field must be an int

```js
inputIntProps('fieldName', {
  label: 'age',   // optional unless t is not given
  required: true, // optional
  messages: {     // optional, taken from t when given, defaults are shown
    invalid: 'invalid',
    required: 'required'
  }
})
```

### Menu

Menu consists of two bindings, one for the element that will open the menu (eg button) and one for the menu element itself.

```js
menuOpenProps('menuName', {
  eventType: 'onTouchTap' // optional, defaults to 'onTouchTap'
})
menuProps('menuName')
```

### Password

Field must be a string

```js
inputPasswordProps('fieldName', {
  label: 'password',   // optional unless t is not given
  required: true,      // optional
  checkStrength: true, // optional
  messages: {          // optional, taken from t when given, defaults are shown
    invalid: 'invalid',
    required: 'required'
  }
  signalData: {        // optional, password strength
    minLength = 8,     // config - defaults are shown
    maxLength = 128,
    minPhraseLength = 20,
    minPassingTests = 3,
    tests = [
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /[^A-Za-z0-9]/
    ]
  }
})
```

### Select

Field can be of any type but the selected value in the options collection must === the field value

```js
options = [
  { value: 1, label: t['oneLabel']() }
];

selectProps('fieldName', options, {
  label: 'options' // optional unless t is not given
})
```

### Time

Field must be an int which represents minutes from start of day

```js
inputTimeProps('fieldName', {
  label: 'time',      // optional unless t is not given
  required: true,     // optional
  timeFormat: 'H:mm', // optional, momentjs time format defaults to 'H:mm'
  messages: {         // optional, taken from t when given, defaults are shown
    invalid: 'invalid',
    required: 'required'
  }
})
```

## Side Effects

Sometimes changing one form field has side effects on other parts of the form. With ui-driver this can be handled by SideEffects.

```js
// register a side affects handler for a specific form and field
import driver from 'ui-driver';

driver.registerSideEffect('formName', 'fieldName', function sideEffectFunction(field, value, state) {
  // field: contains all kinds of data about the field that has been changed
  // value: is the new value of the changing field (the value in the state is updated
  //        after the sideEffect has executed
  // state: is the cerebral state object provided to the syncronouse validateForm action,
  //        use this to apply any side effects to the central state
});
```

## Contribute

Fork repo

* `npm install`
* `npm run dev` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es6 to es5
