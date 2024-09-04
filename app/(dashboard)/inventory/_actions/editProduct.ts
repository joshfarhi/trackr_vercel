"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { EditProductSchema, EditProductSchemaType } from '@/schema/product';

// Update the function to accept a single object with both id and data
export async function EditProduct({
  id,           // Product ID
  data,         // Form data
}: {
  id: number;
  data: EditProductSchemaType;
}) {

  // Ensure the user is logged in
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // Log the incoming ID for debugging purposes
  console.log("ID received:", id);

  // Convert the ID to a number
  const parsedId = Number(id);
  if (isNaN(parsedId)) {
    console.error("Invalid product ID:", id);
    throw new Error("Invalid product ID");
  }

  // Validate the incoming form against the schema
  const parsed = EditProductSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Error parsing form:", parsed.error.format());
    throw new Error("Invalid product form");
  }

  // Find the product by its unique ID
  const product = await prisma.product.findUnique({
    where: {
      id: parsedId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const { quantity, category, grower, updatedAt, description } = parsed.data;

  // Update the product in the database
  const updatedProduct = await prisma.product.update({
    where: {
      id: parsedId,
    },
    data: {
      quantity,
      updatedAt: new Date(updatedAt),
      description: description || "", 
      category: category ? { connect: { id: parseInt(category) } } : undefined, 
      grower: { connect: { id: parseInt(grower) } }, // Connect to grower by ID
    },
  });
  

  return updatedProduct;
}
