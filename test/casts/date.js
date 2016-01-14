/*global describe,it*/
import { expect } from 'chai'
import cast from '../../src/casts/date'

describe('casts.date', function () {
  it('casts a string to a date', function () {
    expect(cast('2016-01-01', { dateFormat: 'YYYY-MM-DD' })).to.eql({
      isTypeValid: true,
      typedValue: new Date('2016-01-01'),
      value: '2016-01-01'
    })
  })

  it('errors with an invalid string', function () {
    expect(cast('x 2016-01-01', { dateFormat: 'YYYY-MM-DD', invalidDateMessage: 'error' })).to.eql({
      isTypeValid: false,
      typedValue: null,
      value: 'x 2016-01-01',
      error: 'error'
    })
  })

  it('errors with an invalid format', function () {
    expect(cast('01-01-2016', { dateFormat: 'YYYY-MM-DD', invalidDateMessage: 'error' })).to.eql({
      isTypeValid: false,
      typedValue: null,
      value: '01-01-2016',
      error: 'error'
    })
  })

  it('turns empty value into null', function () {
    expect(cast('')).to.eql({
      isTypeValid: true,
      typedValue: null,
      value: ''
    })
  })
})
