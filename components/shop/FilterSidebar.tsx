import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { ProductFilters } from "@/types/filters"

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
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-8 lg:flex" aria-label="Filteri proizvoda">
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary/60">Traži u kategoriji</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Model, SKU..."
            aria-label="Traži u kategoriji"
            className="h-10 rounded-sm pl-10 text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary/60">Cijena (€)</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label htmlFor="min-price" className="text-[10px] font-bold uppercase text-muted-foreground">Od</Label>
            <Input
              id="min-price"
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(event) => onChange({ minPrice: event.target.value })}
              placeholder="0"
              className="h-9 rounded-sm text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="max-price" className="text-[10px] font-bold uppercase text-muted-foreground">Do</Label>
            <Input
              id="max-price"
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(event) => onChange({ maxPrice: event.target.value })}
              placeholder="5000"
              className="h-9 rounded-sm text-xs"
            />
          </div>
        </div>
      </div>

      <fieldset className="space-y-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-primary/60">Dostupnost</legend>
        <div className="space-y-2.5">
          {STATUSES.map((status) => (
            <div key={status.id} className="flex items-center gap-2 group">
              <Checkbox
                id={`status-${status.id}`}
                checked={filters.statuses.includes(status.id)}
                onChange={() => onChange({ statuses: toggleValue(filters.statuses, status.id) })}
              />
              <Label htmlFor={`status-${status.id}`} className="text-sm font-medium transition-colors group-hover:text-primary">
                {status.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-primary/60">Proizvođač</legend>
        <div className="space-y-2.5">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2 group">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => onChange({ brands: toggleValue(filters.brands, brand) })}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-medium transition-colors group-hover:text-primary">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <Button type="button" variant="outline" className="rounded-sm" onClick={onReset}>
        Očisti filtere
      </Button>
    </aside>
  )
}
