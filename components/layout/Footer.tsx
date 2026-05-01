import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Map, Globe, Mail, Send, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerColumns = [
  {
    title: "Katalog",
    links: [
      { label: "Oružje", href: "/kategorija/oruzje" },
      { label: "Streljivo", href: "/kategorija/streljivo" },
      { label: "Optika", href: "/kategorija/optike" },
      { label: "Odjeća", href: "/kategorija/odjeca-i-obuca" },
      { label: "Akcija", href: "/kategorija/akcija" },
    ],
  },
  {
    title: "Podrška",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "O nama", href: "/o-nama" },
      { label: "Dostava i preuzimanje", href: "/legal#dostava" },
      { label: "Načini plaćanja", href: "/legal#placanje" },
    ],
  },
  {
    title: "Pravne informacije",
    links: [
      { label: "Uvjeti kupnje", href: "/opci-uvjeti" },
      { label: "Privatnost", href: "/privatnost" },
      { label: "Zakonske napomene", href: "/legal" },
      { label: "Impressum", href: "/legal#impressum" },
    ],
  },
]

const contactLinks = [
  { label: "Karta", href: "/kontakt", icon: Map },
  { label: "Web upit", href: "/kontakt", icon: Globe },
  { label: "Email", href: "mailto:info@terralov.hr", icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="border-b border-background/10 py-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-xl space-y-4 text-center lg:text-left">
              <h3 className="text-3xl font-bold tracking-tight">Obavijesti iz trgovine</h3>
              <p className="font-medium text-background/60">
                Primajte informacije o dostupnosti, novim artiklima i odgovornoj kupnji opreme.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                name="email"
                aria-label="Email adresa za newsletter"
                placeholder="Vaša email adresa"
                className="h-14 rounded-sm border-background/20 bg-background/5 text-background focus-visible:ring-primary"
              />
              <Button size="lg" className="h-14 px-8 font-bold uppercase tracking-widest" type="submit">
                Prijavi se <Send className="ml-2 size-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </Container>
      </div>

      <div className="border-b border-background/10 py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-8 lg:col-span-4">
              <Link href="/" className="flex flex-col group">
                <span className="text-3xl font-bold tracking-tighter uppercase leading-none">
                  Terra<span className="text-primary italic">Lov</span>
                </span>
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary -mt-0.5">
                  Odgovorna oprema
                </span>
              </Link>
              <p className="max-w-xs text-sm font-medium leading-relaxed text-background/50">
                Specijalizirana trgovina za lovačku, sportsku i outdoor opremu. Kupnja reguliranih artikala provodi se isključivo uz provjeru propisane dokumentacije.
              </p>
              <div className="flex gap-4">
                {contactLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-sm border border-background/10 transition-all hover:border-primary hover:bg-primary"
                  >
                    <Icon className="size-5 opacity-60" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-6 lg:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-medium text-background/60 transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-6 lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Kontakt info</h4>
              <div className="space-y-4 text-sm font-medium text-background/60">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  Ulica Zelene Doline 42, <br />10000 Zagreb
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  +385 1 234 5678
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  info@terralov.hr
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-background/5 bg-black/20 py-12">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              {["Visa", "Mastercard", "Maestro", "PayPal", "DPD", "GLS"].map((label) => (
                <span key={label} className="text-xl font-black uppercase italic">
                  {label}
                </span>
              ))}
            </div>
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-background/40 md:text-right">
              Sigurna obrada podataka i provjera uvjeta kupnje prije isporuke.
            </p>
          </div>
        </Container>
      </div>

      <div className="py-8">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-[11px] font-medium text-background/30 md:text-left">
              © {new Date().getFullYear()} TerraLov d.o.o. Sva prava pridržana.
            </p>
            <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-background/40">
              <Link href="/privatnost" className="hover:text-primary">GDPR</Link>
              <Link href="/legal" className="hover:text-primary">Hrvatska</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
