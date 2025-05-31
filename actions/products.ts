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

export async function getCategories(count: number, sellerId: number) {
  try {
    const categories = await prisma.category.findMany({
      take: count
    })

    const countByCategory = await prisma.product.groupBy({
      by: ['categoryId'],
      _count: {
        id: true,
      },
      where: {
        isActive: true,
        sellerId: sellerId
      },
    })
    const countCat = categories.map(category => {
      const count = countByCategory.find(c => c.categoryId === category.id)?._count.id || 0
      return {
        ...category,
        productCount: count,
      }
    })

    return countCat
    
  } catch (error) {
    console.error("Error fetching top categories:", error)
    // throw new Error("Failed to fetch top categories")
  }
}




export async function getProductById(productId: number, sellerId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        sellerId: sellerId,
      },
      include: {
        category: true,
        seller: true,
      },
    })

    if (!product) {
      throw new Error("Product not found")
    }

    return product
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    // throw new Error("Failed to fetch product by ID")
  }
}