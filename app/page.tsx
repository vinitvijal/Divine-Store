"use client"

import { motion } from "framer-motion"
import { Star, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: 1, name: "Idols & Statues", image: "https://www.lamuse.in/cdn/shop/files/EmptyName43_9d19ea9e-1fdd-4ce3-9988-32ca4081ee5a.jpg?v=1702379788&width=1946", count: 45 },
  { id: 2, name: "Puja Items", image: "https://neevsoaps.com/cdn/shop/products/12-1536x1024.jpg?v=1642439392", count: 78 },
  { id: 3, name: "Incense & Dhoop", image: "https://prokart.co/wp-content/uploads/2023/02/agarbattu1200-430x287.jpg", count: 32 },
  { id: 4, name: "Books & Scriptures", image: "https://rukminim2.flixcart.com/image/850/1000/l3929ow0/regionalbooks/b/a/f/shreemad-bhagwat-geeta-original-imageeufsk4ds57y.jpeg?q=90&crop=false", count: 56 },
  { id: 5, name: "Jewelry & Accessories", image: "https://m.media-amazon.com/images/I/41AqIMHThsL._AC_UF1000,1000_QL80_.jpg", count: 23 },
  { id: 6, name: "Home Decor", image: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66236a67f8ba13189d10eb7e/0010.JPG", count: 41 },
]


const featuredProducts = [
  {
    id: 1,
    name: "Brass Krishna Idol",
    price: 2499,
    originalPrice: 3499,
    image: "https://www.statuestudio.com/cdn/shop/files/Brass_Hindu_God_Deity_Lord_Krishna_With_Flute_For_Pooja_Religious_Decor_Idol_13_Inch36000.jpg?v=1732367279",
    rating: 4.8,
    reviews: 124,
    featured: true,
  },
  {
    id: 2,
    name: "Sandalwood Incense Sticks",
    price: 299,
    originalPrice: 399,
    image: "https://m.media-amazon.com/images/I/81puYfV4SZL.jpg",
    rating: 4.6,
    reviews: 89,
    featured: true,
  },
  {
    id: 3,
    name: "Bhagavad Gita (Sanskrit)",
    price: 599,
    originalPrice: 799,
    image: "https://ombooks.com/wp-content/uploads/2024/06/9788119750603.jpg",
    rating: 4.9,
    reviews: 156,
    featured: true,
  },
  {
    id: 4,
    name: "Silver Rudraksha Mala",
    price: 1899,
    originalPrice: 2499,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS-bampNAZdWdWisgHMvY6f4ygDdqeUTPNcMwUFSfDehr4jJzR0tHJtSwsCWTUbnJy7u4HAiFWESNFUIgj7KJSSLPIN80TeIcjIM6goUJw",
    rating: 4.7,
    reviews: 67,
    featured: true,
  },
]





export default function Home() {





  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
  

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Divine Products for Your
                <span className="block text-yellow-300">Sacred Journey</span>
              </h1>
              <p className="text-xl mb-8 text-orange-100">
                Discover authentic temple products, spiritual items, and devotional accessories to enhance your
                spiritual practice and bring divine blessings to your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className=" text-zinc-700 bg-yellow-300 hover:bg-white hover:text-orange-600"
                >
                  View Categories
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://e-sanskriti.s3.us-east-1.amazonaws.com/Books.webp"
                alt="Divine Products"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Sacred Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collection of divine products for every spiritual need
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link href={`/category/${category.id}`}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-orange-50 to-yellow-50">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4 h-52 flex items-center justify-center">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={120}
                          height={120}
                          className="mx-auto rounded-sm w-full group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.count} items</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Divine Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked spiritual items blessed with divine energy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>

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
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold mb-4">Stay Connected with Divine Blessings</h2>
            <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
              Subscribe to receive spiritual insights, new product updates, and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-white text-gray-800 border-0" />
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/evirtue.svg" className="h-16" alt="" />
                <span className="text-xl font-bold">E-Sanskriti</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted source for authentic spiritual products and divine blessings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <p className="text-gray-400 mb-4">Follow us for daily spiritual inspiration and product updates.</p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  Facebook
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  Instagram
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Service Brands Tech Inc. All rights reserved. Made with devotion and love.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
