'use server'

import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

export async function getFeaturedProducts(sellerId: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isFeatured: true,
        sellerId: sellerId,
        isActive: true,
      },
    })
    console.log(products)
    return products
  } catch (error) {
    console.error("Error fetching featured products:", error)
    // throw new Error("Failed to fetch featured products")
  }
}