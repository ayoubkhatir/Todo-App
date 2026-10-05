export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type PublicUser = Omit<User, "password">;

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = Partial<CreateUser>;

export type LoginUser = {
  email: string;
  password: string;
};
