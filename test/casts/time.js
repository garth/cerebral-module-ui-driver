/*global describe,it*/
import { expect } from 'chai'
import cast from '../../src/casts/time'

describe('casts.time', function () {
  it('casts a string to a time', function () {
    expect(cast('12:12', { timeFormat: 'HH:mm' })).to.eql({
      isTypeValid: true,
      typedValue: (12 * 60) + 12,
      value: '12:12'
    })
  })

  it('errors with an invalid time', function () {
    expect(cast('x 12:12', { timeFormat: 'YYYY-MM-DD', invalidTimeMessage: 'error' })).to.eql({
      isTypeValid: false,
      typedValue: null,
      value: 'x 12:12',
      error: 'error'
    })
  })

  it('errors with an invalid format', function () {
    expect(cast('13:13', { timeFormat: 'hh:mm', invalidTimeMessage: 'error' })).to.eql({
      isTypeValid: false,
      typedValue: null,
      value: '13:13',
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
