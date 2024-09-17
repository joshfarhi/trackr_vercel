import { GetFormatterForWeight } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const pageIndex = parseInt(searchParams.get("page") || "0", 10); // Default to page 0
  const pageSize = parseInt(searchParams.get("pageSize") || "40", 10); // Default to 40 items per page

  const queryParams = OverviewQuerySchema.safeParse({
    from,
    to,
  });

  if (!queryParams.success) {
    return new Response(JSON.stringify({ error: queryParams.error.message }), {
      status: 400,
    });
  }

  // Fetch total count of products (for pagination)
  const totalRows = await prisma.product.count({
    where: {
      createdAt: {
        gte: queryParams.data.from,
        lte: queryParams.data.to,
      },
    },
  });

  // Fetch products with pagination
  const products = await getProductsHistory(
    user.id,
    queryParams.data.from,
    queryParams.data.to,
    pageIndex,
    pageSize
  );

  return new Response(
    JSON.stringify({
      rows: products, // Return paginated products
      totalRows, // Return the total number of rows for pagination
    })
  );
}

export type GetProductHistoryResponseType = Awaited<
  ReturnType<typeof getProductsHistory>
>;

async function getProductsHistory(
  userId: string,
  from: Date,
  to: Date,
  pageIndex: number,
  pageSize: number
) {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId,
    },
  });
  if (!userSettings) {
    throw new Error("User settings not found");
  }

  const products = await prisma.product.findMany({
    where: {
      createdAt: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      grower: {
        select: {
          name: true,
        },
      },
    },
    skip: pageIndex * pageSize, // Skip items based on pageIndex
    take: pageSize, // Limit the number of items to pageSize
  });

  return products.map((product) => ({
    ...product,
    productName: product.product || "Unknown Product",
    growerName: product.grower?.name || "Unknown Grower",
    categoryName: product.category?.name || "---",
    date: product.createdAt,
  }));
}
