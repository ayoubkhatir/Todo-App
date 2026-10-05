import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import type { SuccessResponse } from "../types/ApiTypes.js";
import type { CreateUser, LoginUser, User } from "../types/UserTypes.js";
import type { UsersRepository } from "./UsersRepo.js";
import { HTTPException } from "hono/http-exception";
import { passwordHasher } from "../utils/PasswordHasher.js";

export interface IUsersController {}

export class UsersSessionController implements IUsersController {
  constructor(private readonly usersRepository: UsersRepository) {}
}
