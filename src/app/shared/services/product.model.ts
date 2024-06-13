import {PortfolioItem} from "./portfolio.model";

export interface Product {
  id: string;
  portfolioItem: PortfolioItem;
  price: number;
  stock: number;
  format: Format;
}

export enum Format {
  PHYSICAL = 'Physical',
  DIGITAL = 'Digital'
}
