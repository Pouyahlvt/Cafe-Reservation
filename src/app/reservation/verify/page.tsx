"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Form_template from "@/src/components/ui/form/formTemplate";
import HoverButton from "@/src/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Reservation = () => {
  const input_div = useRef<HTMLDivElement>(null);
  const email_input = useRef<HTMLInputElement>(null);
  const timelienPlaceholder = useRef<gsap.core.Timeline | null>(null);
  const timelienVeify = useRef<gsap.core.Timeline | null>(null);
  const [activeInput, setActiveInput] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("send");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const email_example = ["@gmail.com", "@yahoo.com"];
  const router = useRouter();

  const send_code = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setStep("check");
      timelienVeify.current?.play();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const check_code = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/check-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: code.join("") }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      sessionStorage.setItem("verifiedEmail", email);

      setStep("done");
      console.log("verified is success", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong `");
    } finally {
      setLoading(false);
      setCode(["", "", "", "", "", ""]);
    }
  };
  // change page animations 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️ 👨🏻‍🦯‍➡️️️️️️
  useEffect(() => {
    if (!email_input.current) return;

    timelienVeify.current = gsap.timeline({ paused: true });

    timelienVeify.current
      .set(email_input.current, { userSelect: "none", cursor: "default" })
      .to(email_input.current, {
        y: -10,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      .to(
        ".div-under-input",
        {
          y: -10,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.7",
      )
      .set(".code-div", { zIndex: 10 })
      .to(".code-input", {
        opacity: 100,
        cursor: "pointer",
        y: -60,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
      });
  }, []);
  // handlr change of code inputs🗝️🗝️🗝️🗝️🗝️🗝️🗝️🗝️🗝️
  const handle_change_code = (
    index: number,
    value: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!/^\d?$/.test(value)) return; // only one digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Check if all inputs are filled
    if (newCode.every((digit) => digit !== "")) {
      const otp = newCode.join("");
      console.log(`otp is : ${otp}`);
    }

    //go next input
    if (value) {
      const next_input = e.target.nextElementSibling as HTMLInputElement | null;
      next_input?.focus();
    }
  };

  //keydown handeller {backspace , enter}
  const handle_enter = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    handle_click();
  };

  const handle_keydown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index]) {
      const prev_input = e.currentTarget
        .previousElementSibling as HTMLInputElement | null;
      prev_input?.focus();
    }
  };

  // for handelling send email and check code
  const handle_click = () => {
    setError("");

    if (email.length === 0) return setError("Write your email dude !");

    if (email.length < 10) return setError("Your email is too short .");

    if (!email_example.includes(email.slice(-10)))
      return setError(
        `The ${email.slice(-10)} is incorrect should be ${email_example[0]} or ${email_example[1]} .`,
      );

    if (step === "send") {
      send_code();
    } else if (step === "check") {
      check_code();
    }
  };

  //focuse on first input
  useEffect(() => {
    if (step !== "check") return;

    const firstInput = document.querySelector(
      ".code-input",
    ) as HTMLInputElement | null;

    firstInput?.focus();
  }, [step]);

  // input placeholder
  useEffect(() => {
    if (!email_input.current) return;

    timelienPlaceholder.current = gsap.timeline({ paused: true });

    timelienPlaceholder.current.to(".example-email", {
      x: 0,
      opacity: 0.6,
      duration: 0.5,
      ease: "power3.out",
    });

    if (!activeInput) {
      setTimeout(() => {
        timelienPlaceholder.current?.play();
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle_not_active = () => {
    setActiveInput(true);
    timelienPlaceholder.current?.play();
  };

  const handle_active = () => {
    setActiveInput(false);
    timelienPlaceholder.current?.reverse();
  };

  //when page render animations
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
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.5",
    );
  });

  //error massage animations.
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
    }).to(".error-text", {
      opacity: 0,
      delay: 4,
      y: 5,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, [error]);

  //success massage animations && go next page
  useEffect(() => {
    if (step !== "done") return;
    const tl = gsap.timeline();

    tl.to(".success-massage", {
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    }).to(
      ".svg-success",
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out",
      },
      "-=0.5",
    );

    const timeOut = setTimeout(() => {
      router.push("/reservation/details");
    }, 4000);

    return () => clearTimeout(timeOut);
  }, [step, router]);

  return (
    <div>
      <div
        className="success-massage absolute w-full z-50  h-screen bg-forest-moss 
      flex items-center justify-center -translate-y-full ">
        <div className="text-7xl font-extrabold font-museo text-dark-spruce">
          <div className="svg-success w-full flex justify-center -mt-20 mb-15  -translate-y-30">
            <Image
              src={"/svg/success-verify.svg"}
              width={200}
              height={100}
              alt="success"
              className="object-contain select-none"
            />
          </div>
          <p className="succession-text flex ">{`Verified Succession `}</p>
        </div>
      </div>
      <Form_template
        text={"Enter email"}
        text_two="Enter Code"
        dependes_two={step === "send" ? false : true}>
        <div className="w-full h-full">
          <div ref={input_div} className="w-0 backdrop-opacity-0 mt-25 mx-auto">
            <p
              className={`example-email absolute -z-10 mt-5 ml-5 text-2xl text-forest-moss opacity-0 translate-x-10
          select-none ${step === "send" ? "" : "hidden"}`}>
              Name@Example.com
            </p>
            <div className="code-div absolute w-full h-[40vh]  inset-0 -top-25 flex justify-center items-center gap-5 -z-10">
              {code.map((digit, i) => (
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  autoComplete="one-time-code"
                  onKeyDown={(e) => {
                    handle_keydown(i, e);
                    handle_enter(e);
                  }}
                  onChange={(e) => handle_change_code(i, e.target.value, e)}
                  key={`code-${i + 1}`}
                  className="code-input w-20 aspect-square border-2 rounded-3xl border-forest-moss outline-0 
                text-4xl text-forest-moss text-center focus:shadow-2xl/40  translate-y-30 opacity-0 cursor-default 
                focus:-translate-y-2.5  shadow-forest-moss transition-all duration-500 ease-out"
                />
              ))}
            </div>
            <input
              ref={email_input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handle_active}
              onKeyDown={(e) => handle_enter(e)}
              onBlur={(e) =>
                e.target.value.length > 0
                  ? setActiveInput(false)
                  : handle_not_active()
              }
              type="text"
              className={`w-full text-2xl text-forest-moss px-5 py-5 rounded-t-2xl mx-auto outline-0 ${step === "send" ? "" : "hidden"}`}
            />
            <div
              className={`div-under-input w-full h-1 rounded-full bg-forest-moss ${step === "send" ? "" : "mt-43"}`}></div>
            {
              <HoverButton
                onClick={handle_click}
                text={
                  loading
                    ? "Sending..."
                    : step === "send"
                      ? "Send Code"
                      : "Verify"
                }
                BclassName="z-30 mt-20 border-2 border text-forest-moss w-full h-20 rounded-full"
                TclassName="button-text-email text-3xl text-forest-moss font-bold translate-y-10 opacity-0 scale-80"
                scaleNum={55}
                bgClass="bg-sega-green"
              />
            }
            <div className="text-xl text-forest-moss mt-10 w-full justify-center flex">
              {error.length > 0 &&
                `Error : ${error}`.split("").map((word, i) => (
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

export default Reservation;
