"use client";

import Intro_section from "../components/home/intro";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-olive-700 ">
      <div className="fixed top-0 w-full">{<Intro_section />}</div>
      <div className="absolute top-full w-full z-20 h-screen bg-white rounded-t-4xl"></div>
    </div>
  );
}
