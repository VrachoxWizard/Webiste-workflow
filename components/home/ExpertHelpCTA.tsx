import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { MessageSquare, PhoneCall } from "lucide-react"
import Link from "next/link"

export function ExpertHelpCTA() {
  return (
    <Section className="pb-32">
      <Container>
        <div className="bg-primary text-primary-foreground shadow-premium relative overflow-hidden rounded-sm p-10 md:p-20">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-black/20 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="bg-primary-foreground/30 h-1 w-12" />
              <h2 className="text-4xl leading-tight font-semibold tracking-tight text-balance md:text-6xl">
                Trebate stručnu pomoć <br />
                pri odabiru opreme?
              </h2>
              <p className="max-w-xl text-lg font-medium opacity-80 md:text-xl">
                Naši stručnjaci pomažu odabrati opremu prema terenu, veličini, kompatibilnosti i
                zakonskim uvjetima kupnje. Obratite nam se s povjerenjem.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Button
                size="lg"
                variant="secondary"
                className="group h-16 w-full px-10 text-base font-bold shadow-2xl transition-all hover:-translate-y-1 sm:w-auto"
                asChild
              >
                <Link href="/kontakt">
                  Pošalji upit{" "}
                  <MessageSquare className="ml-2 size-5 transition-transform group-hover:scale-110" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary h-16 w-full bg-transparent px-10 text-base font-bold transition-all sm:w-auto"
                asChild
              >
                <Link href="tel:+38512345678">
                  Nazovi nas{" "}
                  <PhoneCall className="ml-2 size-5 transition-transform group-hover:rotate-12" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
