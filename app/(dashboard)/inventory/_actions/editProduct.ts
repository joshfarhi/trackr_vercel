"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { EditProductSchema, EditProductSchemaType } from '@/schema/product';

// Update the function to accept a single object
export async function EditProduct({
  id,
  data,
}: {
  id: string;
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
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    console.error("Invalid product ID:", id);
    throw new Error("Invalid product ID");
  }

  // Validate the incoming data against the schema
  const parsed = EditProductSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Error parsing data:", parsed.error.format());
    throw new Error("Invalid product data");
  }

  // Find the product by its unique ID
  const product = await prisma.product.findUnique({
    where: {
      id: parsedId,
    },
  });

  if (!product) {
    throw new Error("Strain not found");
  }

  const { quantity, category, grower, createdAt, description } = parsed.data;

  // Update the product in the database
  const updatedProduct = await prisma.product.update({
    where: {
      id: parsedId,
    },
    data: {
      quantity,
      createdAt: new Date(createdAt), // Ensure valid Date object
      description: description || "", // Fallback to empty string if description is not provided
      category: category ? { connect: { id: parseInt(category) } } : undefined, // Conditionally connect to a category
      grower: { connect: { id: parseInt(grower) } }, // Connect to a grower by ID
    },
  });

  return updatedProduct;
}
