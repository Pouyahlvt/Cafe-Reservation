"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Form_template from "@/src/components/ui/formTemplate";
import HoverButton from "@/src/components/ui/button";

const Reservation = () => {
  const input_div = useRef<HTMLDivElement>(null);
  const email_input = useRef<HTMLInputElement>(null);
  const timelien = useRef<gsap.core.Timeline | null>(null);
  const [activeInput, setActiveInput] = useState(false);

  useEffect(() => {
    if (!email_input.current) return;

    timelien.current = gsap.timeline({ paused: true });

    timelien.current.to(".example-email", {
      x: 0,
      opacity: 0.6,
      duration: 0.5,
      ease: "power3.out",
    });

    if (!activeInput) {
      setTimeout(() => {
        timelien.current?.play();
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle_not_active = () => {
    setActiveInput(true);
    timelien.current?.play();
  };

  const handle_active = () => {
    setActiveInput(false);
    timelien.current?.reverse();
  };

  useGSAP(() => {
    if (!input_div.current) return;

    const tl = gsap.timeline();

    tl.to(input_div.current, {
      width: "80%",
      duration: 2,
      ease: "power3.out",
    }).to(
      ".button-text-email",
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.5",
    );
  });

  return (
    <Form_template text="Enter Email">
      <div className="w-full h-full">
        <div ref={input_div} className="w-0 backdrop-opacity-0 mt-25 mx-auto">
          <p
            className="example-email absolute -z-10 mt-5 ml-5 text-2xl text-forest-moss opacity-0 translate-x-10
          select-none">
            Example@gmail.com
          </p>
          <input
            ref={email_input}
            onFocus={handle_active}
            onBlur={(e) =>
              e.target.value.length > 0
                ? setActiveInput(false)
                : handle_not_active()
            }
            type="text"
            className="w-full text-2xl text-forest-moss px-5 py-5 rounded-t-2xl mx-auto outline-0"
          />
          <div className="w-full h-1 rounded-full bg-forest-moss  "></div>
          {
            <HoverButton
              text="Vertify Email"
              BclassName="mt-20 border-2 border text-forest-moss w-full h-20 rounded-full"
              TclassName="button-text-email text-3xl text-forest-moss font-bold translate-y-10 opacity-0"
              scaleNum={55}
              bgClass="bg-sega-green"
            />
          }
        </div>
      </div>
    </Form_template>
  );
};

export default Reservation;
