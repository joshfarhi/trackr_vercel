"use server";

import prisma from "@/lib/prisma";
import {
  CreateProductSchema,
  CreateProductSchemaType,
  DeleteProductSchema,
  DeleteProductSchemaType,
} from "@/schema/product";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function CreateProduct(form: CreateProductSchemaType) {
  const parsedBody = CreateProductSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { icon, product, quantity, category, grower, strain, createdAt } = parsedBody.data;

  // const productRow = await prisma.product.findFirst({
  //   where: {
  //     userId: user.id,
  //     icon: icon,
  //   },
  // });

  // if (!productRow) {
  //   throw new Error("category not found");
  // }
  const categoryRow = await prisma.category.findFirst({
    where: {
     
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("category not found");
  }

  const growerRow = await prisma.grower.findFirst({
    where: {
    
      name: grower,
    },
  });

  if (!growerRow) {
    throw new Error("grower not found");
  }

  const strainRow = await prisma.strain.findFirst({
    where: {
    
      name: strain,
    },
  });

  if (!strainRow) {
    throw new Error("strain not found");
  }


  return await prisma.product.create({
    data: {
      quantity,
      product,
      icon: icon ?? "",  // Default to an empty string if icon is null
      category: {
        connect: { id: categoryRow.id },  // Connect to an existing category by ID
      },
      grower: {
        connect: { id: growerRow.id },    // Connect to an existing grower by ID
      },
      strain: {
        connect: { id: strainRow.id },    // Connect to an existing strain by ID
      },
      // strainIcon: strainRow.icon,
      // description: description || "",
      // createdAt,
      createdAt,
        },
  })
  
  // Update month aggregate table
  // await prisma.monthHistory.upsert({
  //   where: {
  //     day_month_year_userId: {
  //       userId: user.id,
  //       day: createdAt.getUTCDate(),
  //       month: createdAt.getUTCMonth(),
  //       year: createdAt.getUTCFullYear(),
  //     },
  //   },
  //   create: {
  //     userId: user.id,
  //     day: createdAt.getUTCDate(),
  //     month: createdAt.getUTCMonth(),
  //     year: createdAt.getUTCFullYear(),
  //     returns: type === "returns" ? amount : 0,
  //     order: type === "order" ? amount : 0,
  //   },
  //   update: {
  //     returns: {
  //       increment: type === "returns" ? amount : 0,
  //     },
  //     order: {
  //       increment: type === "order" ? amount : 0,
  //     },
  //   },
  // })
  
  // // Update year aggreate
  // await prisma.yearHistory.upsert({
  //   where: {
  //     month_year_userId: {
  //       userId: user.id,
  //       month: createdAt.getUTCMonth(),
  //       year: createdAt.getUTCFullYear(),
  //     },
  //   },
  //   create: {
  //     userId: user.id,
  //     month: createdAt.getUTCMonth(),
  //     year: createdAt.getUTCFullYear(),
  //     returns: type === "returns" ? amount : 0,
  //     order: type === "order" ? amount : 0,
  //   },
  //   update: {
  //     returns: {
  //       increment: type === "returns" ? amount : 0,
  //     },
  //     order: {
  //       increment: type === "order" ? amount : 0,
  //     },
  //   },
  // })

}
export async function DeleteProduct(form: DeleteProductSchemaType) {
  const parsedBody = DeleteProductSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // return await prisma.product.delete({
  //   where: {
  //     product: parsedBody.data.product,  // 'product' is the unique field in your model
  //   },
  // });
}
