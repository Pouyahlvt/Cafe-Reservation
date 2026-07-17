"use client";

import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import HoverButton from "../ui/button";
import Image from "next/image";
import greenWall from "../../public/greenwall.png";
import door from "../../public/door.png";

const Intro_section = () => {
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
      y: 0,
      filter: "blur(0px)",
      scaleY: "250%",
      duration: 0.4,
      ease: "power3.out",
      stagger: 0.05,
    })
      .to(
        ".reservation-button",
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.8",
      )
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
      })
      .to(
        ".door",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=2  ",
      )
      .to(
        ".door-sec",
        {
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
          duration: 0.5,
          ease: "power3.inOut",
        },
        "<  ",
      );
  });
  return (
    <div className="absolute z-1  w-full h-screen overflow-hidden">
      <Image
        src={greenWall}
        alt={"background"}
        fill
        style={{ objectFit: "cover" }}
        className="select-none"
        draggable={false}
      />
      <div className="door-sec absolute right-20 bottom-0  overflow-hidden">
        <div className="w-4 h-4 rounded-full  absolute z-1 inset-0 ml-9 my-77 cursor-grab"></div>
        <Image
          src={door}
          alt="door"
          width={280}
          draggable={false}
          height={0}
          className="door opacity-0  translate-y-50 select-none "
        />
      </div>
      <div className="flex ml-10 mt-25">
        {header.map((word, i) => (
          <p
            key={`word-${i}`}
            className={`cafe-header text-8xl font-black scale-y-200 text-olive-400 blur-xs
          ${word === " " ? "ml-5" : ""} opacity-0  select-none cursor-default`}>
            {word}
          </p>
        ))}
      </div>
      <div className="flex justify-center mt-60 gap-7">
        <HoverButton
          text="Reservation"
          TclassName=" text-2xl"
          BclassName="reservation-button border border-white/30 rounded-full w-65 py-5 text-olive-400
          opacity-0 -translate-x-70 backdrop-blur-xs"
        />
        <HoverButton
          text="Reserved"
          TclassName=" text-2xl"
          BclassName="reserved-button border border-white/30 rounded-full w-65 py-5 text-olive-400
          opacity-0 translate-x-70 backdrop-blur-xs"
        />
      </div>
      <div className="w-full flex justify-center mt-10 text-olive-400">
        {
          <MapPin className="address-text mr-2 blur-xs translate-y-5 opacity-0" />
        }
        {locateText.map((word, i) => (
          <p
            key={`word-${i}`}
            className={` text-olive-400  address-text
          ${word === " " ? "ml-1" : ""} blur-xs translate-y-5 opacity-0`}>
            {word}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Intro_section;
