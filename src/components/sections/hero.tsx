import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiFacebook, SiInstagram } from "react-icons/si";
import { usePortfolioData } from "@/contexts/portfolio-data";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const { config, heroTagline, heroAvatarUrl } = usePortfolioData();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col">
              <div className="flex flex-col items-center md:items-start">
                <BlurIn delay={0.5}>
                  <img
                    src={heroAvatarUrl}
                    alt="avatar"
                    className="w-32 h-32 rounded-full shadow-lg mb-6 object-cover border-4 border-white dark:border-zinc-800"
                  />
                </BlurIn>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <h1
                    className={cn(
                      "-ml-[6px] leading-none font-thin text-transparent text-slate-800 text-left",
                      "font-thin text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                      "cursor-default text-edge-outline font-display "
                    )}
                  >
                    {(config.displayName ?? "").split(" ")[0] ?? ""}
                    <br className="md:block hiidden" />
                    {(config.displayName ?? "").split(" ").slice(1).join(" ")}
                  </h1>
                </BlurIn>
                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    {heroTagline}
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 flex flex-col gap-3 w-fit">

                <div className="md:self-start flex gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>pls 🥹 🙏</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex items-center h-full gap-2">
                    {config.social.instagram && (
                    <Link
                      href={config.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant={"outline"}>
                        <SiInstagram size={24} />
                      </Button>
                    </Link>
                    )}
                    {config.social.github && (
                    <Link
                      href={config.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                    >
                      <Button variant={"outline"}>
                        <SiGithub size={24} />
                      </Button>
                    </Link>
                    )}
                    {config.social.facebook && (
                    <Link
                      href={config.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                    >
                      <Button variant={"outline"}>
                        <SiFacebook size={24} />
                      </Button>
                    </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
