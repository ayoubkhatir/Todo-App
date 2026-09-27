import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const tasksTable = pgTable("tasks",{
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  done: boolean().default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow()
})