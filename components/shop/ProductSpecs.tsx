interface ProductSpecsProps {
  specs: { label: string; value: string }[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
        Tehničke specifikacije
      </h3>
      <div className="border-border/50 bg-background overflow-hidden rounded-sm border">
        <table className="w-full text-left text-sm">
          <tbody className="divide-border/50 divide-y">
            {specs.map((spec) => (
              <tr key={spec.label} className="group hover:bg-muted/20 transition-colors">
                <th
                  scope="row"
                  className="text-muted-foreground border-border/50 w-2/5 border-r px-4 py-3.5 align-top text-[11px] font-bold tracking-widest uppercase"
                >
                  {spec.label}
                </th>
                <td className="text-foreground px-4 py-3.5 align-top font-semibold">
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
