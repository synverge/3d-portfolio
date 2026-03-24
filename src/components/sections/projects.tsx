"use client";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

import SmoothScroll from "../smooth-scroll";
import SlideShow from "../slide-show";
import projects, { Project } from "@/data/projects";
import { usePortfolioData } from "@/contexts/portfolio-data";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

import SectionWrapper from "../ui/section-wrapper";

const ProjectsSection = () => {
  const { projects: adminProjects } = usePortfolioData();

  const displayProjects = projects.map((p) => {
    const ov = adminProjects.find((o) => o.id === p.id);
    if (!ov) return p;
    return {
      ...p,
      title: ov.title,
      category: ov.category,
      src: ov.src,
      live: ov.live,
      github: ov.github ?? p.github,
      description: ov.description ?? p.description,
      screenshots: (ov.screenshots && ov.screenshots.length > 0) ? ov.screenshots : p.screenshots,
    };
  });

  // Admin-only projects (not present in static data) appended to the list
  const adminOnlyProjects: Project[] = adminProjects
    .filter((ov) => !projects.some((p) => p.id === ov.id))
    .map((ov) => ({
      id: ov.id,
      category: ov.category,
      title: ov.title,
      src: ov.src,
      screenshots: ov.screenshots ?? [],
      skills: { frontend: [], backend: [] },
      content: null,
      live: ov.live,
      github: ov.github,
      description: ov.description,
    }));

  const allProjects = [...displayProjects, ...adminOnlyProjects];

  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto md:h-[130vh]">
      <SectionHeader id='projects' title="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {allProjects.map((project) => (
          <Modall key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};
const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn">
          <div
            className="relative w-[400px] h-auto rounded-lg overflow-hidden"
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              className="absolute w-full h-full top-0 left-0 hover:scale-[1.05] transition-all"
              src={project.src}
              alt={project.title}
              width={300}
              height={300}
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none">
              <div className="flex flex-col h-full items-start justify-end p-6">
                <div className="text-lg text-left">{project.title}</div>
                <div className="text-xs bg-white text-black rounded-lg w-fit px-2">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <Link href={project.live} target="_blank">
              <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Visit
              </button>
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  const [hovering, setHovering] = React.useState(false);
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
        {project.title}
      </h4>

      {/* Project Image with Click to Zoom */}
      <div className="w-full rounded-lg overflow-hidden mb-8">
        <Dialog>
          <DialogTrigger
            className="relative w-full"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <Image
              src={project.src}
              alt={project.title}
              width={1000}
              height={1000}
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
                {project.title}
              </DialogDescription>
            </DialogHeader>
            <Image
              src={project.src}
              alt={project.title}
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
          <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
            Frontend
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      {project.description ? (
        <div>
          <div className="font-mono text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap mb-6">
            {project.description}
          </div>
          {project.screenshots && project.screenshots.length > 0 && (
            <SlideShow images={project.screenshots} />
          )}
        </div>
      ) : (
        project.content
      )}
    </>
  );
};
