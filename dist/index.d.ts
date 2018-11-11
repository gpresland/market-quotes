import { Price } from './typings/global';
export default abstract class Quotes {
    /**
     * Get price information for a stock symbol.
     * @param {string} symbol The stock symbol to get price information for.
     * @returns Promise.
     */
    static getPrice(symbol: string): Promise<Price>;
}
export { Price };
