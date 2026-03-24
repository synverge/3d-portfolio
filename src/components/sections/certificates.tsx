"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../ui/animated-modal";
import Link from "next/link";

import SmoothScroll from "../smooth-scroll";
import { Certificate } from "@/data/constants";
import { usePortfolioData } from "@/contexts/portfolio-data";
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

const CertificatesSection = () => {
    const { certificates } = usePortfolioData();
    return (
        <SectionWrapper id="certifications" className="max-w-7xl mx-auto md:h-[130vh]">
            <SectionHeader id="certifications" title="Certifications" />
            <div className="grid grid-cols-1 md:grid-cols-3">
                {certificates.map((cert) => (
                    <Modall key={cert.id} certificate={cert as Certificate} />
                ))}
            </div>
        </SectionWrapper>
    );
};

const Modall = ({ certificate }: { certificate: Certificate }) => {
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
                            src={certificate.image}
                            alt={certificate.title}
                        />
                        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none">
                            <div className="flex flex-col h-full items-start justify-end p-6">
                                <div className="text-lg text-left text-white">{certificate.title}</div>
                                <div className="text-xs bg-white text-black rounded-lg w-fit px-2">
                                    {certificate.issuer}
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalTrigger>
                <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
                    <SmoothScroll isInsideModal={true}>
                        <ModalContent>
                            <CertificateContents certificate={certificate} />
                        </ModalContent>
                    </SmoothScroll>
                    <ModalFooter className="gap-4">
                        <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                            Cancel
                        </button>
                        {certificate.credentialUrl && (
                            <Link href={certificate.credentialUrl} target="_blank">
                                <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                                    Verify
                                </button>
                            </Link>
                        )}
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default CertificatesSection;

const CertificateContents = ({ certificate }: { certificate: Certificate }) => {
    const [hovering, setHovering] = useState(false);
    return (
        <>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
                {certificate.title}
            </h4>
            <p className="text-sm text-center text-neutral-500 dark:text-neutral-400 mb-8">
                Issued by <strong>{certificate.issuer}</strong> — {certificate.date}
            </p>

            {/* Certificate Image with Click to Zoom */}
            <div className="w-full rounded-lg overflow-hidden mb-8">
                <Dialog>
                    <DialogTrigger
                        className="relative w-full"
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        <Image
                            src={certificate.image}
                            alt={certificate.title}
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
                            <DialogDescription className="text-white text-center font-bold">
                                {certificate.title}
                            </DialogDescription>
                        </DialogHeader>
                        <Image
                            src={certificate.image}
                            alt={certificate.title}
                            width={1920}
                            height={1080}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Description */}
            {certificate.description && (
                <>
                    <p className="font-mono mb-2">About</p>
                    <p className="font-mono text-sm mb-6 text-neutral-600 dark:text-neutral-400">
                        {certificate.description}
                    </p>
                </>
            )}

            {/* Skills */}
            {certificate.skills && certificate.skills.length > 0 && (
                <>
                    <p className="font-mono mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {certificate.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </>
            )}

            {/* Capabilities */}
            {certificate.capabilities && certificate.capabilities.length > 0 && (
                <>
                    <p className="font-mono mb-2">Capabilities</p>
                    <ul className="list-disc ml-6 space-y-2 mb-6">
                        {certificate.capabilities.map((cap, idx) => (
                            <li
                                key={idx}
                                className="font-mono text-sm text-neutral-600 dark:text-neutral-400"
                            >
                                {cap}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Credential Link */}
            {certificate.credentialUrl && (
                <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
                    <Link
                        className="font-mono underline flex gap-2"
                        rel="noopener"
                        target="_new"
                        href={certificate.credentialUrl}
                    >
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md">
                            View & Verify Credential →
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};
