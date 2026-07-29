import { z } from "zod";

export const userRoleSchema = z.enum(["admin", "editor", "viewer"]);

const userFields = {
  name: z.string().trim().min(2).max(50),
  email: z.email().max(100),
  role: userRoleSchema,
  active: z.boolean(),
  createdAt: z.iso.datetime(),
};

export const createUserRequestSchema = z.object(userFields).strict();
export const updateUserRequestSchema = z
  .object(userFields)
  .partial()
  .strict()
  .refine((values) => Object.keys(values).length > 0, {
    message: "At least one user field is required",
  });

export const authRequestSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1),
  })
  .strict();

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type AuthRequest = z.infer<typeof authRequestSchema>;
