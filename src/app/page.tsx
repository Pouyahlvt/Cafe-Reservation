"use client";

import Intro_section from "../components/home/intro";
import Menu from "../components/home/menu";
import Events from "../components/home/events";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-olive-700 ">
      <section className="fixed top-0 w-full">{<Intro_section />}</section>
      <section className="absolute top-full w-full z-20 h-screen bg-transparent">
        {<Menu />}
        {<Events />}
        <div className="absolute w-full h-screen bg-yellow-400">
          <h1 className="font-museo text-center mt-30 font-black tracking-tighter text-[15rem]">
            Footer
          </h1>
        </div>
      </section>
    </div>
  );
}
