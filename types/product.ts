export type ProductStatus = 'in_stock' | 'on_order' | 'new' | 'sale'

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  sku: string
  price: number
  salePrice?: number
  status: ProductStatus
  isRegulated: boolean // For legal notice (weapons/ammo)
  image: string
  metadata?: {
    label: string
    value: string
  }[]
}
