"use server";

import prisma from "@/lib/prisma";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // const { product, amount, date, description, type, category, grower} = parsedBody.data;
  const { product, amount, date, description, type} = parsedBody.data;


  // const categoryRow = await prisma.category.findFirst({
  //   where: {
  //     name: category,
  //   },
  // });

  // if (!categoryRow) {
  //   throw new Error("Category not found");
  // }

  // const growerRow = await prisma.grower.findFirst({
  //   where: {
    
  //     name: grower,
  //   },
  // });

  // if (!growerRow) {
  //   throw new Error("grower not found");
  // }


  // const productRow = await prisma.product.findUnique({
  //   where: {
  //     product_growerId_categoryId: {
  //       product: parsedBody.data.product,
  //       // growerId: growerRow.id,
  //       // categoryId: categoryRow.id,
  //     },
  //   },
  // });
  // Fetch the product based on the unique combination of product name, growerId, and categoryId
  const productRow = await prisma.product.findFirst({
    where: {
      product: product, // Assuming product is the name
      // grower: {
      //   connect: { id: growerRow.id },    // Connect to an existing grower by ID
      // },

    },
  });

  if (!productRow) {
    throw new Error("Product not found");
  }



  // const strainRow = await prisma.strain.findFirst({
  //   where: {
  //     // name: strain,
  //   },
  // });

  // if (!strainRow) {
  //   throw new Error("strain not found");
  // }

  // await prisma.transaction.create({
  //   data: {
  //     amount: parsedBody.data.amount,
  //     description: description || null || "", // Set to null if not provided
  //     date: parsedBody.data.date,
  //     type: parsedBody.data.type,
  //     product: {
  //       connect: { product: productRow.product }, // Use the product's ID for the relation
  //     },
  //     // productId: productRow.id, // You might not need this if the relation is already being set via `product`
  //   },
  // });

  // await prisma.product.update({
  //   where: { product: parsedBody.data.product },
  //   data: {
  //     quantity: {
  //       increment: type === "order" ? -amount : amount, // Decrement for orders, increment for returns
  //     },
  //   },
  // });

    // Create the transaction
    await prisma.transaction.create({
      data: {
        amount: amount,
        description: description || "", // Set to empty string if not provided
        date: date,
        type: type,
        productId: productRow.id, // Link using the product's ID
      },
    });
  
    // Update the product quantity
    await prisma.product.update({
      where: { id: productRow.id },
      data: {
        quantity: {
          increment: type === "order" ? -amount : amount, // Decrement for orders, increment for returns
        },
      },
    });
  // Update month aggregate table
  await prisma.monthHistory.upsert({
    where: {
      day_month_year: {
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
      },
    },
    create: {
      userId: user.id,
      day: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      returns: type === "returns" ? amount : 0,
      order: type === "order" ? amount : 0,
    },
    update: {
      returns: {
        increment: type === "returns" ? amount : 0,
      },
      order: {
        increment: type === "order" ? amount : 0,
      },
    },
  });

  // Update year aggregate
  await prisma.yearHistory.upsert({
    where: {
      month_year: {
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
      },
    },
    create: {
      userId: user.id,
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      returns: type === "returns" ? amount : 0,
      order: type === "order" ? amount : 0,
    },
    update: {
      returns: {
        increment: type === "returns" ? amount : 0,
      },
      order: {
        increment: type === "order" ? amount : 0,
      },
    },
  });
}