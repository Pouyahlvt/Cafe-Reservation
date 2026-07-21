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

  const world_cup = [
    "/world-cup/world-cup-1.jpg",
    "/world-cup/world-cup-2.jpg",
    "/world-cup/world-cup-3.jpg",
    "/world-cup/world-cup-4.jpg",
    "/world-cup/world-cup-5.jpg",
  ];

  const halloween = [
    "/halloween/halloween-1.jpg",
    "/halloween/halloween-2.jpg",
    "/halloween/halloween-3.jpg",
    "/halloween/halloween-4.jpg",
    "/halloween/halloween-5.jpg",
  ];

  const new_year = [
    "/new-year/new-year-1.jpg",
    "/new-year/new-year-2.jpg",
    "/new-year/new-year-3.jpg",
    "/new-year/new-year-4.jpg",
    "/new-year/new-year-5.jpg",
  ];

  const vallentine = [
    "/vallentine/vallentine-1.jpg",
    "/vallentine/vallentine-2.jpg",
    "/vallentine/vallentine-3.jpg",
    "/vallentine/vallentine-4.jpg",
    "/vallentine/vallentine-5.jpg",
  ];

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
        <div className="panel shrink-0   w-screen h-screen bg-sega-green">
          {
            <Event_page
              event_name="World Cup"
              event_text="This is not just a game ."
              date="7/19/2026"
              full={true}
              images={world_cup}
            />
          }
        </div>
        <div className="panel shrink-0   w-screen  h-screen bg-muted-teal">
          {
            <Event_page
              event_name="Halloween"
              event_text="WOOOOOOOO !"
              date="10/31/2026"
              images={halloween}
            />
          }
        </div>
        <div className="panel shrink-0   w-screen  h-screen bg-sega-green">
          {
            <Event_page
              event_name="christmas"
              event_text="Happy new year :)"
              date="1/1/2027"
              images={new_year}
            />
          }
        </div>
        <div className="panel shrink-0   w-screen  h-screen bg-muted-teal">
          {
            <Event_page
              event_name="vallentine"
              event_text="Not for you if you're single >_<"
              date="2/14/2027"
              images={vallentine}
            />
          }
        </div>
      </div>
    </section>
  );
};

export default Events;
