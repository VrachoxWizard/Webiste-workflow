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
import { ShoppingBag, Search, Tag, ShieldAlert, Zap, Truck, Phone } from "lucide-react"
import Image from "next/image"

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
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Pretražite oružje, optike, streljivo, brendove..." />
      <CommandList className="max-h-[500px]">
        <CommandEmpty>Nema rezultata za vaš upit.</CommandEmpty>
        
        <CommandGroup heading="Najčešće pretrage">
          <CommandItem onSelect={() => runCommand(() => router.push("/kategorija/oruzje"))}>
            <Zap className="mr-2 h-4 w-4 text-primary" />
            <span>Novo oružje u ponudi</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/kategorija/akcija"))}>
            <Tag className="mr-2 h-4 w-4 text-destructive" />
            <span>Artikli na akciji</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/kategorija/termalni-uredaji"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Pulsar Termalni Uređaji</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Katalog Proizvoda">
          {MOCK_PRODUCTS.slice(0, 10).map((product) => (
            <CommandItem
              key={product.id}
              value={product.name}
              onSelect={() => runCommand(() => router.push(`/proizvod/${product.id}`))}
              className="flex items-center gap-3 py-3"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border bg-muted/20">
                <Image src={product.image} alt="" fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {product.brand}
                  </span>
                  {product.isRegulated && <ShieldAlert className="size-3 text-primary" />}
                </div>
                <span className="truncate font-bold text-sm leading-tight">{product.name}</span>
                <span className="text-xs text-muted-foreground">
                  {product.category} • {(product.salePrice || product.price).toLocaleString("hr-HR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <ShoppingBag className="ml-auto h-4 w-4 opacity-30" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Korisna pomoć">
          <CommandItem onSelect={() => runCommand(() => router.push("/kontakt"))}>
            <Phone className="mr-2 h-4 w-4" />
            <span>Stručna podrška i kontakt</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/kontakt"))}>
            <Truck className="mr-2 h-4 w-4" />
            <span>Informacije o dostavi i preuzimanju</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
