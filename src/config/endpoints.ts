export const ENDPOINTS = {
  getItem: (id: number): string => `/items/${id}`, // get by id
  getItems: (): string => `/items`, // get all
  putItem: (id: number): string => `/items/${id}`, // edit by id
};
