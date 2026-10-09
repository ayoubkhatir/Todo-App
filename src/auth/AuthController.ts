import { HTTPException } from "hono/http-exception";
import type { SuccessResponse } from "../types/ApiTypes.js";
import type { CreateUser, LoginUser } from "../types/UserTypes.js";
import { usersRepository, type UsersRepository } from "../users/UsersRepo.js";
import { passwordHasher } from "../utils/PasswordHasher.js";
import {
  sessionsRepository,
  type SessionRepository,
} from "../sessions/sessionsRepo.js";
import type { AuthResponse } from "../types/SessionTypes.js";

export interface IAuthController {
  register: (createdUser: CreateUser) => Promise<SuccessResponse<AuthResponse>>;
  login: (loginUser: LoginUser) => Promise<SuccessResponse<AuthResponse>>;
  logout: (id: string) => Promise<SuccessResponse<null>>;
}

export class AuthController implements IAuthController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sessionsRepository: SessionRepository,
  ) {}

  async register(
    createdUser: CreateUser,
  ): Promise<SuccessResponse<AuthResponse>> {
    try {
      const foundUser = await this.usersRepository.findByEmail(
        createdUser.email,
      );
      if (foundUser) {
        throw new HTTPException(409, { message: "this email is already used" });
      }
      const hashedPassword = await passwordHasher.hash(createdUser.password);
      createdUser.password = hashedPassword;

      const user = await this.usersRepository.create(createdUser);
      if (!user) {
        throw new HTTPException(400, { message: "user creation failed" });
      }
      const session = await this.sessionsRepository.create(user.id);
      if (!session) {
        throw new HTTPException(400, { message: "session creation failed" });
      }

      const { password, ...publicUser } = user;
      return {
        success: true,
        message: "registration succeed",
        data: { user: publicUser, session },
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }

  async login(loggedUser: LoginUser): Promise<SuccessResponse<AuthResponse>> {
    try {
      const foundUser = await this.usersRepository.findByEmail(
        loggedUser.email,
      );
      if (!foundUser) {
        throw new HTTPException(500, { message: "Invalid email or password" });
      }
      const { password, ...publicUser } = foundUser;

      const hashedPassword = await passwordHasher.verify(
        password,
        loggedUser.password,
      );
      if (!hashedPassword) {
        throw new HTTPException(500, { message: "Invalid email or password" });
      }

      const session = await this.sessionsRepository.create(publicUser.id);
      if (!session) {
        throw new HTTPException(400, { message: "session creation failed" });
      }
      return {
        success: true,
        message: "login succeed",
        data: { user: publicUser, session },
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }
  async logout(id: string): Promise<SuccessResponse<null>> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new HTTPException(404, { message: "user doesn't exist" });
    }
    const session = await this.sessionsRepository.getByUserId(user.id);
    if (!session) {
      throw new HTTPException(404, { message: "session deletion failed" });
    }

    await this.sessionsRepository.delete(session.id);
    return { success: true, message: "logout succeed", data: null };
  }
}

export const authController = new AuthController(
  usersRepository,
  sessionsRepository,
);
