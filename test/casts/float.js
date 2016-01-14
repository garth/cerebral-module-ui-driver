/*global describe,it*/
import { expect } from 'chai'
import cast from '../../src/casts/float'

describe('casts.float', function () {
  it('casts a string to a float', function () {
    expect(cast('123456.1')).to.eql({
      isTypeValid: true,
      typedValue: 123456.1,
      value: '123456.1'
    })
  })

  it('errors with an invalid fload', function () {
    expect(cast('x1236456.1', { invalidNumberMessage: 'error' })).to.eql({
      isTypeValid: false,
      typedValue: null,
      value: 'x1236456.1',
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
