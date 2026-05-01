interface ProductSpecsProps {
  specs: { label: string; value: string }[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Tehničke specifikacije</h3>
      <div className="border border-border/50 rounded-sm overflow-hidden bg-background">
        <table className="w-full text-sm text-left">
          <tbody className="divide-y divide-border/50">
            {specs.map((spec) => (
              <tr key={spec.label} className="group hover:bg-muted/20 transition-colors">
                <th scope="row" className="px-4 py-3.5 font-bold text-[11px] uppercase tracking-widest text-muted-foreground w-2/5 border-r border-border/50 align-top">
                  {spec.label}
                </th>
                <td className="px-4 py-3.5 font-semibold text-foreground align-top">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
