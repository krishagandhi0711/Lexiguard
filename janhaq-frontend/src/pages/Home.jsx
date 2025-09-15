import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import DemoSection from "../components/home/DemoSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
    </div>
  );
}