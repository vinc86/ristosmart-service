export enum ROLE {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  DEV = "DEV",
}

export interface RegisterInput {
  email: string;
  role: ROLE;
  password: string;
  repeatPassword: string;
}

export type User = {
  _id: string;
  restaurantId?: [string];
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phone?: string;
  role: ROLE;
  loggedIn: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

type LoggedUserData = {
  email: string;
  firstName?: string;
  lastName?: string;
  restaurantId?: string[];
};

export type LoginResponse = {
  /* userData: LoggedUserData; */
  /* role: string; */
  token: string;
};

/* export type UpdateInput = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: ROLE;
}; */
