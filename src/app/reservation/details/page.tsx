"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import HoverButton from "@/src/components/ui/button";
import gsap from "gsap";
import { Normal_input, Num_input } from "@/src/components/ui/form/inputs";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const DetailReservation = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(11);
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [step, setStep] = useState("");
  const [error, setError] = useState("");
  const errRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  useEffect(() => {
    const verifiedEmail = sessionStorage.getItem("verifiedEmail");

    if (verifiedEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(verifiedEmail);
    }

    console.log(email);
  }, [email]);

  useEffect(() => {
    if (!errRef.current) return;

    const tl = gsap.timeline();

    tl.to(errRef.current, {
      opacity: 0,
      y: 40,
      scale: 0,
      duration: 0.3,
      ease: "power3.out",
    }).to(errRef.current, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "elastic.out",
    });
  }, [error]);

  const save_details = async () => {
    try {
      setError("");
      setStep("adding");

      if (!email) {
        setError("Verified email not found!");
        setStep("");
        return;
      }

      if (!name.trim()) {
        setError("Please enter your name!");
        setStep("");
        return;
      }

      if (adults < 1) {
        setError("At least 1 adult is required!");
        setStep("");
        return;
      }

      if (adults + child > 12) {
        setError("Maximum 12 guests are allowed!");
        setStep("");
        return;
      }

      const res = await fetch("/api/reserve-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          adults,
          children: child,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save reservation details");
      }

      const reservationId = data.reservation.id;

      if (!reservationId) {
        throw new Error("Reservation ID was not returned");
      }

      sessionStorage.setItem("guests", (adults + child).toString());

      sessionStorage.setItem("reservationId", reservationId);

      console.log("RESERVATION CREATED:", reservationId);

      router.push("/reservation/time");
    } catch (error) {
      setStep("details");

      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen bg-dark-spruce font-museo text-forest-moss">
      <Form_template text="Fill parts">
        <div className="w-full mx-auto h-[80%] justify-center mt-20 max-lg:mt-5 max-sm:mt-0">
          <div className="flex max-lg:grid">
            <div className="w-[60%] px-15 max-lg:w-full max-sm:px-2 ">
              <p className="text-2xl mb-5 ml-2 max-lg:text-center max-lg:mb-2 max-sm:text-lg max-sm:ml-0">
                What we should call you ?
              </p>
              {
                <Normal_input
                  placeHolder="Enter your name "
                  state={name}
                  setState={setName}
                />
              }
            </div>
            <div className="w-[40%] flex justify-center gap-20 max-lg:w-full max-lg:mt-2 max-sm:gap-10 max-sm:mt-5">
              <div className="max-lg:flex max-lg:items-center max-sm:grid">
                <p className="text-center text-2xl max-lg:mr-10 max-sm:mr-0 max-sm:text-lg ">
                  People
                </p>
                {
                  <Num_input
                    range={[1, 12]}
                    limit={limit}
                    setLimit={setLimit}
                    count={adults}
                    setCount={setAdults}
                    setError={setError}
                  />
                }
              </div>
              <div className="max-lg:flex max-lg:items-center max-sm:grid ">
                <p className="text-center text-2xl max-lg:mr-10 text-nowrap max-sm:mr-0 max-sm:text-lg">
                  Under 8
                </p>
                {
                  <Num_input
                    range={[0, 11]}
                    limit={limit}
                    setLimit={setLimit}
                    count={child}
                    setCount={setChild}
                    setError={setError}
                  />
                }
              </div>
            </div>
          </div>
          <div className="flex items-center max-lg:grid">
            {
              <HoverButton
                text={step === "adding" ? ". . ." : "Let's go"}
                onClick={save_details}
                BclassName=" border-2 w-[50%] mt-15 ml-15 h-22 rounded-full border-forest-moss max-lg:h-18 
                max-lg:w-[85%] max-lg:mx-auto max-lg:mt-5 max-sm:mt-15"
                TclassName={`button-text-email text-5xl text-forest-moss font-bold ${step === "adding" ? "animate-bounce " : ""} max-lg:text-4xl`}
                scaleNum={35}
                bgClass="bg-sega-green"
              />
            }
            <div
              className="w-[40%] ml-auto h-20 mt-15 items-center justify-center text-2xl text-forest-moss font-semibold flex
            max-lg:mt-5 max-lg:w-full max-lg:h-fit max-sm:text-lg ">
              <p className="opacity-100 scale-100 translate-y-10" ref={errRef}>
                {`${error.length > 1 ? "Error : " : ""} ${error} `}
              </p>
            </div>
          </div>
        </div>
      </Form_template>
    </div>
  );
};

export default DetailReservation;
