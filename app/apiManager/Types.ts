export type DjangoResponseListBody<T> = {
  result: T[];
  status: number;
  success: boolean;
  messages: [];
};
export type DjangoResponseByIdBody<T> = {
  result: T;
  status: number;
  success: boolean;
  messages: [];
};
