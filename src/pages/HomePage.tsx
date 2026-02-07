import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MarqueeBanner } from "@/components/marquee-banner"
import { Catalog } from "@/components/catalog"
import { About } from "@/components/about"
import { Delivery } from "@/components/delivery"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <MarqueeBanner />
      <Catalog />
      <About />
      <Delivery />
      <Contact />
      <Footer />
    </main>
  )
}
