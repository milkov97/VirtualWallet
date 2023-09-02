import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds: number = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    throw new Error(`Error hashing password: ${err}`);
  }
}
