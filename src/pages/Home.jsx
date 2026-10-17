import React from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import WhatWeDo from "@/components/home/WhatWeDo";
import StatsPreview from "@/components/home/StatsPreview";
import TeamPreview from "@/components/home/TeamPreview";
import TimelinePreview from "@/components/home/TimelinePreview";
import Sponsors from "@/components/home/Sponsors";
import PrintingService from "@/components/home/PrintingService";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn><About /></FadeIn>
      <FadeIn><WhatWeDo /></FadeIn>
      <FadeIn><StatsPreview /></FadeIn>
      <FadeIn><TeamPreview /></FadeIn>
      <FadeIn><TimelinePreview /></FadeIn>
      <FadeIn><Sponsors /></FadeIn>
      <FadeIn><PrintingService /></FadeIn>
    </>
  );
}