import type { UsersRepository } from "./UsersRepo.js";

export interface IUsersController {}

export class UsersSessionController implements IUsersController {
  constructor(private readonly usersRepository: UsersRepository) {}
}
