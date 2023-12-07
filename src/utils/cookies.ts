import Cookies from "js-cookie";

export const setCookie = (title: string, value: string) =>
  Cookies.set(title, value, { expires: 7 });
export const getCookie = (title: string) => Cookies.get(title);
export const delCookie = (title: string) => Cookies.remove(title);
