"use client"

import { motion } from "framer-motion"
import { ShoppingCart, User, Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
    setLoading(false)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
              <Link href="/categories" className="text-gray-700 hover:text-orange-600 transition-colors">
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
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">{getTotalItems()}</Badge>
                )}
              </div>
              <Link href="/admin">
                <User className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-orange-600 hover:text-orange-700 mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some divine products to your cart to get started</p>
              <Link href="/">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                            <p className="text-2xl font-bold text-orange-600">₹{item.price}</p>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <Card className="border-0 shadow-lg bg-white sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({getTotalItems()} items)</span>
                        <span className="font-semibold">₹{getTotalPrice()}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600 font-semibold">Free</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span className="font-semibold">₹{Math.round(getTotalPrice() * 0.18)}</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-orange-600">₹{getTotalPrice() + Math.round(getTotalPrice() * 0.18)}</span>
                      </div>
                    </div>

                    <Link href="/checkout" className="block mt-6">
                      <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <p className="text-sm text-gray-500 text-center mt-4">Secure checkout with SSL encryption</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
