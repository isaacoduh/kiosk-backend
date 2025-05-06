import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authService } from "./auth.service";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
      res.json({ token });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}

export const authController = new AuthController();
