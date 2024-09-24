// Filename: /pages/api/strain/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req;

    // Handle HTTP method restrictions
    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
        return;
    }

    // Extract the strain ID from the query parameters and ensure it is provided
    const { id } = query;
    if (!id) {
        res.status(400).json({ message: "ID is required" });
        return;
    }

    try {
        // Fetch the strain details from the database
        const strain = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: {
                grower:
                true, category: true, } });

                if (!strain) {
                    res.status(404).json({ message: "Strain not found" });
                    return;
                }
            
                res.status(200).json(strain);
            } catch (error) {
                res.status(500).json({ message: "Server error", error });
            }
}