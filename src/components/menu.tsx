"use client";

import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Menu_tems_type = {
  [category: string]: {
    [item: string]: string[];
  };
};

const Menu = () => {
  const menu_section = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<string>("");
  const menu_items: Menu_tems_type = {
    "hot-ssdrinks": {
      late: ["espresso", "milk"],
      capochino: ["espresso", "milk", "fome milk"],
    },
    "cold-drinks": {
      "ice-late": ["espresso", "milk", "ice"],
      "ice-tea": ["irainian tea", "ice"],
    },
    shakes: { "nutella-shake": ["milk", "nutella", "banana", "cream"] },
    breakfast: {
      egg: ["just egg idiot !"],
      omlet: ["eggs", "tomato", "onion", "papper", "salt"],
    },
    food: {
      pasta: ["pasta", "parmesan", "chiken", "milk", "cream"],
      burger: ["bread", "red meat", "cheese", "Lettuce", "onion", "tomato"],
    },
  };

  useGSAP(() => {
    if (!menu_section.current) return;

    const section = menu_section.current;

    gsap.to(section, {
      borderRadius: 0,
      duration: 0.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.to(".menu-header", {
      fontSize: "4rem",
      duration: 0.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top 33%",
        toggleActions: "play reverse play reverse",
      },
    });

    Object.entries(menu_items).forEach(([category, items]) => {
      gsap.to(`.menu-${category}`, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.menu-${category}`,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(`.${category}-div`, {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "0%",
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.menu-${category}`,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });

      Object.keys(items).forEach((item) => {
        gsap.to(`.${item}-text`, {
          opacity: 100,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${item}-text`,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        });

        gsap.to(`.${item}-line`, {
          width: "90%",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${item}-text`,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    });
  });
  return (
    <section
      ref={menu_section}
      className="menu w-full min-h-screen bg-dark-spruce rounded-t-4xl pb-20 border-b-2 border-forest-moss">
      <h1
        className="menu-header w-full h-20 justify-center text-[10rem] tracking-tighter 
                   text-forest-moss text-center font-black font-museo flex top-0 select-none cursor-default">
        Menu
      </h1>
      <div className="shrink-0 mx-7 mt-30 min-h-screen ">
        {Object.entries(menu_items).map(([category, items]) => (
          <div key={category}>
            <div className="flex w-full items-center justify-center my-6">
              <div
                className={`${category}-div mr-auto h-2 bg-forest-moss rounded-full `}></div>
              {/* <div className="w-3 h-3 rounded-full bg-forest-moss -ml-2 mr-auto"></div> */}
              <h2
                className={`menu-${category} text-6xl mx-6 font-museo opacity-0 translate-y-5 text-forest-moss 
                font-bold select-none cursor-default`}>
                {category}
              </h2>
              {/* <div className="w-3 h-3 rounded-full bg-forest-moss -mr-2 ml-auto"></div> */}
              <div
                className={`${category}-div menu-cat-div ml-auto  h-2 bg-forest-moss rounded-full`}></div>
            </div>
            <div className="grid grid-cols-1 py-5">
              {Object.entries(items).map(([item, ingredient]) => (
                <div key={item}>
                  <div className="flex py-10 items-center">
                    <h3
                      onClick={() => setShow(item)}
                      className={`${item}-text ml-25 text-4xl font-bold font-museo text-forest-moss cursor-pointer 
                                opacity-0 -translate-x-10`}>
                      {item}
                    </h3>
                    <div className="flex ml-10">
                      {ingredient.map((ing, i) => (
                        <div
                          key={`ing-${i}`}
                          className={`${show === item ? " ml-4 transalte-x-0" : "-translate-x-10 opacity-0"}  
                                    text-2xl text-dusty-olive
                          transition-all duration-500 ease-in-out `}>
                          <span className="mr-2">|</span> {ing}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`${item}-line w-0 h-1 bg-forest-moss rounded-full mx-auto`}></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
