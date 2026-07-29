"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  text?: string;
  text_two?: string;
  dependes_two?: boolean;
  children: React.ReactNode;
}

const Form_template = ({
  text = "object",
  text_two,
  dependes_two = false,
  children,
}: Props) => {
  useGSAP(() => {
    if (dependes_two) {
      gsap.to(".header", {
        opacity: 0,
        y: -30,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.to(".header-two", {
        opacity: 1,
        y: -30,
        delay: 0.5,
        duration: 1.2,
        ease: "power3.out",
      });
    }
  }, [dependes_two]);

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
      opacity: 0.8,
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
        <div>
          <h1 className="header text-6xl text-forest-moss mx-15 text-nowrap opacity-0 -translate-y-10 cursor-default">
            {text}
          </h1>
          {text_two && dependes_two && (
            <h1 className="header-two text-6xl text-forest-moss mx-15 text-nowrap opacity-0 translate-y-10 cursor-default">
              {text_two}
            </h1>
          )}
        </div>
        <div className="width-line   h-1 bg-forest-moss rounded-full flex items-center shrink-0">
          <div className="h-4 w-4 bg-forest-moss rounded-full ml-auto "></div>
        </div>
      </div>
      <div className="w-full h-screen absolute  top-0 pt-10 px-25 flex">
        <div className="height-line flex w-1 h-1 bg-forest-moss rounded-full justify-center">
          <div className="h-4 w-4 bg-forest-moss rounded-full absolute"></div>
        </div>
        <div className="flex w-full shrink h-full mx-10 mt-20">{children}</div>
        <div className="height-line flex w-1 h-1 bg-forest-moss rounded-full justify-center">
          <div className="h-4 w-4 bg-forest-moss rounded-full absolute"></div>
        </div>
      </div>
    </div>
  );
};

export default Form_template;
