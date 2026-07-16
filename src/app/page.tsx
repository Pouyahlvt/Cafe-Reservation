"use client";

import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import HoverButton from "../components/ui/button";

export default function Home() {
  const texts: string[] = [
    "Cafe Reservation",
    "New York, centeral park , street 21 cafe royal.",
  ];
  const header: string[] = [...texts[0]];
  const locateText: string[] = [...texts[1]];

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".cafe-header", {
      opacity: 1,
      x: 0,
      scaleY: "250%",
      duration: 0.4,
      ease: "power3.out",
      stagger: 0.05,
    })
      .to(".reservation-button", {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      .to(
        ".reserved-button",
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "<",
      )
      .to(".address-text", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.2,
        ease: "power3.out",
        stagger: 0.05,
      });
  });
  return (
    <div className="w-full min-h-screen bg-olive-700 ">
      <div className="flex ml-10 mt-25">
        {header.map((word, i) => (
          <p
            key={`word-${i}`}
            className={`cafe-header text-8xl font-black scale-y-200 text-olive-400 
          ${word === " " ? "ml-5" : ""} opacity-0 -translate-x-50`}>
            {word}
          </p>
        ))}
      </div>
      <div className="flex justify-center mt-60 gap-7">
        <HoverButton
          text="Reservation"
          TclassName=" text-2xl"
          BclassName="reservation-button border border-white/30 rounded-full w-65 py-5 text-olive-400
          opacity-0 -translate-x-70"
        />
        <HoverButton
          text="Reserved"
          TclassName=" text-2xl"
          BclassName="reserved-button border border-white/30 rounded-full w-65 py-5 text-olive-400
          opacity-0 translate-x-70"
        />
      </div>
      <div className="w-full flex justify-center mt-10 text-olive-400/70">
        {
          <MapPin className="address-text mr-2 blur-xs translate-y-5 opacity-0" />
        }
        {locateText.map((word, i) => (
          <p
            key={`word-${i}`}
            className={` text-olive-400/70 address-text
          ${word === " " ? "ml-1" : ""} blur-xs translate-y-5 opacity-0`}>
            {word}
          </p>
        ))}
      </div>
    </div>
  );
}
