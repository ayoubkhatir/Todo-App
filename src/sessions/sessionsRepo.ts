import { eq } from "drizzle-orm";
import { db, type Database } from "../db/index.js";
import { sessionsTable } from "../db/schema.js";

export class SessionRepository {
  constructor(private readonly db: Database) {}
  async get(id: string) {
    const [session] = await this.db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id));
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
}

export const sessionsRepository = new SessionRepository(db);
