"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Search, User, ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAVIGATION_DATA } from "@/config/navigation"
import { MegaMenu } from "./MegaMenu"
import { MobileDrawer } from "./MobileDrawer"
import { motion, AnimatePresence } from "motion/react"

import { useCart } from "@/context/CartContext"
import { CartDrawer } from "@/components/shop/CartDrawer"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const { itemCount } = useCart()
  const [shouldBump, setShouldBump] = React.useState(false)

  React.useEffect(() => {
    if (itemCount > 0) {
      setShouldBump(true)
      const timer = setTimeout(() => setShouldBump(false), 300)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  React.useEffect(() => {
    const openCart = () => setIsCartOpen(true)
    window.addEventListener("cart:open", openCart)
    return () => window.removeEventListener("cart:open", openCart)
  }, [])

  return (
    <Container className="flex items-center justify-between">
      {/* Mobile Toggle */}
      <button
        className="hover:bg-secondary/10 -ml-2 rounded-full p-2.5 transition-colors lg:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Otvori izbornik"
      >
        <Menu className="size-6" />
      </button>

      {/* Logo Area */}
      <Link href="/" className="group flex flex-col">
        <span className="text-2xl leading-none font-black tracking-tighter uppercase sm:text-3xl">
          Terra<span className="text-accent italic">Lov</span>
        </span>
        <span className="text-muted-foreground/40 group-hover:text-accent -mt-0.5 text-[9px] font-black tracking-[0.25em] uppercase transition-colors">
          Premium Terenska Oprema
        </span>
      </Link>

      {/* Search Trigger (Desktop) */}
      <button
        type="button"
        onClick={() => document.dispatchEvent(new CustomEvent("toggle-command-menu"))}
        className="bg-secondary/5 text-muted-foreground/60 border-black/5 hover:border-accent/40 hover:bg-background flex hidden w-full max-w-sm items-center gap-4 rounded-sm border px-5 py-2.5 transition-all hover:shadow-sm xl:flex"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="text-xs font-bold tracking-tight">Pretražite katalog...</span>
        <div className="bg-background border-black/5 ml-auto inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 shadow-inner">
          <span className="text-[9px] font-black text-muted-foreground/30">CTRL</span>
          <span className="text-[9px] font-black text-muted-foreground/30">K</span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 lg:flex">
        {NAVIGATION_DATA.map((item) => (
          <div key={item.title} className="group relative">
            <Link
              href={item.href}
              className="hover:text-accent flex items-center gap-2 px-4 py-3 text-[11px] font-black tracking-widest uppercase transition-colors"
            >
              {item.title}
              <div className="bg-accent h-1 w-1 origin-center scale-0 rounded-full transition-transform group-hover:scale-100" />
            </Link>
            <MegaMenu data={item.columns} />
          </div>
        ))}
        <Link
          href="/kategorija/akcija"
          className="text-accent hover:bg-accent/5 ml-1 rounded-sm px-4 py-3 text-[11px] font-black tracking-widest uppercase transition-colors"
        >
          Ponuda
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden size-11 rounded-full sm:flex xl:hidden"
          aria-label="Pretraži proizvode"
          onClick={() => document.dispatchEvent(new CustomEvent("toggle-command-menu"))}
        >
          <Search className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-11 rounded-full hover:bg-secondary/10"
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
          className="group relative size-11 rounded-full hover:bg-secondary/10"
          aria-label={`Košarica (${itemCount})`}
          onClick={() => setIsCartOpen(true)}
        >
          <motion.div
            animate={shouldBump ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ShoppingBag className="size-5" />
          </motion.div>
          
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-accent text-foreground shadow-premium absolute top-1.5 right-1.5 flex size-4.5 items-center justify-center rounded-full text-[10px] font-black"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </Container>
  )
}
