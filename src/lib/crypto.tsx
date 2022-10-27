import CryptoJS from "crypto-js";

const secret = process.env.NEXT_PUBLIC_CRYPTO_KEY || "";

export const encrypt = (value: string) => {
  return CryptoJS.AES.encrypt(value, secret).toString();
};

export const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};