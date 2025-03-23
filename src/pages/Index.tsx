
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CtaSection } from "@/components/home/CtaSection";

const Index = () => {
  return (
    <Layout fullWidth showFooter>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
