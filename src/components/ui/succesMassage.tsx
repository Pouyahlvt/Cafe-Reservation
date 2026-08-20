"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CopyIcon, CopyCheckIcon } from "lucide-react";

interface Props {
  success: boolean;
  reservationId: string;
}

const Success_mass = ({ success, reservationId }: Props) => {
  const [copie, setCopie] = useState(false);

  const successDivRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reservationId);
      setCopie(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useGSAP(() => {
    if (!successDivRef.current) return;

    const successDiv = successDivRef.current;

    const tl = gsap.timeline();

    if (success) {
      tl.to(successDiv, {
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, [success]);

  return (
    <div
      ref={successDivRef}
      className="fixed h-screen w-full bg-muted-teal -translate-y-full flex z-50 overflow-hidden text-dark-spruce font-museo ">
      <div className="w-full">
        <p className="success-mass text-center  text-8xl font-extrabold mt-20">
          Success Reservation
        </p>
        <div className="w-full mt-15">
          <p className="text-center text-4xl font-bold tracking-tight">
            Your Reservation Code{" "}
          </p>
          <div className="flex w-full mt-10 justify-center">
            <div className="w-[65%] h-25 bg-dark-spruce rounded-4xl flex items-center">
              <p className="text-dark-spruce bg-muted-teal w-full mr-4  flex items-center px-10 h-18 text-xl ml-4 rounded-2xl">
                {reservationId}
              </p>
              <div
                className="aspect-square h-18 bg-muted-teal rounded-2xl ml-auto mr-4 flex 
                items-center justify-between">
                {
                  <CopyIcon
                    onClick={handleCopy}
                    size={40}
                    className={`mx-auto cursor-pointer ${copie ? "hidden" : ""}`}
                  />
                }
                {
                  <CopyCheckIcon
                    size={40}
                    className={`mx-auto cursor-pointer ${copie ? "" : "hidden"}`}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success_mass;
