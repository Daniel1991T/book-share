"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { MotionDiv } from "./shared/MotionDiv";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const DescriptionText = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col transition-all duration-200 animate-out">
      <h2 className="text-xl font-semibold">Description</h2>
      <p className="text-slate-400 transition-all duration-200 ease-out whitespace-pre-line text-justify space-x-1">
        <span
          className={`transition-all duration-200  ${
            !open ? "line-clamp-4 ease-in" : "ease-out"
          }`}
        >
          {text}
        </span>
        <Button
          onClick={() => setOpen(!open)}
          variant="link"
          className="text-como"
        >
          {!open ? "Read more" : "Read less"}
        </Button>
      </p>
    </div>
  );
};
export default DescriptionText;
