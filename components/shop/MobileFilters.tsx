"use client"

import { X, SlidersHorizontal, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { ProductFilters } from "@/types/filters"

const STATUSES = [
  { id: "in_stock", label: "Dostupno odmah" },
  { id: "on_order", label: "Po narudžbi" },
  { id: "sale", label: "Na akciji" },
  { id: "new", label: "Novo" },
]

interface MobileFiltersProps {
  isOpen: boolean
  brands: string[]
  brandCounts: Record<string, number>
  regulatedCount: number
  filters: ProductFilters
  onChange: (filters: Partial<ProductFilters>) => void
  onReset: () => void
  onClose: () => void
}

const toggleValue = (values: string[], value: string) => {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

export function MobileFilters({
  isOpen,
  brands,
  brandCounts,
  regulatedCount,
  filters,
  onChange,
  onReset,
  onClose,
}: MobileFiltersProps) {
  const activeCount =
    (filters.query ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    filters.brands.length +
    filters.statuses.length +
    (filters.regulatedOnly ? 1 : 0)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" showCloseButton={false} className="h-[90vh] gap-0 p-0 lg:hidden">
        <SheetHeader className="flex-row items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            <SheetTitle className="text-sm font-bold tracking-widest uppercase">Filteri</SheetTitle>
            {activeCount > 0 && (
              <span className="bg-primary text-primary-foreground rounded-sm px-2 py-0.5 text-[10px] font-black">
                {activeCount}
              </span>
            )}
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Zatvori filtere">
              <X className="size-6" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 pb-32">
          <div className="space-y-10">
            <div className="space-y-4">
              <Label
                htmlFor="mobile-filter-query"
                className="text-primary/60 text-xs font-bold tracking-widest uppercase"
              >
                Pretraga
              </Label>
              <Input
                id="mobile-filter-query"
                value={filters.query}
                onChange={(event) => onChange({ query: event.target.value })}
                placeholder="Model, brend ili šifra"
                className="h-12 rounded-sm text-sm"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-primary/60 text-xs font-bold tracking-widest uppercase">
                Cijena (€)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(event) => onChange({ minPrice: event.target.value })}
                  placeholder="Od"
                  aria-label="Najniža cijena"
                  className="h-12 rounded-sm text-sm"
                />
                <Input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(event) => onChange({ maxPrice: event.target.value })}
                  placeholder="Do"
                  aria-label="Najviša cijena"
                  className="h-12 rounded-sm text-sm"
                />
              </div>
            </div>

            <fieldset className="space-y-4">
              <legend className="text-primary/60 text-xs font-bold tracking-widest uppercase">
                Dostupnost
              </legend>
              <div className="grid grid-cols-1 gap-3">
                {STATUSES.map((status) => (
                  <div key={status.id} className="flex items-center gap-3 rounded-sm border p-3">
                    <Checkbox
                      id={`mob-status-${status.id}`}
                      className="size-5"
                      checked={filters.statuses.includes(status.id)}
                      onCheckedChange={() =>
                        onChange({ statuses: toggleValue(filters.statuses, status.id) })
                      }
                    />
                    <Label htmlFor={`mob-status-${status.id}`} className="text-sm font-bold">
                      {status.label}
                    </Label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-primary/60 text-xs font-bold tracking-widest uppercase">
                Proizvođač
              </legend>
              <div className="grid grid-cols-2 gap-4">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center gap-3 rounded-sm border p-3">
                    <Checkbox
                      id={`mob-brand-${brand}`}
                      className="size-5"
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() =>
                        onChange({ brands: toggleValue(filters.brands, brand) })
                      }
                    />
                    <Label
                      htmlFor={`mob-brand-${brand}`}
                      className="flex min-w-0 flex-1 items-center justify-between gap-2 text-sm font-bold"
                    >
                      <span className="truncate">{brand}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {brandCounts[brand] ?? 0}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="border-primary/15 bg-primary/5 rounded-sm border p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="mob-regulated-only"
                  className="mt-0.5 size-5"
                  checked={filters.regulatedOnly}
                  onCheckedChange={(checked) => onChange({ regulatedOnly: checked === true })}
                />
                <div className="space-y-1.5">
                  <Label
                    htmlFor="mob-regulated-only"
                    className="text-primary flex cursor-pointer items-center gap-2 text-xs font-black tracking-widest uppercase"
                  >
                    <ShieldAlert className="size-4" aria-hidden="true" />
                    Regulirani artikli
                  </Label>
                  <p className="text-muted-foreground/75 text-xs leading-relaxed font-medium">
                    Prikaži samo artikle koji zahtijevaju dokumentaciju ({regulatedCount}).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background absolute right-0 bottom-0 left-0 flex gap-4 border-t p-4">
          <Button variant="outline" className="h-14 flex-1 font-bold" onClick={onReset}>
            Očisti sve
          </Button>
          <SheetClose asChild>
            <Button className="h-14 flex-1 font-bold">Prikaži rezultate</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
