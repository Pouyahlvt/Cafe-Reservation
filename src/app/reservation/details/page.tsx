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
        setError("Verified email not found !");
        return;
      }

      if (!name.trim()) {
        setError("Please enter your name !");
        return;
      }

      if (adults < 1) {
        setError("At least 1 adult is required !");
        return;
      }

      if (adults + child > 12) {
        setError("Maximum 12 guests are allowed !");
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
        throw new Error(data.error);
      }

      console.log("Reservation details saved:", data);

      // Next step
      // router.push("/reservation/table");
      router.push("/reservation/time");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen bg-dark-spruce font-museo text-forest-moss">
      <Form_template text="Fill parts">
        <div className="w-full mx-auto h-[80%] justify-center mt-20">
          <div className="flex">
            <div className="w-[60%] px-15">
              <p className="text-2xl mb-5 ml-2">What we should call you ?</p>
              {
                <Normal_input
                  placeHolder="Enter your name "
                  name={name}
                  setName={setName}
                />
              }
            </div>
            <div className="w-[40%] flex justify-center gap-20">
              <div className="">
                <p className="text-center text-2xl">People</p>
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
              <div>
                <p className="text-center text-2xl">Under 8</p>
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
          <div className="flex items-center ">
            {
              <HoverButton
                text={step === "adding" ? ". . ." : "Let's go"}
                onClick={save_details}
                BclassName="text-4xl border-2 w-[50%] mt-15 ml-15 h-22 rounded-full border-forest-moss"
                TclassName={`button-text-email text-5xl text-forest-moss font-bold ${step === "adding" ? "animate-bounce " : ""}`}
                scaleNum={35}
                bgClass="bg-sega-green"
              />
            }
            <div className="w-[40%] ml-auto h-20 mt-15 items-center justify-center text-2xl text-forest-moss font-semibold flex">
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
