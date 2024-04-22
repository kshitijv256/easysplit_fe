/* eslint-disable @typescript-eslint/no-explicit-any */
// contains all the api calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (data: any) => {
  return fetch(`${API_BASE_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const signup = async (data: any, endpoint: string) => {
  return fetch(`${API_BASE_URL}/users/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const fetchUsers = async (groupId: number) => {
  return fetch(`${API_BASE_URL}/users/${groupId}`);
};

export const addTransaction = async (data: any) => {
  return fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const fetchTransactions = async (userId: number) => {
  const transactions = await fetch(
    `${API_BASE_URL}/transactions/${userId}`
  ).then((res) => res.json());
  return transactions["transactions"];
};
