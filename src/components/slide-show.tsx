// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { motion } from "framer-motion";

import "@splidejs/react-splide/css";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const SlideShow = ({ images }: { images: string[] }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <Splide
      options={{
        autoplay: "true",
        perPage: 1,
        start: 0,
        rewind: true,
        padding: { left: '3rem', right: '3rem' },
        gap: "1rem",
      }}
      hasTrack={false}
    >
      <SplideTrack>
        {images.map((image, idx) => (
          <SplideSlide key={idx} className="flex items-center">
            <Dialog>
              <DialogTrigger
                className="relative"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <Image
                  src={image}
                  alt="screenshot"
                  width={1000}
                  height={1000}
                  className="w-full rounded-lg h-auto"
                />
                <AnimatePresence>
                  {hovering && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 text-white backdrop-blur-[1px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Click to zoom
                    </motion.div>
                  )}
                </AnimatePresence>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto bg-transparent outline-none border-none p-0 shadow-none flex flex-col items-center justify-center [&>button]:z-50 [&>button]:text-white [&>button]:bg-black/40 [&>button]:hover:bg-black/60 [&>button]:top-4 [&>button]:right-4">
                <DialogHeader className="w-full bg-black/50 backdrop-blur-md p-2 rounded-t-lg absolute top-0 left-0 z-10">
                  {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                  <DialogDescription className="text-white text-center font-bold">
                    {image.split("/").pop()}
                  </DialogDescription>
                </DialogHeader>
                <Image
                  src={image}
                  alt="screenshot"
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </SplideSlide>
        ))}
      </SplideTrack>
      <div className="splide__progress">
        <div className="splide__progress__bar"></div>
      </div>
    </Splide>
  );
};
export default SlideShow;
