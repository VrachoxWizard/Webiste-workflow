"use client"

import { X, SlidersHorizontal, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { ProductFilters } from "@/types/filters"
import { cn } from "@/lib/utils"

const STATUSES = [
  { id: "in_stock", label: "Dostupno odmah" },
  { id: "on_order", label: "Po narudžbi" },
  { id: "sale", label: "Na akciji" },
  { id: "new", label: "Novo u ponudi" },
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
      <SheetContent side="bottom" showCloseButton={false} className="h-[92vh] gap-0 p-0 lg:hidden rounded-t-[2rem]">
        <SheetHeader className="flex-row items-center justify-between border-b border-black/5 p-6">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="text-accent size-5" aria-hidden="true" />
            <SheetTitle className="text-sm font-black tracking-widest uppercase">Konfiguracija</SheetTitle>
            {activeCount > 0 && (
              <span className="bg-accent text-foreground rounded-full px-2.5 py-0.5 text-[10px] font-black">
                {activeCount}
              </span>
            )}
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="size-12 rounded-full hover:bg-black/5" aria-label="Zatvori">
              <X className="size-6" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-8 pb-40">
          <div className="space-y-12">
            {/* Search */}
            <div className="space-y-4">
              <h3 className="text-label">Pretraga Modela</h3>
              <Input
                id="mobile-filter-query"
                value={filters.query}
                onChange={(event) => onChange({ query: event.target.value })}
                placeholder="Npr. Swarovski, Blaser..."
                className="tactile-border h-14 rounded-sm text-sm font-bold"
              />
            </div>

            {/* Price */}
            <div className="space-y-4">
              <h3 className="text-label">Cjenovni Razred (€)</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(event) => onChange({ minPrice: event.target.value })}
                  placeholder="Minimalno"
                  className="tactile-border h-14 rounded-sm text-sm font-bold"
                />
                <Input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(event) => onChange({ maxPrice: event.target.value })}
                  placeholder="Maksimalno"
                  className="tactile-border h-14 rounded-sm text-sm font-bold"
                />
              </div>
            </div>

            {/* Availability */}
            <fieldset className="space-y-4">
              <legend className="text-label mb-2">Dostupnost Artikla</legend>
              <div className="grid grid-cols-1 gap-3">
                {STATUSES.map((status) => (
                  <label 
                    key={status.id} 
                    className={cn(
                      "flex items-center gap-4 rounded-sm border p-4 transition-all active:scale-[0.98]",
                      filters.statuses.includes(status.id) ? "border-accent bg-accent/5" : "border-black/5"
                    )}
                  >
                    <Checkbox
                      id={`mob-status-${status.id}`}
                      className="size-6 border-black/10"
                      checked={filters.statuses.includes(status.id)}
                      onCheckedChange={() =>
                        onChange({ statuses: toggleValue(filters.statuses, status.id) })
                      }
                    />
                    <span className="text-sm font-black tracking-tight">{status.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Brands */}
            <fieldset className="space-y-4">
              <legend className="text-label mb-2">Proizvođač</legend>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((brand) => (
                  <label 
                    key={brand} 
                    className={cn(
                      "flex flex-col gap-2 rounded-sm border p-4 transition-all active:scale-[0.98]",
                      filters.brands.includes(brand) ? "border-accent bg-accent/5" : "border-black/5"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <Checkbox
                        id={`mob-brand-${brand}`}
                        className="size-5 border-black/10"
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() =>
                          onChange({ brands: toggleValue(filters.brands, brand) })
                        }
                      />
                      <span className="text-muted-foreground/40 text-[10px] font-black">
                        {brandCounts[brand] ?? 0}
                      </span>
                    </div>
                    <span className="truncate text-xs font-black tracking-tight">{brand}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Regulated */}
            <div className="surface-glass border-accent/20 rounded-sm border p-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  id="mob-regulated-only"
                  className="mt-1 size-6 border-accent/20"
                  checked={filters.regulatedOnly}
                  onCheckedChange={(checked) => onChange({ regulatedOnly: checked === true })}
                />
                <div className="space-y-2">
                  <label
                    htmlFor="mob-regulated-only"
                    className="text-accent flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"
                  >
                    <ShieldAlert className="size-4" aria-hidden="true" />
                    Regulirani artikli
                  </label>
                  <p className="text-muted-foreground/75 text-[11px] leading-relaxed font-medium">
                    Prikaži samo artikle koji zahtijevaju dokumentaciju ({regulatedCount}).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-background absolute right-0 bottom-0 left-0 grid grid-cols-2 gap-4 border-t border-black/5 p-6 backdrop-blur-md">
          <Button 
            variant="outline" 
            className="tactile-border h-14 text-[10px] font-black tracking-widest uppercase" 
            onClick={onReset}
          >
            Resetiraj
          </Button>
          <SheetClose asChild>
            <Button className="h-14 text-[10px] font-black tracking-widest uppercase shadow-premium">
              Prikaži Rezultate
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
