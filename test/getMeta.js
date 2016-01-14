/*global describe,it*/
import { expect } from 'chai'
import getMeta from '../src/helpers/getMeta'

describe('getMeta', function () {
  it('gets a nested data node', function () {
    expect(getMeta({ parent: { child: 'value' } }, ['parent', 'child'])).to.eql('value')
  })

  it('returns undefined no state given', function () {
    expect(getMeta(null, ['parent', 'child', 'missing'])).to.be.undefined
  })

  it('returns undefined when node is missing', function () {
    expect(getMeta({ parent: { child: 'value' } }, ['parent', 'child', 'missing'])).to.be.undefined
  })
})
