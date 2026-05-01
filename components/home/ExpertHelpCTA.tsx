import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { MessageSquare, PhoneCall } from "lucide-react"
import Link from "next/link"

export function ExpertHelpCTA() {
  return (
    <Section className="pb-32">
      <Container>
        <div className="relative overflow-hidden bg-primary text-primary-foreground p-10 md:p-16 rounded-sm shadow-premium">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-balance">
                Trebate stručnu pomoć <br />pri odabiru opreme?
              </h2>
              <p className="text-lg opacity-80 font-medium max-w-xl">
                Naši stručnjaci pomažu odabrati opremu prema terenu, veličini, kompatibilnosti i zakonskim uvjetima kupnje.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="h-16 px-8 w-full sm:w-auto text-base font-bold shadow-2xl group" asChild>
                <Link href="/kontakt">
                  Pošalji upit <MessageSquare className="ml-2 size-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-8 w-full bg-transparent text-primary-foreground sm:w-auto text-base font-bold border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary transition-all group" asChild>
                <Link href="tel:+38512345678">
                  Nazovi nas <PhoneCall className="ml-2 size-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
