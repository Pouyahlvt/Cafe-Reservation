"use client";

import Intro_section from "../components/home/intro";
import Menu from "../components/home/menu";
import Events from "../components/home/events";
import Footer from "../components/home/footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-olive-700 ">
      <section className="fixed top-0 w-full">{<Intro_section />}</section>
      <section className="absolute top-full w-full z-20 h-screen bg-transparent">
        {<Menu />}
        {<Events />}
        {<Footer />}
      </section>
    </div>
  );
}
