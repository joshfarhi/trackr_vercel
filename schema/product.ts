import { z } from "zod";

export const CreateProductSchema = z.object({
  product: z.string(),
  value: z.preprocess((value) => {
    if (value === "" || value === undefined) return undefined;
    return Number(value);
  }, z.number().optional()),
  quantity: z.number().min(0).multipleOf(0.01).default(0),
  createdAt: z.date(),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  grower: z.string(),
});


export type CreateProductSchemaType = z.infer<
  typeof CreateProductSchema
>;
export const DeleteProductSchema = z.object({
  id: z.number(), // Using ID instead of name for deletion
});

export type DeleteProductSchemaType = z.infer<typeof DeleteProductSchema>;

export const EditProductSchema = z.object({
  id: z.number(), // Using ID instead of name for deletion
  product: z.coerce.string(),
  quantity: z.coerce.number().min(0).multipleOf(0.01).default(0), // Make it optional with a default value of 0
  createdAt: z.coerce.date(),
  description: z.string().nullable().optional(), // Make description optional
  value: z.preprocess((value) => value === "" ? undefined : value, z.number().optional()),  
  category: z.string().nullable().optional(), // Make description optional
  grower: z.string(),
});

export type EditProductSchemaType = z.infer<typeof EditProductSchema>;