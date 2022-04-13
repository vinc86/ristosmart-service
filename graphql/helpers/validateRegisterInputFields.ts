import { ApolloError } from "apollo-server-errors";

export const validateRegisterInputFields = async (
  email: string,
  password: string,
  repeatPassword: string
) => {
  /* const emailRegEx = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!emailRegEx.test(email)) {
    throw new ApolloError("Formato email non corretto");
  } */

  if (password.length < 8) {
    throw new ApolloError("La password deve contenere almeno 8 caratteri");
  }

  if (password !== repeatPassword) {
    throw new ApolloError("Reinserisci la stessa password per la verifica");
  }

  // check if password has letters and numbers
  const numbers = [];
  password.split("").forEach((char: any) => {
    if (+char) {
      numbers.push(char);
    }
  });
  if (parseInt(password) || numbers.length === 0) {
    throw new ApolloError("La password deve contenere lettere e numeri");
  }

  return true;
};
