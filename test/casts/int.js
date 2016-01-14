/*global describe,it*/
import { expect } from 'chai'
import cast from '../../src/casts/int'

describe('casts.int', function () {
  it('casts a string to a int', function () {
    expect(cast('123456')).to.eql({
      isTypeValid: true,
      typedValue: 123456,
      value: '123456'
    })
  })

  it('errors with an invalid int', function () {
    expect(cast('x1236456', { invalidNumberMessage: 'error' })).to.eql({
      isTypeValid: false,
      typedValue: null,
      value: 'x1236456',
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
