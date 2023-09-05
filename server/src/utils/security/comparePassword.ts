import bcrypt from "bcrypt";

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return bcrypt.compare(plainPassword, hashedPassword)
  } catch (error) {
    throw error;
  }
}
