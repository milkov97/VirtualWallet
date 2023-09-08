import bcrypt from "bcrypt";

class ComparePasswords {
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds: number = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (err) {
      throw new Error(`Error hashing password: ${err}`);
    }
  }
}


export const passwordHandler = new ComparePasswords()