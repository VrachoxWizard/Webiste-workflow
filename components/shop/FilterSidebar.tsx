import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, ShieldAlert, X } from "lucide-react"
import { ProductFilters } from "@/types/filters"
import { cn } from "@/lib/utils"

const STATUSES = [
  { id: "in_stock", label: "Dostupno odmah" },
  { id: "on_order", label: "Po narudžbi" },
  { id: "sale", label: "Na akciji" },
  { id: "new", label: "Novo" },
]

interface FilterSidebarProps {
  brands: string[]
  filters: ProductFilters
  onChange: (filters: Partial<ProductFilters>) => void
  onReset: () => void
}

const toggleValue = (values: string[], value: string) => {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

export function FilterSidebar({ brands, filters, onChange, onReset }: FilterSidebarProps) {
  const activeCount =
    (filters.query ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    filters.brands.length +
    filters.statuses.length

  return (
    <aside
      className="sticky top-28 hidden h-fit w-64 shrink-0 flex-col gap-10 lg:flex"
      aria-label="Filteri proizvoda"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Filteri</h2>
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
          >
            Očisti ({activeCount})
          </button>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Traži
        </h3>
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Model, SKU..."
            aria-label="Traži u kategoriji"
            className="h-10 rounded-sm border-border/50 pl-10 text-sm focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Cijena (€)
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="min-price"
              className="text-[9px] font-bold uppercase text-muted-foreground"
            >
              Od
            </Label>
            <Input
              id="min-price"
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(event) => onChange({ minPrice: event.target.value })}
              placeholder="0"
              className="h-10 rounded-sm border-border/50 text-xs focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="max-price"
              className="text-[9px] font-bold uppercase text-muted-foreground"
            >
              Do
            </Label>
            <Input
              id="max-price"
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(event) => onChange({ maxPrice: event.target.value })}
              placeholder="5000"
              className="h-10 rounded-sm border-border/50 text-xs focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <fieldset className="space-y-5">
        <legend className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Dostupnost
        </legend>
        <div className="space-y-3">
          {STATUSES.map((status) => (
            <div key={status.id} className="group flex items-center gap-3">
              <Checkbox
                id={`status-${status.id}`}
                checked={filters.statuses.includes(status.id)}
                onCheckedChange={() => onChange({ statuses: toggleValue(filters.statuses, status.id) })}
                className="size-4.5"
              />
              <Label
                htmlFor={`status-${status.id}`}
                className="cursor-pointer text-[13px] font-medium leading-none transition-colors group-hover:text-primary"
              >
                {status.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Proizvođač
        </legend>
        <div className="max-h-64 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
          {brands.map((brand) => (
            <div key={brand} className="group flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => onChange({ brands: toggleValue(filters.brands, brand) })}
                  className="size-4.5"
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="cursor-pointer text-[13px] font-medium leading-none transition-colors group-hover:text-primary"
                >
                  {brand}
                </Label>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground/40 transition-colors group-hover:text-primary/40">
                (12)
              </span>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Regulated Toggle Special */}
      <div className="rounded-sm border border-primary/10 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 size-4 text-primary" />
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              Regulirano
            </p>
            <p className="text-[11px] font-medium leading-relaxed text-muted-foreground/70">
              Prikaži samo artikle koji zahtijevaju dokumentaciju.
            </p>
            <Button
              variant="link"
              className="h-auto p-0 text-[10px] font-bold uppercase tracking-widest text-primary underline-offset-4"
              onClick={() => {
                // This is a placeholder for logic if we want to filter by regulated status
                onChange({ query: "regulirano" })
              }}
            >
              Uključi filter
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
