
import { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

const Index = () => {
  useEffect(() => {
    const handleImageLoad = () => {
      document.querySelectorAll(".blur-load").forEach((div) => {
        const img = div.querySelector("img");
        
        function loaded() {
          div.classList.add("loaded");
        }
        
        if (img?.complete) {
          loaded();
        } else {
          img?.addEventListener("load", loaded);
        }
      });
    };
    
    handleImageLoad();
    window.addEventListener("load", handleImageLoad);
    
    return () => {
      window.removeEventListener("load", handleImageLoad);
    };
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <FeaturedCourses />
      <Features />
      <Testimonials />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
