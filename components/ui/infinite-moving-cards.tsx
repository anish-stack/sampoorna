import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';


interface CardItem {
  quote: string;
  name: string;
  title: string;
  image?: string;
}

interface InfiniteMovingCardsProps {
  items: CardItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setupScroller();
    }
  }, [isInView, controls]);

  const setupScroller = () => {
    if (containerRef.current && scrollerRef.current) {
      // Clone items for seamless infinite scroll
      // We need to duplicate enough items to ensure no visible gaps
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clone multiple sets to ensure no gaps
      for (let i = 0; i < 3; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
      }

      // Set CSS variables for animation
      setAnimationDirection();
      setAnimationSpeed();
      setStart(true);
    }
  };

  const setAnimationDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      );
    }
  };

  const setAnimationSpeed = () => {
    if (containerRef.current) {
      const speedMap = {
        slow: '80s',
        normal: '40s',
        fast: '20s'
      };
      containerRef.current.style.setProperty('--animation-duration', speedMap[speed]);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={cn(
        'relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <motion.li
            key={`${item.name}-${idx}`}
            variants={itemVariants}
            className="w-[350px] max-w-full relative rounded-2xl border border-slate-700/50 flex-shrink-0 px-8 py-6 md:w-[450px] overflow-hidden group"
            style={{
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 1))'
            }}
          >
            {/* Animated border effect */}
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-all duration-500 group-hover:duration-200 animate-border-spin" />

            <blockquote className="relative z-10">
              <div className="relative z-20">
                <p className="text-sm leading-[1.6] text-gray-100 font-normal mb-4 relative">
                  "{item.quote}"
                </p>

                <div className="relative z-20 mt-6 flex flex-row items-center">
                  {item.image && (
                    <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border border-slate-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <h4 className="text-base font-medium text-white">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle indicator for interaction */}
              <div className="w-8 h-0.5 bg-orange-500 mt-3 transition-all duration-300 group-hover:w-12" />
            </blockquote>
          </motion.li>
        ))}
      </ul>

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-25% - 0.5rem));
          }
        }
        
        @keyframes borderSpin {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
        }
        
        .animate-border-spin {
          background-size: 200% 200%;
          animation: borderSpin 3s ease infinite;
        }
      `}</style>
    </motion.div>
  );
};