import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, ShieldAlert } from "lucide-react"
import { ProductFilters } from "@/types/filters"
import { cn } from "@/lib/utils"

const STATUSES = [
  { id: "in_stock", label: "Dostupno odmah" },
  { id: "on_order", label: "Po narudžbi" },
  { id: "sale", label: "Na akciji" },
  { id: "new", label: "Novo u ponudi" },
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
      className="sticky top-32 hidden h-fit w-72 shrink-0 flex-col gap-12 lg:flex"
      aria-label="Filteri proizvoda"
    >
      <div className="flex items-center justify-between border-b border-black/5 pb-6">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="text-accent size-4" />
          <h2 className="text-sm font-black tracking-widest uppercase">Konfiguracija</h2>
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-accent hover:text-foreground text-[9px] font-black tracking-widest uppercase transition-all underline underline-offset-4"
          >
            Resetiraj ({activeCount})
          </button>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-label">Pretraga Modela</h3>
        <div className="relative group">
          <Search
            className="text-muted-foreground/40 absolute top-1/2 left-4 size-4 -translate-y-1/2 transition-colors group-focus-within:text-accent"
            aria-hidden="true"
          />
          <Input
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Npr. Swarovski Z8i..."
            aria-label="Traži u kategoriji"
            className="tactile-border focus-visible:ring-accent/20 h-12 rounded-sm pl-11 text-xs font-medium placeholder:text-muted-foreground/30"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-label">Cjenovni Razred (€)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="min-price"
              className="text-muted-foreground text-[9px] font-black uppercase tracking-widest"
            >
              Minimalno
            </Label>
            <Input
              id="min-price"
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(event) => onChange({ minPrice: event.target.value })}
              placeholder="0"
              className="tactile-border focus-visible:ring-accent/20 h-12 rounded-sm text-xs font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="max-price"
              className="text-muted-foreground text-[9px] font-black uppercase tracking-widest"
            >
              Maksimalno
            </Label>
            <Input
              id="max-price"
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(event) => onChange({ maxPrice: event.target.value })}
              placeholder="5000"
              className="tactile-border focus-visible:ring-accent/20 h-12 rounded-sm text-xs font-bold"
            />
          </div>
        </div>
      </div>

      <fieldset className="space-y-6">
        <legend className="text-label mb-4">Dostupnost Artikla</legend>
        <div className="space-y-4">
          {STATUSES.map((status) => (
            <div key={status.id} className="group flex items-center gap-4">
              <Checkbox
                id={`status-${status.id}`}
                checked={filters.statuses.includes(status.id)}
                onCheckedChange={() =>
                  onChange({ statuses: toggleValue(filters.statuses, status.id) })
                }
                className="size-5 border-black/10 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label
                htmlFor={`status-${status.id}`}
                className="group-hover:text-accent cursor-pointer text-xs font-bold tracking-tight transition-colors"
              >
                {status.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-label mb-4">Proizvođač</legend>
        <div className="scrollbar-thin scrollbar-thumb-accent/20 max-h-72 space-y-4 overflow-y-auto pr-4">
          {brands.map((brand) => (
            <div key={brand} className="group flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => onChange({ brands: toggleValue(filters.brands, brand) })}
                  className="size-5 border-black/10 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="group-hover:text-accent cursor-pointer text-xs font-bold tracking-tight transition-colors"
                >
                  {brand}
                </Label>
              </div>
              <span className="text-muted-foreground/30 group-hover:text-accent/40 text-[9px] font-black transition-colors">
                {brandCounts[brand] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="surface-glass border-accent/20 rounded-sm border p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            id="regulated-only"
            checked={filters.regulatedOnly}
            onCheckedChange={(checked) => onChange({ regulatedOnly: checked === true })}
            className="mt-1 size-5 border-accent/20 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <div className="space-y-2">
            <p className="text-accent text-[9px] font-black tracking-widest uppercase flex items-center gap-2">
              <ShieldAlert className="size-3.5" />
              Regulirani Artikli
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
