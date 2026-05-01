"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Search, User, ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAVIGATION_DATA } from "@/config/navigation"
import { MegaMenu } from "./MegaMenu"
import { MobileDrawer } from "./MobileDrawer"

import { useCart } from "@/context/CartContext"
import { CartDrawer } from "@/components/shop/CartDrawer"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const { itemCount } = useCart()

  React.useEffect(() => {
    const openCart = () => setIsCartOpen(true)
    window.addEventListener("cart:open", openCart)
    return () => window.removeEventListener("cart:open", openCart)
  }, [])

  return (
    <Container className="flex items-center justify-between">
      {/* Mobile Toggle */}
      <button
        className="hover:bg-muted -ml-2 rounded-md p-2 transition-colors lg:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Otvori izbornik"
      >
        <Menu className="size-6" />
      </button>

      {/* Logo Area */}
      <Link href="/" className="group flex flex-col">
        <span className="text-2xl leading-none font-bold tracking-tighter uppercase">
          Terra<span className="text-primary italic">Lov</span>
        </span>
        <span className="text-primary/60 group-hover:text-primary -mt-0.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
          Odgovorna oprema
        </span>
      </Link>

      {/* Search Trigger (Desktop) */}
      <button
        type="button"
        onClick={() => document.dispatchEvent(new CustomEvent("toggle-command-menu"))}
        className="border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:bg-background flex hidden w-full max-w-sm items-center gap-3 rounded-sm border px-3 py-2 transition-all hover:shadow-sm xl:flex"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="text-sm font-medium">Pretražite katalog...</span>
        <kbd className="bg-muted ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 lg:flex">
        {NAVIGATION_DATA.map((item) => (
          <div key={item.title} className="group relative">
            <Link
              href={item.href}
              className="hover:bg-muted/50 hover:text-primary flex items-center gap-1 rounded-sm px-4 py-2.5 text-[13px] font-bold tracking-tight transition-colors"
            >
              {item.title}
              <span className="bg-primary size-1 origin-center scale-0 rounded-full transition-transform group-hover:scale-100" />
            </Link>
            <MegaMenu data={item.columns} />
          </div>
        ))}
        <Link
          href="/kategorija/akcija"
          className="text-destructive hover:bg-destructive/5 ml-1 rounded-sm px-4 py-2.5 text-[13px] font-black tracking-tight transition-colors"
        >
          Akcija
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden size-10 rounded-full sm:flex xl:hidden"
          aria-label="Pretraži proizvode"
          onClick={() => document.dispatchEvent(new CustomEvent("toggle-command-menu"))}
        >
          <Search className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full"
          aria-label="Korisnički račun"
          asChild
        >
          <Link href="/kontakt">
            <User className="size-5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="group relative size-10 rounded-full"
          aria-label={`Košarica (${itemCount})`}
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag className="size-5" />
          {itemCount > 0 && (
            <span className="bg-primary text-primary-foreground shadow-premium-hover absolute top-1 right-1 flex size-4.5 items-center justify-center rounded-full text-[10px] font-black transition-transform group-hover:scale-110">
              {itemCount}
            </span>
          )}
        </Button>
      </div>

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </Container>
  )
}
