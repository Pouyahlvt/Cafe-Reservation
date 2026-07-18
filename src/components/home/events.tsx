"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Event_page from "../ui/events_page";

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;

      if (!section || !wrapper) return;

      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: true,
          end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div ref={wrapperRef} className="flex w-max">
        <div className="panel shrink-0   w-screen h-screen bg-dusty-olive">
          {<Event_page />}
        </div>
        <div className="panel shrink-0   w-screen  h-screen bg-olive-400">
          {<Event_page />}
        </div>
        <div className="panel shrink-0   w-screen  h-screen bg-blue-300">
          {<Event_page />}
        </div>
        <div className="panel shrink-0   w-screen  h-screen bg-cyan-400">
          {<Event_page />}
        </div>
      </div>
    </section>
  );
};

export default Events;
