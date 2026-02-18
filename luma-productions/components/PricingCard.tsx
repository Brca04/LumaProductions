'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';

type PlanCategory = 'foto' | 'video' | 'mix';

export interface PricingPlan {
  category: PlanCategory;
  name: string;
  price: string;
  features: string[];
  imageSrc?: string;
  imageAlt?: string;
  highlighted?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      // ✅ use cubic-bezier instead of string
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const tickVariants: Variants = {
  hidden: { scale: 0, rotate: -90, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
    },
  },
};

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={` bg-white text-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl border-2 flex flex-col h-full overflow-hidden ${
        plan.highlighted ? 'border-black' : 'border-gray-200'
      }`}
    >
      {/* Big image */}
      {plan.imageSrc && (
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={plan.imageSrc}
            alt={plan.imageAlt ?? plan.name}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
            priority={!!plan.highlighted}
          />
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

        <div className="mb-6">
          <span className="text-4xl font-bold text-black">{plan.price}</span>
        </div>

        {/* Animated feature list */}
        <motion.ul
          className="space-y-3 mb-8 flex-grow"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {plan.features.map((feature, index) => (
            <motion.li key={index} className="flex items-start" variants={itemVariants}>
              {/* Animated tick */}
              <motion.svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                variants={tickVariants}
              >
                <path d="M5 13l4 4L19 7" />
              </motion.svg>

              <span className="text-sm text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
