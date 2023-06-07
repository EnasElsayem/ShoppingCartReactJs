

export interface product {
    _id:                 string;
    title:               string;
    slug:                string;
    description:         string;
    quantity:            number;
    sold:                number;
    price:               number;
    availableColors:     any[];
    imageCover:          string;
    images:              string[];
    category:            Brand;
    subcategory:         Brand[];
    brand:               Brand;
    ratingsAverage:      number;
    ratingsQuantity:     number;
    createdAt:           Date;
    updatedAt:           Date;
    id:                  string;
    priceAfterDiscount?: number;
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: Category;
}

export enum Category {
    The6407Ea725Bbc6E43516931E2 = "6407ea725bbc6e43516931e2",
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}
