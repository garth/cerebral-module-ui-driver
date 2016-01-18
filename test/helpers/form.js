import validate from '../../src/chains/validate'
import reset from '../../src/actions/reset'

export default module => {
  module.state({
    email: '',
    number: 0,
    acceptTerms: false
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
    signals: module.getSignals(),
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
        },
        select: {
          type: 'int'
        },
        acceptTerms: {
          type: 'bool'
        }
      }
    }
  }
}
