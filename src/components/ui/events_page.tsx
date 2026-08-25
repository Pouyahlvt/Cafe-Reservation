"use client";

import { useEffect, useState } from "react";
import HoverButton from "./button";
import Gallery from "./gallery";

interface Props {
  event_name?: string;
  event_text?: string;
  date?: string;
  full?: boolean;
  images?: string[];
}

const Event_page = ({
  event_name = "Events-name",
  event_text = "Event-text should be here",
  date = "00/00/0000",
  full = false,
  images = [
    "/greenwall.png",
    "/greenwall.png",
    "/greenwall.png",
    "/greenwall.png",
    "/greenwall.png",
  ],
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const toDay = new Date();

  useEffect(() => {
    const month = toDay.getUTCMonth() + 1;
    const day = toDay.getUTCDate();
    const year = toDay.getUTCFullYear();
    const avaibaleDay = [1, 2, 3, 4, 5, 6];

    avaibaleDay.forEach((dayAv) => {
      if (`${month}/${day + dayAv}/${year}` === date) {
        setIsActive(true);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex max-lg:grid ">
      <div className="w-[40%] h-full max-lg:h-fit max-lg:w-full ">
        <h2
          className="ml-15 mt-15 text-7xl font-black font-museo text-dark-spruce 
        max-lg:mt-10 max-lg:text-center max-lg:ml-0 max-sm:text-5xl">
          {event_name}
        </h2>
        <p
          className="ml-15 mt-10  text-3xl font-black font-museo text-dark-spruce 
        max-lg:mt-5 max-lg:text-center max-lg:ml-0 max-sm:text-xl max-sm:mt-2">
          {event_text}
        </p>
        <div
          className="absolute bottom-35 ml-15 
        max-lg:static max-lg:mt-5 max-lg:w-full max-lg:flex max-lg:justify-center max-lg:ml-0
        ">
          {!full && isActive && (
            <HoverButton
              text="Events Reservation"
              bgClass="bg-dark-spruce"
              TclassName=" text-2xl font-black font-museo max-sm:text-xl"
              BclassName="border border-forest-moss/50 rounded-full w-90 py-6 text-forest-moss
               backdrop-blur-xs bg-dark-spruce/50 shadow-2xl/50 flex mt-auto max-lg:mx-auto max-sm:w-[80%] max-sm:py-5"
            />
          )}
          {full && !isActive && (
            <p className="text-3xl font-museo font-bold text-dark-spruce max-sm:text-xl">
              {"The event is ended :("}
            </p>
          )}
          {!full && !isActive && (
            <p className="text-3xl font-museo font-bold text-dark-spruce max-sm:text-xl">
              {"The event has not started yet !"}
            </p>
          )}
        </div>
      </div>
      <div className="w-[60%] h-full items-center flex max-lg:grid  max-lg:w-full max-lg:mt-2">
        <p className="absolute top-10 right-20 text-6xl font-museo font-bold text-dark-spruce max-lg:static max-lg:text-4xl max-lg:text-center ">
          {date}
        </p>
        <div className="flex shrink-0 w-full h-[70%] my-auto max-lg:h-100 max-lg:-mt-15">
          {<Gallery images={images} />}
        </div>
      </div>
    </div>
  );
};

export default Event_page;
