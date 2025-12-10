import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { SystemsSection } from "@/components/home/SystemsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SystemsSection />
    </Layout>
  );
};

export default Index;
