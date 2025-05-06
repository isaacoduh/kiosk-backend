import { User } from "@prisma/client";
import prisma from "../../shared/libs/prisma";

export const authModel = {
  createUser: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> => prisma.user.create({ data }),

  findByEmail: (email: string): Promise<User | null> =>
    prisma.user.findUnique({
      where: { email },
    }),
};
