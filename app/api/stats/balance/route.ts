
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

  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    return new Response(JSON.stringify({ error: queryParams.error.message }), {
      status: 400,
    });
  }

  const stats = await getBalanceStats(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  );

  return new Response(JSON.stringify(stats));
}

export type GetBalanceStatsResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>;
//Stats for Transaction Balance
// async function getBalanceStats(userId: string, from: Date, to: Date) {
//   const totals = await prisma.transaction.groupBy({
//     by: ["type"],
//     where: {
//     //   userId,
//       date: {
//         gte: from,
//         lte: to,
//       },
//     },
//     _sum: {
//       amount: true,
//     },
//   });

//   return {
//     returns: totals.find((t) => t.type === "returns")?._sum.amount || 0,
//     order: totals.find((t) => t.type === "order")?._sum.amount || 0,
//   };
// }
async function getBalanceStats(userId: string) {
  const totalQuantity = await prisma.product.aggregate({
    _sum: {
      quantity: true,
    },
  });

  return {
    balance: totalQuantity._sum.quantity || 0,
  };
}