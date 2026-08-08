"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import HoverButton from "@/src/components/ui/button";
import gsap from "gsap";
import { Normal_input, Num_input } from "@/src/components/ui/form/inputs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DetailReservation = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(11);
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const text = "! Limit Gustes is 12 ,at least 1 adults.";
  const [erorr, setError] = useState("");
  const router = useRouter();

  console.debug(erorr);

  useEffect(() => {
    const verifiedEmail = sessionStorage.getItem("verifiedEmail");

    if (verifiedEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(verifiedEmail);
    }

    console.log(email);
  }, [email]);

  useEffect(() => {
    const errEl = document.getElementsByClassName("error-text");
    if (!errEl) return;

    const tl = gsap.timeline();
    tl.to(".error-text", {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.07,
    });
  }, []);

  const save_details = async () => {
    try {
      setError("");

      if (!email) {
        setError("Verified email not found");
        return;
      }

      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }

      if (adults < 1) {
        setError("At least 1 adult is required");
        return;
      }

      if (adults + child > 12) {
        setError("Maximum 12 guests are allowed");
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
                  />
                }
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {
              <HoverButton
                text="Let's go"
                onClick={save_details}
                BclassName="text-4xl border-2 w-[50%] mt-15 ml-15 h-22 rounded-full border-forest-moss"
                TclassName="button-text-email text-5xl text-forest-moss font-bold"
                scaleNum={35}
                bgClass="bg-sega-green"
              />
            }
            <div className="flex w-[50%] justify-center items-center mt-12">
              {text.split("").map((word, i) => (
                <p
                  key={`error-text-${i}`}
                  className={`error-text ${word === " " ? "ml-2" : ""} blur-md translate-y-5 opacity-0 cursor-default`}>
                  {word}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Form_template>
    </div>
  );
};

export default DetailReservation;
