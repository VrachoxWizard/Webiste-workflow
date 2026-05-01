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
      <div className="border-background/10 border-b py-14">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-md space-y-3 text-center lg:text-left">
              <p className="text-primary text-[10px] font-bold tracking-widest uppercase">
                Obavijesti iz trgovine
              </p>
              <h3 className="text-2xl font-bold tracking-tight">Budite informirani</h3>
              <p className="text-background/50 text-sm font-medium">
                Primajte informacije o dostupnosti, novim artiklima i odgovornoj kupnji opreme.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                name="email"
                aria-label="Email adresa za newsletter"
                placeholder="Vaša email adresa"
                className="border-background/15 bg-background/8 text-background placeholder:text-background/40 focus-visible:ring-primary h-12 rounded-sm"
              />
              <Button
                size="lg"
                className="h-12 shrink-0 px-6 font-bold tracking-widest uppercase"
                type="submit"
              >
                Prijavi se <Send className="ml-2 size-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </Container>
      </div>

      <div className="border-background/10 border-b py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-8 lg:col-span-4">
              <Link href="/" className="group flex flex-col">
                <span className="text-3xl leading-none font-bold tracking-tighter uppercase">
                  Terra<span className="text-primary italic">Lov</span>
                </span>
                <span className="text-primary -mt-0.5 text-[11px] font-bold tracking-[0.3em] uppercase">
                  Odgovorna oprema
                </span>
              </Link>
              <p className="text-background/50 max-w-xs text-sm leading-relaxed font-medium">
                Specijalizirana trgovina za lovačku, sportsku i outdoor opremu. Kupnja reguliranih
                artikala provodi se isključivo uz provjeru propisane dokumentacije.
              </p>
              <div className="flex gap-4">
                {contactLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="border-background/10 hover:border-primary hover:bg-primary flex size-10 items-center justify-center rounded-sm border transition-all"
                  >
                    <Icon className="size-5 opacity-60" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-6 lg:col-span-2">
                <h4 className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-background/60 hover:text-primary text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-6 lg:col-span-2">
              <h4 className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                Kontakt info
              </h4>
              <div className="text-background/60 space-y-4 text-sm font-medium">
                <p className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  Ulica Zelene Doline 42, <br />
                  10000 Zagreb
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="text-primary size-4 shrink-0" aria-hidden="true" />
                  +385 1 234 5678
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="text-primary size-4 shrink-0" aria-hidden="true" />
                  info@terralov.hr
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-background/5 border-b bg-black/20 py-8">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-wrap justify-center gap-2">
              {["Visa", "Mastercard", "Maestro", "PayPal", "DPD", "GLS"].map((label) => (
                <span
                  key={label}
                  className="border-background/10 bg-background/5 text-background/40 rounded-sm border px-3 py-1 text-[11px] font-bold tracking-widest uppercase"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="text-background/30 text-center text-[10px] font-medium tracking-widest uppercase md:text-right">
              Sigurna obrada podataka i provjera uvjeta kupnje.
            </p>
          </div>
        </Container>
      </div>

      <div className="py-6">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-background/30 text-center text-[10px] font-medium md:text-left">
              © {new Date().getFullYear()} TerraLov d.o.o. - Sva prava pridržana. Odgovorna kupnja
              opreme u skladu s hrvatskim zakonodavstvom.
            </p>
            <div className="text-background/30 flex gap-6 text-[10px] font-bold tracking-widest uppercase">
              <Link href="/privatnost" className="hover:text-primary transition-colors">
                GDPR
              </Link>
              <Link href="/legal" className="hover:text-primary transition-colors">
                Pravne napomene
              </Link>
              <Link href="/opci-uvjeti" className="hover:text-primary transition-colors">
                Uvjeti
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
