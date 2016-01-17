import validate from '../../src/chains/validate'
import reset from '../../src/actions/reset'

export default module => {
  module.state({
    email: '',
    number: 0
  })
  module.signals({
    submitForm: [
      ...validate, {
        success: [
          reset
        ],
        error: []
      }
    ]
  })
  return {
    form: {
      fields: {
        email: {
          type: 'string'
        },
        number: {
          type: 'int',
          validate ({ module, field }, done) {
            done(field.typedValue > 10 ? 'too big' : '')
          }
        }
      }
    }
  }
}
