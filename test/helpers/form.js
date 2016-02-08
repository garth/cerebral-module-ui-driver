import validate from '../../src/chains/validate'
import reset from '../../src/actions/reset'

export default (module) => {
  module.addState({
    email: '',
    number: 0,
    acceptTerms: false
  })
  module.addSignals({
    submitForm: [
      ...validate, {
        success: [
          reset('form')
        ],
        error: []
      }
    ]
  })
  return {
    signals: module.getSignals(),
    form: {
      fields: {
        email: {
          type: 'string'
        },
        number: {
          type: 'int',
          validate (value, done) {
            done(value > 10 ? 'too big' : '')
          }
        },
        date: {
          type: 'date'
        },
        time: {
          type: 'time'
        },
        select: {
          type: 'int'
        },
        acceptTerms: {
          type: 'bool'
        }
      },
      validate (values, done) {
        done()
      },
      onAfterValidate ({input, state, output, services, fields, isValid, isFormValidation, isFieldValidation}) {
        // console.log(fields)
      }
    }
  }
}
