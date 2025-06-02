"use client"

import { motion } from "framer-motion"
import { Star, Heart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById } from "@/actions/products"
import { Product } from "@/lib/generated/prisma"

// const product = {
//   id: 1,
//   name: "Brass Ganesha Idol",
//   price: 2499,
//   originalPrice: 3499,
//   images: [
//     "/placeholder.svg?height=500&width=500",
//     "/placeholder.svg?height=500&width=500",
//     "/placeholder.svg?height=500&width=500",
//     "/placeholder.svg?height=500&width=500",
//   ],
//   rating: 4.8,
//   reviews: 124,
//   category: "Idols & Statues",
//   description:
//     "This exquisite brass Ganesha idol is handcrafted by skilled artisans with intricate details. Lord Ganesha, the remover of obstacles and patron of arts and sciences, brings prosperity and good fortune to your home. Made from high-quality brass with antique finish.",
//   features: [
//     "Handcrafted by skilled artisans",
//     "High-quality brass construction",
//     "Antique finish for authentic look",
//     "Perfect for home temple or office",
//     "Brings prosperity and removes obstacles",
//   ],
//   specifications: {
//     Material: "Brass",
//     Height: "6 inches",
//     Width: "4 inches",
//     Weight: "800 grams",
//     Finish: "Antique Brass",
//     Origin: "India",
//   },
//   inStock: true,
//   stockCount: 15,
// }

const relatedProducts = [
  {
    id: 2,
    name: "Marble Krishna Statue",
    price: 4999,
    originalPrice: 6499,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Silver Lakshmi Idol",
    price: 7999,
    originalPrice: 9999,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Wooden Hanuman Statue",
    price: 1899,
    originalPrice: 2499,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
  },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = use(params);
  // const [cartCount, setCartCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [product, setCurrentProduct] = useState<Product>()
  
    
    


  useEffect(() => {
     async function fetchProduct() {
        const res = await getProductById(parseInt(id), 1)
        if (res){
            setCurrentProduct(res)
        } else { 
            console.error("Product not found")
        }
      }
    fetchProduct()
  }, [])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }

  if(product)
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
 

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-orange-600">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${product?.categoryId}`} className="hover:text-orange-600">
              {product?.categoryId}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product?.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={[product.photoUrl ,...product.photoUrls][selectedImage] || "/placeholder.svg"}
                    alt={product?.name || "Product Image"}
                    width={500}
                    height={500}
                    className="w-full h-96 object-contain rounded-lg shadow-lg"
                  />
                  {product?.markedPrice && parseFloat(product?.markedPrice) > parseFloat(product?.price) && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                      {Math.round(((parseFloat(product.markedPrice) - parseFloat(product.price)) / parseFloat(product.markedPrice)) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[product.photoUrl,...product.photoUrls].map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`border-2 rounded-lg overflow-hidden ${
                        selectedImage === index ? "border-orange-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(4.2) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({120} reviews)</span>
                  <Badge variant="secondary">{product.categoryId}</Badge>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-orange-600">₹{product.price}</span>
                {product.markedPrice && parseFloat(product.markedPrice) > parseFloat(product.price) && (
                  <span className="text-2xl text-gray-500 line-through">₹{product.markedPrice}</span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.stockQuantity
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">({product.stockQuantity} in stock)</span>
                </div>

                <div className="flex space-x-4">
                  <Button size="lg" className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={addToCart}>
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-sm font-semibold">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over ₹999</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-sm font-semibold">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% secure checkout</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-sm font-semibold">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {/* {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))} */}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {/* {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))} */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        {<span className="ml-2 font-semibold">Rajesh Kumar</span>}
                        <span className="ml-auto text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-600">
                        Beautiful craftsmanship! The details are amazing and it looks perfect in my home temple.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="ml-2 font-semibold">Priya Sharma</span>
                        <span className="ml-auto text-sm text-gray-500">1 week ago</span>
                      </div>
                      <p className="text-gray-600">Good quality brass idol. Fast delivery and well packaged.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden"
              >
                <Link href={`/product/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-orange-600">₹{relatedProduct.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{relatedProduct.originalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
