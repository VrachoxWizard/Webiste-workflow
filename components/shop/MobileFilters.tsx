"use client"

import { X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { ProductFilters } from "@/types/filters"

const BRANDS = ["Tikka", "Beretta", "Vortex", "Pulsar", "Geco", "RWS"]
const STATUSES = [
  { id: "in_stock", label: "Dostupno odmah" },
  { id: "on_order", label: "Po narudžbi" },
  { id: "sale", label: "Na akciji" },
  { id: "new", label: "Novo" },
]

interface MobileFiltersProps {
  isOpen: boolean
  filters: ProductFilters
  onChange: (filters: Partial<ProductFilters>) => void
  onReset: () => void
  onClose: () => void
}

const toggleValue = (values: string[], value: string) => {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

export function MobileFilters({ isOpen, filters, onChange, onReset, onClose }: MobileFiltersProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" showCloseButton={false} className="h-[90vh] gap-0 p-0 lg:hidden">
        <SheetHeader className="flex-row items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            <SheetTitle className="text-sm font-bold uppercase tracking-widest">Filteri</SheetTitle>
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
              <Label htmlFor="mobile-filter-query" className="text-xs font-bold uppercase tracking-widest text-primary/60">Pretraga</Label>
              <Input
                id="mobile-filter-query"
                value={filters.query}
                onChange={(event) => onChange({ query: event.target.value })}
                placeholder="Model, brend ili šifra"
                className="h-12 rounded-sm text-sm"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/60">Cijena (€)</h3>
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
              <legend className="text-xs font-bold uppercase tracking-widest text-primary/60">Dostupnost</legend>
              <div className="grid grid-cols-1 gap-3">
                {STATUSES.map((status) => (
                  <div key={status.id} className="flex items-center gap-3 rounded-sm border p-3">
                    <Checkbox
                      id={`mob-status-${status.id}`}
                      className="size-5"
                      checked={filters.statuses.includes(status.id)}
                      onChange={() => onChange({ statuses: toggleValue(filters.statuses, status.id) })}
                    />
                    <Label htmlFor={`mob-status-${status.id}`} className="text-sm font-bold">{status.label}</Label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-primary/60">Proizvođač</legend>
              <div className="grid grid-cols-2 gap-4">
                {BRANDS.map((brand) => (
                  <div key={brand} className="flex items-center gap-3 rounded-sm border p-3">
                    <Checkbox
                      id={`mob-brand-${brand}`}
                      className="size-5"
                      checked={filters.brands.includes(brand)}
                      onChange={() => onChange({ brands: toggleValue(filters.brands, brand) })}
                    />
                    <Label htmlFor={`mob-brand-${brand}`} className="text-sm font-bold">{brand}</Label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex gap-4 border-t bg-background p-4">
          <Button variant="outline" className="h-14 flex-1 font-bold" onClick={onReset}>Očisti sve</Button>
          <SheetClose asChild>
            <Button className="h-14 flex-1 font-bold">Prikaži rezultate</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
