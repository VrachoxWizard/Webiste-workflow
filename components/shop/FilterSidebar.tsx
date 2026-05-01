import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, ShieldAlert } from "lucide-react"
import { ProductFilters } from "@/types/filters"

const STATUSES = [
  { id: "in_stock", label: "Dostupno odmah" },
  { id: "on_order", label: "Po narudžbi" },
  { id: "sale", label: "Na akciji" },
  { id: "new", label: "Novo" },
]

interface FilterSidebarProps {
  brands: string[]
  brandCounts: Record<string, number>
  regulatedCount: number
  filters: ProductFilters
  onChange: (filters: Partial<ProductFilters>) => void
  onReset: () => void
}

const toggleValue = (values: string[], value: string) => {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

export function FilterSidebar({
  brands,
  brandCounts,
  regulatedCount,
  filters,
  onChange,
  onReset,
}: FilterSidebarProps) {
  const activeCount =
    (filters.query ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    filters.brands.length +
    filters.statuses.length +
    (filters.regulatedOnly ? 1 : 0)

  return (
    <aside
      className="sticky top-28 hidden h-fit w-64 shrink-0 flex-col gap-10 lg:flex"
      aria-label="Filteri proizvoda"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-primary size-4" />
          <h2 className="text-sm font-bold tracking-widest uppercase">Filteri</h2>
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase transition-colors"
          >
            Očisti ({activeCount})
          </button>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-muted-foreground/60 text-[10px] font-bold tracking-[0.2em] uppercase">
          Traži
        </h3>
        <div className="relative">
          <Search
            className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Model, SKU..."
            aria-label="Traži u kategoriji"
            className="border-border/50 focus-visible:ring-primary/20 h-10 rounded-sm pl-10 text-sm"
          />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-muted-foreground/60 text-[10px] font-bold tracking-[0.2em] uppercase">
          Cijena (€)
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="min-price"
              className="text-muted-foreground text-[9px] font-bold uppercase"
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
              className="border-border/50 focus-visible:ring-primary/20 h-10 rounded-sm text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="max-price"
              className="text-muted-foreground text-[9px] font-bold uppercase"
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
              className="border-border/50 focus-visible:ring-primary/20 h-10 rounded-sm text-xs"
            />
          </div>
        </div>
      </div>

      <fieldset className="space-y-5">
        <legend className="text-muted-foreground/60 text-[10px] font-bold tracking-[0.2em] uppercase">
          Dostupnost
        </legend>
        <div className="space-y-3">
          {STATUSES.map((status) => (
            <div key={status.id} className="group flex items-center gap-3">
              <Checkbox
                id={`status-${status.id}`}
                checked={filters.statuses.includes(status.id)}
                onCheckedChange={() =>
                  onChange({ statuses: toggleValue(filters.statuses, status.id) })
                }
                className="size-4.5"
              />
              <Label
                htmlFor={`status-${status.id}`}
                className="group-hover:text-primary cursor-pointer text-[13px] leading-none font-medium transition-colors"
              >
                {status.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-muted-foreground/60 text-[10px] font-bold tracking-[0.2em] uppercase">
          Proizvođač
        </legend>
        <div className="scrollbar-thin scrollbar-thumb-border max-h-64 space-y-3 overflow-y-auto pr-2">
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
                  className="group-hover:text-primary cursor-pointer text-[13px] leading-none font-medium transition-colors"
                >
                  {brand}
                </Label>
              </div>
              <span className="text-muted-foreground/40 group-hover:text-primary/40 text-[10px] font-bold transition-colors">
                ({brandCounts[brand] ?? 0})
              </span>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="border-primary/10 bg-primary/5 rounded-sm border p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="regulated-only"
            checked={filters.regulatedOnly}
            onCheckedChange={(checked) => onChange({ regulatedOnly: checked === true })}
            className="mt-0.5 size-4.5"
          />
          <div className="space-y-2">
            <p className="text-primary text-[10px] font-black tracking-widest uppercase">
              <ShieldAlert className="mr-1.5 inline size-3.5 align-text-bottom" />
              Regulirani artikli
            </p>
            <Label
              htmlFor="regulated-only"
              className="text-muted-foreground/70 block cursor-pointer text-[11px] leading-relaxed font-medium"
            >
              Prikaži samo artikle koji zahtijevaju dokumentaciju ({regulatedCount}).
            </Label>
          </div>
        </div>
      </div>
    </aside>
  )
}
