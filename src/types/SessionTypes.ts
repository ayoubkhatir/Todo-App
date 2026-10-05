import type { PublicUser } from "./UserTypes.js";

export type Session = {
  id: string;
  userId: string;
  createdAt: Date;
  expireAt: Date;
};

export type CreateSession = Omit<Session, "id" | "createdAt" | "expireAt">;

export type RegisterResponse = {
  user: PublicUser;
  session: Session;
};
