import bcrypt from "bcrypt";

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const result = bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (err) {
    throw new Error(`Error comparing password: ${err}`);
  }
}
