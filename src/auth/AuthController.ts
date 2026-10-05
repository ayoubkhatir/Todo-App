import { HTTPException } from "hono/http-exception";
import type { SuccessResponse } from "../types/ApiTypes.js";
import type { CreateUser, PublicUser, User } from "../types/UserTypes.js";
import type { UsersRepository } from "../users/UsersRepo.js";
import { passwordHasher } from "../utils/PasswordHasher.js";
import type { SessionRepository } from "../sessions/sessionsRepo.js";
import type { RegisterResponse, Session } from "../types/SessionTypes.js";

export interface IAuthController {
  register: (
    createdUser: CreateUser,
  ) => Promise<SuccessResponse<RegisterResponse>>;
  //   login: (loginUser: LoginUser) => Promise<SuccessResponse<User | undefined>>;
  //   logout: (id: string) => Promise<SuccessResponse<User | undefined>>;
}

export class AuthController implements IAuthController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sessionsRepository: SessionRepository,
  ) {}

  async register(
    createdUser: CreateUser,
  ): Promise<SuccessResponse<RegisterResponse>> {
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
      return {
        success: true,
        message: "registration succeed",
        data: { user, session },
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }
}
