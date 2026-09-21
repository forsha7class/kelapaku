import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { SignatureStory } from "@/components/signature-story";
import { Paths } from "@/components/paths";
import { Products } from "@/components/products";
import { PartsMap } from "@/components/parts-map";
import { ProductStory } from "@/components/product-story";
import { ProcessGallery } from "@/components/process-gallery";
import { Why } from "@/components/why";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <SignatureStory />
        <Paths />
        <Products />
        <PartsMap />
        <ProductStory />
        <ProcessGallery />
        <Why />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
