"use client"
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundBeams } from '@/components/ui/background-beams';
import { ArrowUpRight } from 'lucide-react';
import { CoverDemo } from './CoverDemo';
import { BentoGridDemo } from './BentoGridDemo';
import { LinkPreviewDemo } from './LinkPreviewDemo';
import { InfiniteMovingCardsDemo } from './InfiniteMovingCardsDemo';
import { WorldMapDemo } from './WorldMapDemo';
import { HeroParallaxDemo } from './HeroParallaxDemo';
import { StickyScrollRevealDemo } from './StickyScrollRevealDemo';

const words = `Your Full-Scale Distribution Partner`;
const Hero = () => {
    return (
        <div className=''>
            <BackgroundBeams />
            <TextGenerateEffect words={words} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-center relative z-10 mt-4 flex cursor-pointer items-center justify-center"
            >
                <button className="px-12 flex items-center justify-between py-2 rounded-sm cursor-pointer border border-neutral-600 text-white bg-gradient-to-r from-orange-500 to-yellow-400  hover:bg-gray-100 transition duration-300">
                    View Services
                    <ArrowUpRight />
                </button>
            </motion.div>
            {/* <CoverDemo /> */}
            <div className="relative my-6">
                <div className="border-t border-gray-600"></div>

            </div>
            <BentoGridDemo />

            <LinkPreviewDemo />
            <HeroParallaxDemo/>


            <WorldMapDemo/>
            <StickyScrollRevealDemo/>
            <InfiniteMovingCardsDemo/>



        </div>
    )
}

export default Hero