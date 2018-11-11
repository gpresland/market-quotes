import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { get } from 'lodash';

import { Price } from './typings/global';

const PROTOCOL = 'https';
const SUBDOMAIN = 'query1.finance';
const DOMAIN = 'yahoo.com';
const VERSION = 'v10';
const PATH = 'finance/quoteSummary/';
const BASE_URL = `${PROTOCOL}://${SUBDOMAIN}.${DOMAIN}/${VERSION}/${PATH}`;

const modules = {
  defaultKeyStatistics: 'defaultKeyStatistics',
  financialData: 'financialData',
  calendarEvents: 'calendarEvents',
  assetProfile: 'assetProfile',
  summaryDetail: 'summaryDetail',
  upgradeDowngradeHistory: 'upgradeDowngradeHistory',
  recommendationTrend: 'recommendationTrend',
  earnings: 'earnings',
  price: 'price'
};

export default abstract class Quotes {

  /**
   * Get price information for a stock symbol.
   * @param {string} symbol The stock symbol to get price information for.
   * @returns Promise.
   */
  public static async getPrice(symbol: string): Promise<Price> {
    return new Promise<Price>((resolve, reject) => {
      const url = `${BASE_URL}${symbol}?formatted=false&lang=en-US&region=US&modules=${modules.price}`;
      axios.get(url)
        .then(response => {
          if (response.status !== 200) {
            reject();
            return;
          }
          const error = get(response.data, 'quoteSummary.error');
          if (error !== null) {
            reject();
            return;
          }
          const price = get(response.data, 'quoteSummary.result[0].price');
          resolve(price);
        })
        .catch(err => reject());
    });
  }
}

export { Price };
