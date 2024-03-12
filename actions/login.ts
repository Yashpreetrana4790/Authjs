"use server"
import { LoginSchema } from "@/schemas";
import { z } from "zod";


import { signIn } from "@/auth";
import { signOut } from "@/auth";
import { DEFAULT_LOGIN_PATH } from "@/routes";
import { AuthError } from "next-auth";
import { error } from "console";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "email does not exist" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    return { success: " confirmation email sent " }
  }
  try {
    await signIn("credentials", {
      email, password,
      redirectTo: DEFAULT_LOGIN_PATH
    }
    )
  } catch (error) {
    if (error instanceof AuthError)
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "invalid credentials"
          }
        default: return { error: " Something went wrong" }
      }
    throw error
  }
};

