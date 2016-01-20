/*global describe,it*/
import { expect } from 'chai'
import format from '../../src/formatters/date'

describe('formatters.date', function () {
  it('formats a date', function () {
    expect(format(new Date('2016-01-01'), { dateFormat: 'YYYY-MM-DD' })).to.equal('2016-01-01')
  })

  it('turns null into an empty string', function () {
    expect(format(null)).to.equal('')
  })

  it('turns undefined into an empty string', function () {
    expect(format(undefined)).to.equal('')
  })
})
