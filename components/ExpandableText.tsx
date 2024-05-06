"use client";
import { useEffect, useRef, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { log } from "console";

type ExpandableTextProps = {
  text: string;
};

const ExpandableText = ({ text }: ExpandableTextProps) => {
  const myRef = useRef<HTMLDivElement | null>(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    executeScroll();
  };

  useEffect(() => {
    if (checked) {
      const timer = setTimeout(() => {
        myRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }, 200); // Delay might need to be adjusted based on content size
      return () => clearTimeout(timer);
    }
  }, [checked]);

  const executeScroll = () => {
    myRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <>
      <Collapsible open={checked} onOpenChange={handleCheck}>
        <h2 className="text-xl font-semibold">Description</h2>
        <p
          data-state={checked ? "open" : "closed"}
          className={`data-[state=open]:hidden text-ellipsis line-clamp-3 text-gunsmoke text-justify`}
        >
          {text}
        </p>
        <CollapsibleContent
          ref={myRef}
          className="collapsible_content whitespace-pre-line text-justify"
        >
          {text}
        </CollapsibleContent>
        <CollapsibleTrigger className="flex items-start focus:outline-none text-como_v-400">
          {checked ? "Read less" : "Read more"}
        </CollapsibleTrigger>
      </Collapsible>
    </>
  );
};

export default ExpandableText;
