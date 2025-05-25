"use client"

import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Package, ShoppingBag, Users, TrendingUp, Star, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialProducts = [
  {
    id: 1,
    name: "Brass Ganesha Idol",
    price: 2499,
    originalPrice: 3499,
    image: "/placeholder.svg?height=100&width=100",
    category: "Idols & Statues",
    stock: 15,
    featured: true,
    status: "active",
  },
  {
    id: 2,
    name: "Sandalwood Incense Sticks",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=100&width=100",
    category: "Incense & Dhoop",
    stock: 50,
    featured: true,
    status: "active",
  },
  {
    id: 3,
    name: "Bhagavad Gita (Sanskrit)",
    price: 599,
    originalPrice: 799,
    image: "/placeholder.svg?height=100&width=100",
    category: "Books & Scriptures",
    stock: 25,
    featured: false,
    status: "active",
  },
]

const orders = [
  {
    id: "ORD001",
    customer: "Rajesh Kumar",
    email: "rajesh@email.com",
    total: 2799,
    status: "pending",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "ORD002",
    customer: "Priya Sharma",
    email: "priya@email.com",
    total: 1899,
    status: "shipped",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "ORD003",
    customer: "Amit Patel",
    email: "amit@email.com",
    total: 4299,
    status: "delivered",
    date: "2024-01-13",
    items: 3,
  },
]

export default function AdminPage() {
  const [products, setProducts] = useState(initialProducts)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    description: "",
    featured: false,
  })

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-green-600",
    },
    {
      title: "Active Customers",
      value: "156",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "₹45,299",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const handleAddProduct = () => {
    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number.parseInt(newProduct.price),
      originalPrice: Number.parseInt(newProduct.originalPrice),
      image: "/placeholder.svg?height=100&width=100",
      category: newProduct.category,
      stock: Number.parseInt(newProduct.stock),
      featured: newProduct.featured,
      status: "active",
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      price: "",
      originalPrice: "",
      category: "",
      stock: "",
      description: "",
      featured: false,
    })
    setIsAddProductOpen(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const toggleFeatured = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)))
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕉</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">Divine Store Admin</span>
            </div>

            <Link href="/">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Store
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product Management</CardTitle>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            placeholder="Enter product name"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id="price"
                              type="number"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                              placeholder="Price"
                            />
                          </div>
                          <div>
                            <Label htmlFor="originalPrice">Original Price</Label>
                            <Input
                              id="originalPrice"
                              type="number"
                              value={newProduct.originalPrice}
                              onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                              placeholder="Original Price"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value: string) => setNewProduct({ ...newProduct, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Idols & Statues">Idols & Statues</SelectItem>
                              <SelectItem value="Puja Items">Puja Items</SelectItem>
                              <SelectItem value="Incense & Dhoop">Incense & Dhoop</SelectItem>
                              <SelectItem value="Books & Scriptures">Books & Scriptures</SelectItem>
                              <SelectItem value="Jewelry & Accessories">Jewelry & Accessories</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            placeholder="Stock quantity"
                          />
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProduct.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewProduct({ ...newProduct, description: e.target.value })}
                            placeholder="Product description"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="featured"
                            checked={newProduct.featured}
                            onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                          />
                          <Label htmlFor="featured">Featured Product</Label>
                        </div>

                        <Button onClick={handleAddProduct} className="w-full bg-orange-500 hover:bg-orange-600">
                          Add Product
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{product.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">₹{product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.stock > 10 ? "default" : "destructive"}>{product.stock} units</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={product.featured ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleFeatured(product.id)}
                          >
                            <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-gray-500">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items} items</TableCell>
                        <TableCell className="font-semibold">₹{order.total}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "delivered"
                                ? "default"
                                : order.status === "shipped"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select value={order.status} onValueChange={(value: string) => updateOrderStatus(order.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
