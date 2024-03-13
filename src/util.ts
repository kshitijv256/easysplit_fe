/* eslint-disable @typescript-eslint/no-explicit-any */
export type Data = "users" | "transactions" | "payments";

export const saveToLocalStorage = (key: Data, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = async (key: Data) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};
