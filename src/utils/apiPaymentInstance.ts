import axios from 'axios';

const baseURL = process.env.REACT_APP_YOOKASSA_API_URL;

const instancePayment = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
    // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
    Authorization: `${process.env.REACT_APP_YOOKASSA_API_SHOPID}:${process.env.REACT_APP_YOOKASSA_API_SECRET_KEY}`
  }
});

export function apiPaymentGet(url: string) {
  return instancePayment.get(`${url}`).then((response) => response);
}

export function apiPaymentPost(url: string, payload: any) {
  return instancePayment.post(`${url}`, payload).then((response) => response);
}

export function apiPaymentDelete(url: string) {
  return instancePayment.delete(`${url}`).then((response) => response);
}

export default instancePayment;
