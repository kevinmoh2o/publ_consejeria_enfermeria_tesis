import CryptoJS from 'crypto-js';
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  //console.log("isAuthenticated: ")

  /* const token = localStorage.getItem('user');
  const userString = decryptData(userLocal);
  //console.log("userString: ",userString);
  if (!userString) return false; */
  const token = localStorage.getItem('user');
  
  if (!token) return false;

  try {
    /* const user = JSON.parse(userString);
    //console.log("user: ",user); */
    const decoded = jwtDecode(token);
    //console.log("decoded: ",decoded)
    const now = Date.now().valueOf() / 1000;

    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      return false;
    }

    if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
      return false;
    }


    /* if (!userString.id || !userString.fullName || !userString.email) {
      return false;
    } */

  } catch (e) {
    console.error(e)
    return false;
  }

  return true;
};


/**
 * Desencripta datos almacenados en localStorage.
 * @returns {Object} Datos desencriptados.
 */
export const decryptData = (data) => {
  //console.log("decryptData: ", data)
  const secretKey = process.env.VUE_APP_API_SECRET_CRIPTO_KEY;
  if (!secretKey) {
    console.error('No secret key provided');
    return null;
  }


  if (!data) {
    console.error('No data found in localStorage');
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};
