"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";

import SmoothScroll from "../smooth-scroll";
import { EXPERIENCE, Experience } from "@/data/constants";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";

const ExperienceSection = () => {
  return (
    <SectionWrapper id="experience" className="max-w-7xl mx-auto md:h-[130vh]">
      <SectionHeader
        id="experience"
        title="Experience"
      />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {EXPERIENCE.map((exp) => (
          <ExperienceModal key={exp.id} experience={exp} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const ExperienceModal = ({ experience }: { experience: Experience }) => {
  const bannerSrc = experience.banner || experience.logo || "";

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn">
          <div
            className="relative w-[400px] h-auto rounded-lg overflow-hidden"
            style={{ aspectRatio: "3/2" }}
          >
            <img
              className="absolute w-full h-full top-0 left-0 object-cover hover:scale-[1.05] transition-all"
              src={bannerSrc}
              alt={experience.title}
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none">
              <div className="flex flex-col h-full items-start justify-end p-6">
                <div className="text-lg text-left text-white">{experience.title}</div>
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-white text-black rounded-lg w-fit px-2">
                    {experience.company}
                  </div>
                  <div className="text-xs text-white/70 font-mono">
                    {experience.startDate} – {experience.endDate}
                  </div>
                </div>
              </div>
            </div>
            {/* Logo overlay */}
            {experience.logo && (
              <div className="absolute top-3 right-3">
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="w-10 h-10 rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-sm object-cover"
                />
              </div>
            )}
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ExperienceContents experience={experience} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Close
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

const ExperienceContents = ({ experience }: { experience: Experience }) => {
  const [hovering, setHovering] = React.useState(false);
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
        {experience.title}
      </h4>
      <p className="text-sm text-center text-neutral-500 dark:text-neutral-400 mb-8">
        <strong>{experience.company}</strong> — {experience.startDate} – {experience.endDate}
      </p>

      {/* Banner in modal with Zoom */}
      {experience.banner && (
        <div className="w-full rounded-lg overflow-hidden mb-8">
          <Dialog>
            <DialogTrigger
              className="relative w-full"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <Image
                src={experience.banner}
                alt={experience.title}
                width={800}
                height={400}
                className="w-full rounded-lg h-auto object-cover"
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
                <DialogDescription className="text-white text-center font-bold">
                  {experience.title}
                </DialogDescription>
              </DialogHeader>
              <Image
                src={experience.banner}
                alt={experience.title}
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Description */}
      <p className="font-mono mb-2 font-bold text-neutral-800 dark:text-neutral-200">What I did</p>
      <ul className="list-disc ml-6 space-y-2 mb-6">
        {experience.description.map((point, idx) => (
          <li
            key={idx}
            className="font-mono text-sm text-neutral-600 dark:text-neutral-400"
          >
            {point}
          </li>
        ))}
      </ul>



      {/* Key Takeaways */}
      {experience.keyTakeaways && experience.keyTakeaways.length > 0 && (
        <>
          <p className="font-mono mb-2 font-bold text-emerald-600 dark:text-emerald-400">Key Takeaways & Growth</p>
          <ul className="list-disc ml-6 space-y-2 mb-6 text-emerald-800/80 dark:text-emerald-200/80">
            {experience.keyTakeaways.map((point, idx) => (
              <li
                key={idx}
                className="font-mono text-sm"
              >
                {point}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ExperienceSection;
