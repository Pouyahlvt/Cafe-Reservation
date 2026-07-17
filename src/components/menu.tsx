"use client";

type Menu_tems_type = {
  [category: string]: {
    [item: string]: string[];
  };
};

const Menu = () => {
  const menu_items: Menu_tems_type = {
    "hot drinks": {
      late: ["espresso", "milk"],
      capochino: ["espresso", "milk", "fome milk"],
    },
    "cold dronks": { "ice late": ["espresso", "milk", "ice"] },
    shakes: { "nutella shake": ["milk", "nutella", "banana", "cream"] },
    breakfast: { egg: ["just egg idiot !"] },
    food: { pasta: ["pasta", "parmesan", "chiken", "milk", "cream"] },
  };
  return (
    <section className="menu w-full h-screen bg-dark-spruce rounded-t-4xl pt-25">
      <h1 className="text-[10rem] tracking-tighter text-forest-moss text-center font-black font-museo">
        Menu
      </h1>
      <div></div>
    </section>
  );
};

export default Menu;
