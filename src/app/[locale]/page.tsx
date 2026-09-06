import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import OperationalGap from "@/components/OperationalGap";
import ApproachSection from "@/components/ApproachSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import CaseStudy from "@/components/CaseStudy";
import HowItWorks from "@/components/HowItWorks";
import IndustriesSection from "@/components/IndustriesSection";
import IntegrationSection from "@/components/IntegrationSection";
import WhyNexgen from "@/components/WhyNexgen";
import SecondaryServices from "@/components/SecondaryServices";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import ScrollDepth from "@/components/ScrollDepth";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const d = getDictionary(locale);

  return (
    <>
      <SiteNav d={d.nav} locale={locale} />
      <main>
        <Hero d={d.hero} console={d.console} flowRail={d.flowRail} />
        <TrustBar d={d.trust} />
        <ProblemSection d={d.problem} />
        <OperationalGap d={d.gap} />
        <ApproachSection d={d.approach} />
        <CapabilitiesSection d={d.capabilities} />
        <CaseStudy d={d.caseStudy} />
        <HowItWorks d={d.how} />
        <IndustriesSection d={d.industries} />
        <IntegrationSection d={d.integration} />
        <WhyNexgen d={d.why} />
        <SecondaryServices d={d.digital} />
        <ContactSection d={d.contact} />
      </main>
      <Footer d={d.footer} />
      <MobileCta label={d.nav.cta} />
      <ScrollDepth />
    </>
  );
}
