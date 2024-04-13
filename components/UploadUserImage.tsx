"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Suspense, useState } from "react";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Button } from "./ui/button";
import UserImageSkeleton from "./UserImageSkeleton";

const UploadUserImage = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const { user } = useUser();
  if (!user) return <UserImageSkeleton />;

  const params = new URLSearchParams();

  params.set("height", "200");
  params.set("width", "200");
  params.set("quality", "100");
  params.set("fit", "crop");

  const saveImage = async (file: File | undefined) => {
    user?.setProfileImage({ file: file ? file : null });
    setFile(file);
    setOpen(false);
  };

  const removeImage = () => {
    user?.setProfileImage({ file: null });
    setFile(undefined);
  };
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="flex flex-col">
        <div className="flex items-center space-x-3">
          <Image
            className="rounded-full"
            width={80}
            height={80}
            src={
              user?.imageUrl
                ? `${user.imageUrl}?${params.toString()}`
                : "/assets/icons/user.svg"
            }
            alt="User image"
          />
          <div className="flex flex-col">
            <p className="ml-4">Profile image</p>
            <div className="flex space-x-1">
              <Button
                onClick={() => setOpen(!open)}
                type="button"
                variant="link"
                className="text-como"
              >
                Upload Image
              </Button>
              <Button
                onClick={removeImage}
                type="button"
                variant="link"
                className="text-red-600"
              >
                Remove Image
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 overflow-hidden">
          <LazyMotion features={domAnimation} strict>
            <div aria-expanded={open}>
              <AnimatePresence initial={false}>
                {open ? (
                  <m.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto" },
                      collapsed: { height: 0 },
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={file}
                      onChange={(file) => saveImage(file)}
                    />
                  </m.div>
                ) : null}
              </AnimatePresence>
            </div>
          </LazyMotion>
        </div>
      </div>
    </Suspense>
  );
};
export default UploadUserImage;
