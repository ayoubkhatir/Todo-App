import { eq } from "drizzle-orm";
import { db, type Database } from "../db/index.js";
import { sessionsTable } from "../db/schema.js";
import type { Session } from "../types/SessionTypes.js";

export interface ISessionRepository {
  get(id: string): Promise<Session>;
  getByUserId(userId: string): Promise<Session>;
  create(userId: string): Promise<Session>;
  delete(id: string): Promise<Session>;
  deleteByUserId(userId: string): Promise<Session>;
}

export class SessionRepository {
  constructor(private readonly db: Database) {}
  async get(id: string) {
    const [session] = await this.db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id));
    return session;
  }

  async getByUserId(userId: string) {
    const [session] = await this.db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.userId, userId));
    return session;
  }

  async create(userId: string) {
    const [session] = await this.db
      .insert(sessionsTable)
      .values({ userId })
      .returning();
    return session;
  }
  async delete(id: string) {
    const [session] = await this.db
      .delete(sessionsTable)
      .where(eq(sessionsTable.id, id))
      .returning();
    return session;
  }
  async deleteByUserId(userId: string) {
    const [session] = await this.db
      .delete(sessionsTable)
      .where(eq(sessionsTable.userId, userId))
      .returning();
    return session;
  }
}

export const sessionsRepository = new SessionRepository(db);
