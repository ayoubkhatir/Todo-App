import type { PublicUser } from "./UserTypes.js";

export type Session = {
  id: string;
  userId: string;
  createdAt: Date;
  expireAt: Date;
};

export type CreateSession = Omit<Session, "id" | "createdAt" | "expireAt">;

export type AuthResponse = {
  user: PublicUser;
  session: Session;
};

export const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
