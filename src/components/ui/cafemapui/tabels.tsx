"use client";

import Image from "next/image";

interface Props {
  x?: number;
  y?: number;
  reserved: boolean;
  table_num?: number;
  size?: number;
}

export const EightTable = ({ x = 0, y = 0, reserved }: Props) => {
  return (
    <div
      style={{ top: y, left: x }}
      className={`absolute flex z-10 cursor-pointer  transition-all duration-300 
      ease-in-out ${reserved ? "opacity-60 " : "hover:scale-105"}`}>
      <Image
        width={220}
        height={1}
        src={"/cafemapimages/table8.png"}
        alt={"table 8"}
      />
    </div>
  );
};

export const TableSix = ({ x = 0, y = 0, reserved }: Props) => {
  return (
    <div
      style={{ top: y, left: x }}
      className={`absolute flex z-10 cursor-pointer  transition-all duration-300 
      ease-in-out ${reserved ? "opacity-60 " : "hover:scale-105"}`}>
      <Image
        width={200}
        height={1}
        src={"/cafemapimages/table6.png"}
        alt={"table 6"}
      />
    </div>
  );
};

export const TableFour = ({ x = 0, y = 0, reserved }: Props) => {
  return (
    <div
      style={{ top: y, left: x }}
      className={`absolute flex z-10 cursor-pointer  transition-all duration-300 
      ease-in-out ${reserved ? "opacity-60 " : "hover:scale-105"}`}>
      <Image
        width={200}
        height={1}
        src={"/cafemapimages/table4.png"}
        alt={"table 4"}
      />
    </div>
  );
};

export const Table12 = ({ x = 0, y = 0, reserved }: Props) => {
  return (
    <div
      style={{ top: y, left: x }}
      className={`absolute flex z-10 cursor-pointer  transition-all duration-300 
      ease-in-out ${reserved ? "opacity-60 " : "hover:scale-105"}`}>
      <Image
        width={200}
        height={1}
        src={"/cafemapimages/table12.png"}
        alt={"table 4"}
      />
    </div>
  );
};

export const Table = ({
  x = 0,
  y = 0,
  reserved,
  table_num = 2,
  size = 200,
}: Props) => {
  return (
    <div
      style={{ top: y, left: x }}
      className={`absolute flex z-10 cursor-pointer  transition-all duration-300 
      ease-in-out ${reserved ? "opacity-60 " : "hover:scale-105"}`}>
      <Image
        width={size}
        height={1}
        src={`/cafemapimages/table${table_num}.png`}
        alt={`table-${table_num}`}
      />
    </div>
  );
};
