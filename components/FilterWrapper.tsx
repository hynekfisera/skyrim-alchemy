import React from "react";

type Props = {
  id: string;
  active: boolean;
  modify: (id: string, active: boolean) => void;
  className?: string;
  children: React.ReactNode;
};

export default function FilterWrapper({ id, active, modify, className, children }: Props) {
  return (
    <div onClick={() => modify(id, active)} className={`cursor-pointer select-none ${active ? "border-2 border-green-200 bg-green-100 hover:bg-green-200 text-green-500 hover:text-green-700" : "border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700"} ${className || ""}`}>
      {children}
    </div>
  );
}
