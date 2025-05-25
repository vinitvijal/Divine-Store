"use client"

import { motion } from "framer-motion"
import { ShoppingCart, User, Star, Heart, Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categoryProducts = [
  {
    id: 1,
    name: "Brass Ganesha Idol",
    price: 2499,
    originalPrice: 3499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "Idols & Statues",
  },
  {
    id: 2,
    name: "Marble Krishna Statue",
    price: 4999,
    originalPrice: 6499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    category: "Idols & Statues",
  },
  {
    id: 3,
    name: "Silver Lakshmi Idol",
    price: 7999,
    originalPrice: 9999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    category: "Idols & Statues",
  },
  {
    id: 4,
    name: "Wooden Hanuman Statue",
    price: 1899,
    originalPrice: 2499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 67,
    category: "Idols & Statues",
  },
  {
    id: 5,
    name: "Crystal Shiva Lingam",
    price: 3499,
    originalPrice: 4499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 92,
    category: "Idols & Statues",
  },
  {
    id: 6,
    name: "Brass Durga Maa Idol",
    price: 5499,
    originalPrice: 6999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 134,
    category: "Idols & Statues",
  },
]

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [cartCount, setCartCount] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [])

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕉</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">Divine Store</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">
                Home
              </Link>
              <Link href="/categories" className="text-orange-600 font-semibold">
                Categories
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-orange-600 transition-colors">
                Search
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">{cartCount}</Badge>
                )}
              </Link>
              <Link href="/admin">
                <User className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Category Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-4">Idols & Statues</h1>
            <p className="text-xl text-orange-100">Sacred idols and divine statues to bring blessings to your home</p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div
            className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
          >
            {categoryProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "grid" ? "h-64" : "h-48"
                        }`}
                      />
                    </Link>
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-4 left-4 bg-red-500">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
