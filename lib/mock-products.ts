import { Product } from "@/types/product"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Tikka T3x Lite Polyfade",
    brand: "Tikka",
    category: "Karabini",
    sku: "T3X-LP-308",
    price: 1450.00,
    status: "new",
    isRegulated: true,
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800",
    metadata: [{ label: "Kalibar", value: ".308 Win" }, { label: "Cijev", value: "510 mm" }]
  },
  {
    id: "2",
    name: "Vortex Venom 5-25x56 FFP",
    brand: "Vortex",
    category: "Optike",
    sku: "VOR-VEN-525",
    price: 680.00,
    salePrice: 599.00,
    status: "sale",
    isRegulated: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    metadata: [{ label: "Povećanje", value: "5-25x" }, { label: "Promjer", value: "56 mm" }]
  },
  {
    id: "3",
    name: "Beretta 686 Silver Pigeon I",
    brand: "Beretta",
    category: "Sačmarice",
    sku: "BER-686-SP",
    price: 2100.00,
    status: "in_stock",
    isRegulated: true,
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800",
    metadata: [{ label: "Kalibar", value: "12/76" }]
  },
  {
    id: "4",
    name: "Pulsar Krypton 2 FXG50",
    brand: "Pulsar",
    category: "Termalni uređaji",
    sku: "PUL-KRYP-2",
    price: 3450.00,
    status: "new",
    isRegulated: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    metadata: [{ label: "Senzor", value: "640x480" }, { label: "Domet", value: "2300m" }]
  },
  {
    id: "5",
    name: "RWS 30-06 ID Classic 11.7g",
    brand: "RWS",
    category: "Streljivo",
    sku: "RWS-3006-ID",
    price: 85.00,
    status: "in_stock",
    isRegulated: true,
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800",
    metadata: [{ label: "Kalibar", value: "30-06" }, { label: "Težina", value: "11.7g" }]
  },
  {
    id: "6",
    name: "Geco 9mm Luger FMJ 8.0g",
    brand: "Geco",
    category: "Streljivo",
    sku: "GEC-9MM-FMJ",
    price: 18.50,
    status: "sale",
    salePrice: 15.90,
    isRegulated: true,
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800",
    metadata: [{ label: "Kalibar", value: "9mm" }, { label: "Pakiranje", value: "50 kom" }]
  }
]
