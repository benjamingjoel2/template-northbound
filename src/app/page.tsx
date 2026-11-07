import { Footer } from "@/components/Footer";
import { GiantHero } from "@/components/GiantHero";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { Journeys } from "@/components/Journeys";
import { Lodges } from "@/components/Lodges";
import { Seasons } from "@/components/Seasons";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <GiantHero />
        <Intro />
        <Seasons />
        <Journeys />
        <Lodges />
      </main>
      <Footer />
    </>
  );
}
