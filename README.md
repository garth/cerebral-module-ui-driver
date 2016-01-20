# cerebral-module-ui-driver

cerebral-module-ui-driver is the glue that connects your [cerebral](http://www.cerebraljs.com/) immutable data to any jsx style UI library including react, snabbdom and others. It automates signals, type casting and async validation to simplify and reduce boilerplate code in your UI components and keep your UI layer pure.

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

Whist not complicated, we need to hookup the selected value, list items and onChange events. But because this Select control does a little more we also need to hookup the label, error status and message. Finally, since this is a pure component, we also need to pass the isOpen state and handle the onOpen and onClose events which toggle the isOpen state.

Imagine now that we have a form with 10 or even 20 of these components. Together with other markup and event handling we have a lot of typing to do. What if instead of manually hooking up the properties and events we could just do the following:

```js
<Select {...bind.select('name', { options })}/>
```

This is cerebreal-module-ui-driver. All background event handling is built-in as well as type casting, field and form level validation.

## Install

```
npm install cerebral-module-ui-driver
```

## Usage

The ui driver assumes that each form in your application will be placed in its own module. This is not a bad assumption as this will encourge modular and well structured cerebral applications.

From your main.js

```js
// your cerebral controller
import controller from './controller'

import driver from 'cerebral-module-ui-driver/module'
import auth from './modules/auth'

// configure modules
const modules = {
  driver: driver({
    // driver options go here
  }, {
    // optional props maps here
  }),
  auth
}

// init the modules
controller.modules(modules)
```

In your form module you need to define your form fields and specify optional validation. All validation methods are async and need to call `done([errorMessageString])` when complete. ui driver will debounce validation calls by default, but will ensure that the final validation check goes through before allowing the form to be submitted.

```js
import Component from './components'
import signinSubmitted from './chains/signinSubmitted'

export default (module) => {
  module.state({
    username: '',
    password: ''
  })

  // register module signals
  module.signals({
    signinSubmitted
  })

  // define the form
  const form = {
    fields: {
      username: {
        type: 'string', // supported types are string, int, float, date and time
        validate (value, done) { //optional
          // called if type casting is successful
          done(value.length > 0 ? '' : 'username is required')
        }
      },
      password: {
        type: 'string',
        validate (value, done) { // optional
          // called if type casting is successful
          done(value.length > 0 ? '' : 'password is required')
        }
      }
    },
    validate (values, done) { // optional
      // called if all individual fields are valid
      done()
    },
    onAfterValidate (args) { // optional
      // args are the same as any sync action method (state is writeable) with the
      // following additions: fields, isValid, isFormValidation, isFieldValidation
      //
      // Since validation functions are async and do not have access to set state,
      // this method can be used to update interdependent fields when their values
      // change
    }
  }

  // return the module meta
  return { Component, form }
}
```

In your form ui component

```js
import { Component } from 'cerebral-view-snabbdom'
import { Input, Form } from 'snabbdom-material'
import driver from 'cerebral-module-ui-driver'

export default Component(({ state, modules, signals }) => {

  // setup the ui driver bindings
  const bind = driver({ module: modules.auth, modules, state })

  return (
    <Form {...bind.form(signals.auth.signinSubmitted)}>
      <Input {...bind.input('username', { label: 'Username' })}/>
      <Input {...bind.input('password', { label: 'Password', type: 'password' })}/>
      <button type='submit'>Signin</button>
    </Form>
  )
})
```

The ui-driver also provides actions that you can use in your signal chains to validate submitted forms and to clear the driver data after the form editing has completed.

```js
import signin from '../actions/signin'
import showErrorMessage from '../actions/showErrorMessage'
import validateForm from 'cerebral-module-ui-driver/chains/validate'
import resetFormDriver from 'cerebral-module-ui-driver/actions/reset'

export default [
  ...validateForm, {
    success: [
      [signin, {
        success: [
          resetFormDriver
        ],
        error: [
          showErrorMessage
        ]
      }]
    ],
    error: [
      showErrorMessage
    ]
  }
]
```

## Supported Bindings

ui-driver supports the following bindings (props are optional for all bindings):

### Checkbox

Field value must be a bool

```js
<input {..bind.checkbox('fieldName', props)/>
```

### Form

The form binding will prepare all the necessary data required for form level validation and pass it to the given `formSubmittedSignal`. This signal must apply the provided `validateForm` chain (see the example above).

```js
<form {...bind.form(formSubmittedSignal, props)}></form>
```

### Input

Field value will be cast according to the type defined in the module

```js
<input {...bind.input('fieldName', props)}/>
```

### Menu

Menu consists of two bindings, one for the element that will open the menu (eg button) and one for the menu element itself.

```js
<button {..bind.menuOpen('menuName', props)}>Open Menu</button>
<Menu {...bind.menu('menuName', props)}></Menu>
```

### Select

Field can be of any type but the selected value in the options collection must === the field value.

```js
<Select {...bind.select('fieldName', props)}/>
```

## Configuration

### Prop maps

ui driver uses prop maps to allow each binding type to output different props depending on the ui library being used.

These are the default settings: `base` applies to all unless overridden.

```js
const propsMaps = {
  base: { // applies to all bindings unless overridden.
    value: 'value',
    onChange: 'onChange',
    isValidating: 'isValidating',
    isError: 'isError',
    message: 'message',
    type: 'type',
    isOpen: 'isOpen',
    onOpen: 'onOpen',
    onClose: 'onClose'
  },
  form: { // additional props only used by form
    onSubmit: 'onSubmit'
  },
  menuOpen: { // remap onOpen to onClick for menuOpen binding
    onOpen: 'onClick'
  }
}

const modules = {
  driver: driver({
    // other driver options go here
  }, propsMaps),
  auth
}
```

### General settings

Here you can see the general configuration options with their default values:

```js
const modules = {
  driver: driver({
    dateFormat: 'L', // see moment.js
    timeFormat: 'H:mm', // see moment.js
    invalidDateMessage: 'invalid date',
    invalidNumberMessage: 'invalid number',
    invalidTimeMessage: 'invalid time',
    invalidMessage: 'form has validation errors'
  }),
  auth
}
```

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es6 to es5
