import bcrypt from "bcrypt";
import { authModel } from "./auth.model";

export class AuthService {
  async register(input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const exists = await authModel.findByEmail(input.email);
    if (exists) throw new Error("Email already exists");
    const hashed = await bcrypt.hash(input.password, 10);
    return authModel.createUser({ ...input, password: hashed });
  }

  async login(email: string, password: string) {
    const user = await authModel.findByEmail(email);
    if (!user) throw new Error("Invalid Credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return user;
  }
}

export const authService = new AuthService();
