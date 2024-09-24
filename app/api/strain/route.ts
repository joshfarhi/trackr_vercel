// File: /api/strain/route.ts

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req;

    // Extract the strain ID from the query parameters
    const { id } = query;

    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
        return;
    }

    if (!id) {
        res.status(400).json({ message: "ID is required" });
        return;
    }

    try {
        const strain = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: {
                grower: true,
                category: true,
            }
        });

        if (!strain) {
            res.status(404).json({ message: "Strain not found" });
            return;
        }

        res.status(200).json(strain);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
