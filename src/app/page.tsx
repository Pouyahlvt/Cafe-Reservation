"use client";

import Intro_section from "../components/home/intro";
import Menu from "../components/menu";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-olive-700 ">
      <div className="fixed top-0 w-full">{<Intro_section />}</div>
      <div className="absolute top-full w-full z-20 h-screen bg-transparent">
        {<Menu />}
      </div>
    </div>
  );
}
