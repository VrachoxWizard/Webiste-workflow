import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Target, Users, Award, ShieldAlert } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Editorial Hero */}
      <div className="bg-secondary/10 pt-24 pb-16 md:pt-32 md:pb-24 border-b">
        <Container>
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/20">O nama</Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
                Više od trgovine. <br />
                <span className="text-primary italic font-medium">Stručnost i povjerenje.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 prose prose-sm max-w-none">
              <h2 className="text-3xl font-bold tracking-tight">Naša priča</h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Naša povijest započela je s vizijom o stvaranju mjesta gdje se lovci i 
                ljubitelji prirode mogu osloniti na provjerene informacije i vrhunsku opremu. 
                U svijetu gdje je kvaliteta presudna, mi ne pravimo kompromise. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Specijalizirani smo za zastupanje renomiranih svjetskih brendova koji su 
                sinonim za preciznost i trajnost. Naš tim čine iskusni profesionalci koji 
                razumiju potrebe modernog lova i sportskog streljaštva.
              </p>
            </div>
            <div className="aspect-video bg-muted rounded-sm border shadow-premium overflow-hidden">
               <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/40 italic text-sm p-12 text-center font-medium">
                 [Visual: Store Showcase or Heritage Image]
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Expertise Blocks */}
      <Section className="bg-secondary/20 border-y">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: "Autorizirani zastupnici", desc: "Direktno surađujemo s proizvođačima poput Tikke, Berette i Vortexa." },
              { icon: Target, title: "Stručna selekcija", desc: "Svaki artikl u našoj ponudi testiran je i odobren od strane stručnjaka." },
              { icon: Users, title: "Osobni pristup", desc: "Vjerujemo u direktnu komunikaciju i savjetovanje prije svake kupnje." },
              { icon: Award, title: "Provjerena kvaliteta", desc: "Osiguravamo punu post-prodajnu podršku i tvorničko jamstvo." }
            ].map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="size-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Responsible Commerce Notice */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto p-8 md:p-12 bg-foreground text-background rounded-sm shadow-2xl space-y-8">
            <div className="flex items-center gap-4 text-accent">
              <ShieldAlert className="size-8" />
              <h2 className="text-2xl font-bold uppercase tracking-widest italic">Odgovorno poslovanje</h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg opacity-80 font-medium leading-relaxed">
                Kao specijalizirana trgovina oružjem i streljivom, TerraLov posluje strogo 
                prema zakonima Republike Hrvatske. Naša odgovornost prema sigurnosti i 
                zakonitosti je naša najveća prioritet.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-background/10">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Zakonska provjera</p>
                  <p className="text-sm opacity-60">Sve transakcije koje uključuju regulirane artikle prolaze kroz strogu provjeru dozvola.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Stručno vodstvo</p>
                  <p className="text-sm opacity-60">Kupcima pružamo jasne informacije o zakonskim obvezama i potrebnoj dokumentaciji.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
