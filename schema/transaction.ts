import { z } from "zod";

export const CreateTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  productId: z.number(),  // Use productId as it's unique
  description: z.string().nullable().optional(), // Make description optional
  date: z.coerce.date(),
  // categoryIcon: z.string().optional(),
  // category: z.string(),
  // grower: z.string(),
  // growerIcon: z.string().optional(),
  // strain: z.string(),
  // strainIcon: z.string().optional(),
  type: z.union([z.literal("order"), z.literal("returns")]),
});

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;
export const EditTransactionSchema = z.object({
  id: z.number(), // Using ID instead of name for deletion
  amount: z.coerce.number().min(0).multipleOf(0.01).default(0), // Make it optional with a default value of 0
  date: z.coerce.date(),
  description: z.string().nullable().optional(), // Make description optional

  // categoryIcon: z.string().optional(),
  type: z.union([z.literal("order"), z.literal("returns")]),
});

export type EditTransactionSchemaType = z.infer<typeof EditTransactionSchema>;