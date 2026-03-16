'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';

type PlanCategory = 'foto' | 'video' | 'mix';

export interface PricingPlan {
  category: PlanCategory;
  name: string;
  price: string;
  priceLabel?: string; // e.g. "PER SEAT" or "EACH"
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
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        background: '#ffffff',
        border: plan.highlighted ? '1.5px solid black' : '1.5px solid black',
        boxShadow: plan.highlighted
          ? '0 2px 16px 0 rgba(0,0,0,0.10)'
          : '0 1px 4px 0 rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Optional image */}
      {plan.imageSrc && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2' }}>
          <Image
            src={plan.imageSrc}
            alt={plan.imageAlt ?? plan.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 768px) 33vw, 100vw"
            priority={!!plan.highlighted}
          />
        </div>
      )}

      <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

        {/* Name row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
          <span style={{
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#111',
            lineHeight: 1,
          }}>
            {plan.name}
          </span>
          {plan.priceLabel && (
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#aaa',
            }}>
              {plan.priceLabel}
            </span>
          )}
        </div>

        {/* Hairline divider */}
        <div style={{ borderTop: '1px solid #ebebeb', marginBottom: '20px' }} />

        {/* Feature list */}
        <motion.ul
          style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {plan.features.map((feature, index) => (
            <motion.li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '11px',
              }}
              variants={itemVariants}
            >
              {/* Thin checkmark matching screenshot style */}
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0, marginTop: '2px', color: '#111' }}
                variants={tickVariants}
              >
                <path
                  d="M3 8.5L6.5 12L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>

              <span style={{
                fontSize: '13.5px',
                color: '#444',
                lineHeight: '1.45',
                fontWeight: 400,
              }}>
                {feature}
              </span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          style={{ marginTop: 'auto', paddingTop: '20px', textAlign: 'center', borderTop: '1px solid #ebebeb' }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span style={{
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#111',
            lineHeight: 1,
          }}>
            {plan.price}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}