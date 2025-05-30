'use client'

import { motion } from "framer-motion"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { Input } from './ui/input'

function Header() {

      const [cartCount, setCartCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  type CartItem = { quantity: number; [key: string]: unknown };

  useEffect(() => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0));
  }, [])


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <img src="/evirtue.svg" alt="" />
              <span className="text-2xl font-bold text-orange-600 flex flex-col">E-Sanskriti <span className=" font-medium text-xs text-orange-700">By Service Brands Tech Inc.</span></span>
            </motion.div>

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
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search divine products..." className="pl-10 w-64" />
              </div>

              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">{cartCount}</Badge>
                )}
              </Link>

                <UserButton />
              {/* <Link href="/admin">
                <User className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
              </Link> */}

              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header
