export interface IProductService {
  create(payload: ICreateProductPayload): void;
  update(id: number, payload: IUpdateProductPayload): void;
}

interface IBaseProductPayload {
  title: string;
  description: string;
  categoryId: number;
  sku: string;
  price: number;
}

export type ICreateProductPayload = IBaseProductPayload;

export type IUpdateProductPayload = Partial<IBaseProductPayload>;
