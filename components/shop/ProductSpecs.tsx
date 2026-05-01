interface ProductSpecsProps {
  specs: { label: string; value: string }[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-accent h-[2px] w-8" />
        <h3 className="text-label text-foreground">
          Tehnička Dokumentacija
        </h3>
      </div>
      
      <div className="tactile-border bg-background overflow-hidden rounded-sm">
        <table className="w-full text-left text-xs">
          <tbody className="divide-black/5 divide-y">
            {specs.map((spec) => (
              <tr key={spec.label} className="group hover:bg-secondary/5 transition-colors">
                <th
                  scope="row"
                  className="text-muted-foreground/50 border-black/5 w-1/3 border-r px-6 py-5 align-top text-[9px] font-black tracking-widest uppercase md:w-1/4"
                >
                  {spec.label}
                </th>
                <td className="text-foreground px-6 py-5 align-top font-black tracking-tight md:text-sm">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-muted-foreground/40 text-[9px] font-medium leading-relaxed italic">
        * Pridržavamo pravo na izmjene tehničkih specifikacija od strane proizvođača bez prethodne najave.
      </p>
    </div>
  )
}
