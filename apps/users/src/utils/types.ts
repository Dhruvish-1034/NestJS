export type signUp = {
  full_name: string;
  email: string;
  password: string;
  profile_image: any;
};

export type signIn = {
  email: string;
  password: string;
};

export type updateUser = {
  name?: string;
  profile_image: string;
};

export type createOrder = {
  no_of_items: number;
  total_price: number;
};
