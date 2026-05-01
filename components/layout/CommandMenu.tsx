"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { MOCK_PRODUCTS } from "@/lib/mock-products"
import { ShoppingBag, Search, Tag, ShieldAlert, Zap, Truck, Phone, Grid2X2, ArrowRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const SEARCH_CATEGORIES = [
  { label: "Oružje", href: "/kategorija/oruzje", helper: "Regulirani artikli uz dokumentaciju" },
  { label: "Optike", href: "/kategorija/optike", helper: "Dnevna, noćna i termalna optika" },
  { label: "Streljivo", href: "/kategorija/streljivo", helper: "Prodaja uz zakonsku provjeru" },
  {
    label: "Odjeća i obuća",
    href: "/kategorija/odjeca-i-obuca",
    helper: "Jakne, čizme i terenska oprema",
  },
]

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    const toggleCommandMenu = () => setOpen((o) => !o)
    document.addEventListener("toggle-command-menu", toggleCommandMenu)

    return () => {
      document.removeEventListener("keydown", down)
      document.removeEventListener("toggle-command-menu", toggleCommandMenu)
    }
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Inteligentna Pretraga"
      description="Pretražite premium katalog, brendove ili tehničku dokumentaciju."
      className="border-black/5 top-[15vh] max-w-2xl translate-y-0 rounded-sm shadow-2xl backdrop-blur-xl"
    >
      <div className="relative">
        <CommandInput 
          placeholder="Pretražite naziv, brend ili SKU oznaku..." 
          className="h-16 border-none text-sm font-bold placeholder:font-medium placeholder:text-muted-foreground/30 focus:ring-0"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 bg-secondary/5 rounded-full border border-black/5 pointer-events-none">
          <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">ESC za izlaz</span>
        </div>
      </div>
      
      <CommandList className="max-h-[60vh] scrollbar-none">
        <CommandEmpty className="py-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-secondary/5 flex size-16 items-center justify-center rounded-full">
              <Search className="text-muted-foreground/20 size-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black tracking-widest uppercase">Nema rezultata</p>
              <p className="text-muted-foreground text-xs font-medium">Pokušajte s općenitijim pojmom ili brendom.</p>
            </div>
          </div>
        </CommandEmpty>

        <CommandGroup heading={<span className="text-label text-accent px-2">Popularne Destinacije</span>}>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/kategorija/oruzje"))}
            className="flex items-center gap-4 py-4 px-4 group"
          >
            <div className="bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110">
              <Zap className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-tight">Novo u ponudi</span>
              <span className="text-[10px] text-muted-foreground font-medium">Istražite najnovije dolaske premium opreme</span>
            </div>
            <ArrowRight className="ml-auto size-4 text-muted-foreground/20 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </CommandItem>
          
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/kategorija/akcija"))}
            className="flex items-center gap-4 py-4 px-4 group"
          >
            <div className="bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110">
              <Tag className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-tight">Ekskluzivne pogodnosti</span>
              <span className="text-[10px] text-muted-foreground font-medium">Posebne ponude i artikli na sezonskom popustu</span>
            </div>
            <ArrowRight className="ml-auto size-4 text-muted-foreground/20 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-black/5" />

        <CommandGroup heading={<span className="text-label text-muted-foreground/40 px-2">Kategorije</span>}>
          <div className="grid grid-cols-2 gap-1 p-2">
            {SEARCH_CATEGORIES.map((category) => (
              <CommandItem
                key={category.href}
                value={`${category.label} ${category.helper}`}
                onSelect={() => runCommand(() => router.push(category.href))}
                className="flex flex-col items-start gap-1 p-4 rounded-sm hover:bg-secondary/5 transition-colors group"
              >
                <span className="text-xs font-black tracking-tight group-hover:text-accent transition-colors">{category.label}</span>
                <span className="text-[9px] text-muted-foreground font-medium line-clamp-1">{category.helper}</span>
              </CommandItem>
            ))}
          </div>
        </CommandGroup>

        <CommandSeparator className="bg-black/5" />

        <CommandGroup heading={<span className="text-label text-muted-foreground/40 px-2">Istaknuti Proizvodi</span>}>
          {MOCK_PRODUCTS.slice(0, 6).map((product) => (
            <CommandItem
              key={product.id}
              value={[
                product.name,
                product.brand,
                product.sku,
                product.category,
                product.isRegulated ? "regulirano dokumentacija dozvola" : "slobodna prodaja",
              ].join(" ")}
              onSelect={() => runCommand(() => router.push(`/proizvod/${product.id}`))}
              className="flex items-center gap-4 py-4 px-4 group border-b border-black/5 last:border-0"
            >
              <div className="bg-secondary/5 tactile-border relative size-14 shrink-0 overflow-hidden rounded-sm transition-transform group-hover:scale-105">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover p-1"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-accent text-[9px] font-black tracking-widest uppercase">
                    {product.brand}
                  </span>
                  {product.isRegulated && (
                    <div className="bg-accent/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldAlert className="text-accent size-2.5" />
                      <span className="text-[8px] font-black text-accent uppercase tracking-tighter">Regulirano</span>
                    </div>
                  )}
                </div>
                <span className="truncate text-sm font-black tracking-tight leading-none">{product.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground/50 text-[10px] font-medium">
                    {product.category}
                  </span>
                  <span className="text-muted-foreground/20">•</span>
                  <span className="text-foreground text-[10px] font-black">
                    {(product.salePrice || product.price).toLocaleString("hr-HR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-accent text-foreground p-2 rounded-full shadow-premium">
                  <ShoppingBag className="size-3.5" />
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-black/5" />

        <CommandGroup heading={<span className="text-label text-muted-foreground/40 px-2">Stručna Podrška</span>}>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/kontakt"))}
            className="flex items-center gap-3 py-4 px-4 group"
          >
            <Phone className="size-4 text-muted-foreground/40 group-hover:text-accent transition-colors" />
            <span className="text-xs font-black tracking-tight">Korisnička služba i tehnička pomoć</span>
            <ArrowRight className="ml-auto size-4 text-muted-foreground/20 group-hover:text-accent transition-transform group-hover:translate-x-1" />
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/kontakt"))}
            className="flex items-center gap-3 py-4 px-4 group"
          >
            <Truck className="size-4 text-muted-foreground/40 group-hover:text-accent transition-colors" />
            <span className="text-xs font-black tracking-tight">Status pošiljke i logistička pitanja</span>
            <ArrowRight className="ml-auto size-4 text-muted-foreground/20 group-hover:text-accent transition-transform group-hover:translate-x-1" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
