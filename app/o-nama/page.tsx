import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Target, Users, Award, ShieldAlert } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      {/* Editorial Hero */}
      <div className="bg-secondary/10 border-b pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/20">
                O nama
              </Badge>
              <h1 className="text-5xl leading-[1.1] font-bold tracking-tighter md:text-6xl">
                Više od trgovine. <br />
                <span className="text-primary font-medium italic">Stručnost i povjerenje.</span>
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                TerraLov je nastao iz strasti prema prirodi, odgovornoj kupnji i kvalitetnoj opremi.
                Danas smo vodeća destinacija za lovačku i outdoor opremu u Hrvatskoj.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Story Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="prose prose-sm max-w-none space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Naša priča</h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                Naša povijest započela je s vizijom o stvaranju mjesta gdje se lovci i ljubitelji
                prirode mogu osloniti na provjerene informacije i vrhunsku opremu. U svijetu gdje je
                kvaliteta presudna, mi ne pravimo kompromise.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                Specijalizirani smo za zastupanje renomiranih svjetskih brendova koji su sinonim za
                preciznost i trajnost. Naš tim čine iskusni profesionalci koji razumiju potrebe
                modernog lova i sportskog streljaštva.
              </p>
            </div>
            <div className="bg-muted shadow-premium aspect-video overflow-hidden rounded-sm border">
              <div className="bg-primary/5 text-primary/40 flex h-full w-full items-center justify-center p-12 text-center text-sm font-medium italic">
                [Visual: Store Showcase or Heritage Image]
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Expertise Blocks */}
      <Section className="bg-secondary/20 border-y">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Autorizirani zastupnici",
                desc: "Direktno surađujemo s proizvođačima poput Tikke, Berette i Vortexa.",
              },
              {
                icon: Target,
                title: "Stručna selekcija",
                desc: "Svaki artikl u našoj ponudi testiran je i odobren od strane stručnjaka.",
              },
              {
                icon: Users,
                title: "Osobni pristup",
                desc: "Vjerujemo u direktnu komunikaciju i savjetovanje prije svake kupnje.",
              },
              {
                icon: Award,
                title: "Provjerena kvaliteta",
                desc: "Osiguravamo punu post-prodajnu podršku i tvorničko jamstvo.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-sm">
                  <item.icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Responsible Commerce Notice */}
      <Section>
        <Container>
          <div className="bg-foreground text-background mx-auto max-w-4xl space-y-8 rounded-sm p-8 shadow-2xl md:p-12">
            <div className="text-accent flex items-center gap-4">
              <ShieldAlert className="size-8" />
              <h2 className="text-2xl font-bold tracking-widest uppercase italic">
                Odgovorno poslovanje
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed font-medium opacity-80">
                Kao specijalizirana trgovina oružjem i streljivom, TerraLov posluje strogo prema
                zakonima Republike Hrvatske. Naša odgovornost prema sigurnosti i zakonitosti je naša
                najveća prioritet.
              </p>
              <div className="border-background/10 grid grid-cols-1 gap-8 border-t pt-6 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                    Zakonska provjera
                  </p>
                  <p className="text-sm opacity-60">
                    Sve transakcije koje uključuju regulirane artikle prolaze kroz strogu provjeru
                    dozvola.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                    Stručno vodstvo
                  </p>
                  <p className="text-sm opacity-60">
                    Kupcima pružamo jasne informacije o zakonskim obvezama i potrebnoj
                    dokumentaciji.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
