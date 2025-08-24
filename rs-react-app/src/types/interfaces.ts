export interface DataFromForm {
  name: string;
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: NonNullable<boolean | undefined>;
  picture: string;
  country: string;
}

export interface DataToRedux {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: NonNullable<boolean | undefined>;
  picture: File;
  country: string;
}
