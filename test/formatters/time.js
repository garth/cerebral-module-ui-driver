/*global describe,it*/
import { expect } from 'chai'
import format from '../../src/formatters/time'

describe('formatters.time', function () {
  it('formats a time', function () {
    expect(format((60 * 12) + 12, { timeFormat: 'HH:mm' })).to.equal('12:12')
  })

  it('turns null into an empty string', function () {
    expect(format(null)).to.equal('')
  })
})
