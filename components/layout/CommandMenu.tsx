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
import { ShoppingBag, Search, Tag, ShieldAlert, Zap, Truck, Phone, Grid2X2 } from "lucide-react"
import Image from "next/image"

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
      title="Pretraga kataloga"
      description="Pretražite proizvode, kategorije i pomoć."
      className="border-border/70 top-[12vh] max-w-2xl translate-y-0 rounded-sm!"
    >
      <CommandInput placeholder="Pretražite naziv, brend, SKU, kategoriju ili dokumentaciju..." />
      <CommandList className="max-h-[70vh]">
        <CommandEmpty>Nema rezultata za vaš upit.</CommandEmpty>

        <CommandGroup heading="Najčešće pretrage">
          <CommandItem onSelect={() => runCommand(() => router.push("/kategorija/oruzje"))}>
            <Zap className="text-primary mr-2 h-4 w-4" />
            <span>Novo oružje u ponudi</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/kategorija/akcija"))}>
            <Tag className="text-destructive mr-2 h-4 w-4" />
            <span>Artikli na akciji</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/kategorija/termalni-uredaji"))}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Pulsar Termalni Uređaji</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Kategorije">
          {SEARCH_CATEGORIES.map((category) => (
            <CommandItem
              key={category.href}
              value={`${category.label} ${category.helper}`}
              onSelect={() => runCommand(() => router.push(category.href))}
              className="items-start py-3"
            >
              <div className="bg-secondary text-primary flex size-9 shrink-0 items-center justify-center rounded-sm">
                <Grid2X2 className="size-4" aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-bold">{category.label}</span>
                <span className="text-muted-foreground text-xs">{category.helper}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Katalog Proizvoda">
          {MOCK_PRODUCTS.map((product) => (
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
              className="flex items-center gap-3 py-3"
            >
              <div className="bg-muted/20 relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
                    {product.brand}
                  </span>
                  {product.isRegulated && <ShieldAlert className="text-primary size-3" />}
                </div>
                <span className="truncate text-sm leading-tight font-bold">{product.name}</span>
                <span className="text-muted-foreground text-xs">
                  {product.category} •{" "}
                  {(product.salePrice || product.price).toLocaleString("hr-HR", {
                    style: "currency",
                    currency: "EUR",
                  })}
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
