interface ProductSpecsProps {
  specs: { label: string; value: string }[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Tehničke specifikacije</h3>
      <div className="border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {specs.map((spec, idx) => (
              <tr key={spec.label} className={idx % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                <td className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider text-muted-foreground w-1/3 border-r">
                  {spec.label}
                </td>
                <td className="px-4 py-3 font-semibold">
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
