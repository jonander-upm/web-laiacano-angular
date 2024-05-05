export interface Product {
  id: string;
  portfolioItem: PortfolioItem;
  price: number;
  stock: number;
  format: Format;
}

// TODO: move into protfolio service when available
export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
}

export enum Format {
  PHYSICAL = 'Physical',
  DIGITAL = 'Digital'
}
