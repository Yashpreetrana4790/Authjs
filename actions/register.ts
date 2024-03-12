"use server"
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: " invalid fields"
    }
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {

    return { error: "email is already in use " }
  }


  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })


  const verificationToken = await generateVerificationToken(email)

  return {
    success: "Confirmation email sent"
  }
}
