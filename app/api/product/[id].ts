// /api/product/[id].ts
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      grower: true,
      category: true,
    },
  });

  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(product), { status: 200 });
}
