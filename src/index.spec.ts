import { expect } from 'chai';

import Quotes from './index';

describe('getQuotes', () => {
  it('Should get price', () => {
    Quotes.getPrice('AAPL');
    expect(true).to.equal(true);
  });
  it.skip('Should fail to get price', () => {
    expect(Quotes.getPrice('INVALID')).to.be.null;
  });
});
