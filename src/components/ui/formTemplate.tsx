"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  text?: string;
  children: React.ReactNode;
}

const Form_template = ({ text = "object", children }: Props) => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".width-line", {
      flexGrow: 1,
      flexBasis: "0%",
      duration: 3,
      ease: "power3.out",
    }).to(
      ".height-line",
      {
        height: 600,
        duration: 1,
        ease: "power3.out",
      },
      "-=2.5",
    );

    gsap.to(".header", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  });

  return (
    <div className="relative bg-dark-spruce w-full h-screen font-museo overflow-hidden">
      <div className="flex w-full h-10 px-10 mt-15 items-center justify-center">
        <div className="width-line   h-1 bg-forest-moss rounded-full flex items-center">
          <div className="h-4 w-4 bg-forest-moss rounded-full absolute"></div>
        </div>
        <h1 className="header text-5xl text-forest-moss mx-15 text-nowrap opacity-0 -translate-y-10">
          {text}
        </h1>
        <div className="width-line   h-1 bg-forest-moss rounded-full flex items-center shrink-0">
          <div className="h-4 w-4 bg-forest-moss rounded-full ml-auto "></div>
        </div>
      </div>
      <div className="w-full h-screen absolute  top-0 py-10 px-25 flex">
        <div className="height-line flex w-1 h-1 bg-forest-moss rounded-full justify-center">
          <div className="h-4 w-4 bg-forest-moss rounded-full absolute"></div>
        </div>
        <div className="flex w-full shrink h-100 mx-10 mt-20">{children}</div>
        <div className="height-line flex w-1 h-1 bg-forest-moss rounded-full justify-center">
          <div className="h-4 w-4 bg-forest-moss rounded-full absolute"></div>
        </div>
      </div>
    </div>
  );
};

export default Form_template;
