import * as argon2 from "argon2";

class PasswordHasher {
  private static readonly ARGON2_OPTIONS = {
    type: 2 as const,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  };
  async hash(plaintext: string): Promise<string> {
    return argon2.hash(plaintext, PasswordHasher.ARGON2_OPTIONS);
  }

  async verify(hash: string, plaintext: string): Promise<boolean> {
    return argon2.verify(hash, plaintext);
  }
}

export const passwordHasher = new PasswordHasher();
