"use client";

import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import HoverButton from "../ui/button";
import Image from "next/image";
import Link from "next/link";

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
      duration: 1,
      ease: "elastic.out(1,0.4)",
      stagger: 0.05,
    })
      .to(
        ".reservation-button",
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "elastic.out(0.5,0.5)",
        },
        "-=0.8",
      )
      .to(
        ".reserved-button",
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "elastic.out(0.5,0.5)",
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
        "-=3  ",
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
        src="/greenwall.png"
        alt={"background"}
        fill
        style={{ objectFit: "cover" }}
        className="select-none"
        draggable={false}
      />
      <div className="door-sec absolute right-20 bottom-0  overflow-hidden">
        <div className="w-4 h-4 rounded-full  absolute z-1 inset-0 ml-9 my-77 cursor-grab"></div>
        <Image
          src="/door.png"
          alt="door"
          width={280}
          height={500}
          draggable={false}
          className="door opacity-0 translate-y-50 select-none"
          priority
        />
      </div>
      <div className="flex ml-10 mt-25">
        {header.map((word, i) => (
          <p
            key={`word-${i}`}
            className={`cafe-header text-8xl font-black scale-y-200 text-dark-spruce blur-xs
          ${word === " " ? "ml-5" : ""} opacity-0  select-none cursor-default font-museo max-lg:text-6xl`}>
            {word}
          </p>
        ))}
      </div>
      <div className="flex justify-center mt-60 gap-7">
        <Link href={"/reservation/verify"}>
          <HoverButton
            text="Reservation"
            arrow={true}
            bgClass="bg-dark-spruce"
            TclassName=" text-2xl font-black font-museo"
            BclassName="reservation-button border border-forest-moss/50 rounded-full w-75 py-4 text-forest-moss
          opacity-0 -translate-x-70 backdrop-blur-xs bg-dark-spruce/40 shadow-2xl/50"
          />
        </Link>
        <Link href="/reservation">
          <HoverButton
            text="Reserved"
            arrow={true}
            bgClass="bg-dark-spruce"
            TclassName=" text-2xl font-black font-museo"
            BclassName="reserved-button border border-forest-moss/50 rounded-full w-75 py-4 text-forest-moss
          opacity-0 translate-x-70 backdrop-blur-xs bg-dark-spruce/40 shadow-2xl/50"
          />
        </Link>
      </div>
      <div className="w-full flex justify-center mt-10 text-dark-spruce font-museo">
        {
          <MapPin className="address-text mr-2 blur-xs translate-y-5 opacity-0 " />
        }
        {locateText.map((word, i) => (
          <p
            key={`word-${i}`}
            className={`text-xl address-text
          ${word === " " ? "ml-1" : ""} blur-xs translate-y-5 opacity-0`}>
            {word}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Intro_section;
