import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { MessageSquare, PhoneCall } from "lucide-react"
import Link from "next/link"

export function ExpertHelpCTA() {
  return (
    <section className="section-padding bg-background">
      <Container>
        <div className="bg-foreground text-background relative overflow-hidden rounded-sm p-12 md:p-24">
          {/* Visual Depth Elements */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "48px 48px",
              }}
            />
          </div>
          <div className="from-accent/20 absolute inset-0 z-0 bg-gradient-to-br to-transparent" />
          
          <div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="space-y-10">
                <div className="bg-accent h-1 w-12" />
                <div className="space-y-6">
                  <h2 className="text-editorial-headline text-background">
                    Trebate stručnu pomoć <br />
                    <span className="text-background/40 font-medium">pri odabiru?</span>
                  </h2>
                  <p className="max-w-xl text-lg font-medium opacity-60 md:text-xl">
                    Naši stručnjaci pomažu odabrati opremu prema terenu, balističkim svojstvima 
                    i zakonskim uvjetima. Obratite nam se s povjerenjem.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-5 lg:items-end xl:col-span-4">
              <Button
                size="lg"
                variant="secondary"
                className="group h-16 w-full px-12 text-xs font-black tracking-[0.2em] uppercase transition-all hover:-translate-y-1 sm:w-auto"
                asChild
              >
                <Link href="/kontakt">
                  Pošalji upit
                  <MessageSquare className="ml-3 size-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-background/20 text-background hover:bg-background hover:text-foreground h-16 w-full bg-transparent px-12 text-xs font-black tracking-[0.2em] uppercase transition-all hover:-translate-y-1 sm:w-auto"
                asChild
              >
                <Link href="tel:+38512345678">
                  Nazovite nas
                  <PhoneCall className="ml-3 size-5 transition-transform group-hover:rotate-12" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
