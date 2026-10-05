import { eq } from "drizzle-orm";
import { db, type Database } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import type { CreateUser, UpdateUser, User } from "../types/UserTypes.js";

export interface IUsersRepository {
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  create: (createdUser: CreateUser) => Promise<User>;
  update: (id: string, updatedUser: UpdateUser) => Promise<User | undefined>;
  delete: (id: string) => Promise<User | undefined>;
}

export class UsersRepository implements IUsersRepository {
  constructor(private readonly db: Database) {}
  async findById(id: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user;
  }
  async create(createdUser: CreateUser): Promise<User> {
    const [user] = await this.db
      .insert(usersTable)
      .values(createdUser)
      .returning();
    return user;
  }
  async update(id: string, updatedUser: UpdateUser): Promise<User | undefined> {
    const [user] = await this.db
      .update(usersTable)
      .set(updatedUser)
      .where(eq(usersTable.id, id))
      .returning();
    return user;
  }
  async delete(id: string): Promise<User | undefined> {
    const [user] = await this.db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    return user;
  }
}

export const usersRepository = new UsersRepository(db);
