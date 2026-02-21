// ============================================
// CREDENCE - Skill DNA Component
// Unique Visual Fingerprint Based on Skills
// ============================================

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SkillDNAProps {
  skills: { name: string; score: number }[];
  size?: number;
  showLabel?: boolean;
}

export default function SkillDNA({ skills, size = 200, showLabel = true }: SkillDNAProps) {
  // Generate unique DNA pattern based on skills
  const dnaCode = useMemo(() => {
    // Create a hash from skills
    const hash = skills.reduce((acc, skill, i) => {
      return acc + skill.score * (i + 1) + skill.name.charCodeAt(0);
    }, 0);
    
    // Generate pattern
    const pattern = [];
    for (let i = 0; i < 24; i++) {
      const segment = {
        height: ((hash * (i + 1)) % 60) + 20,
        color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
        delay: i * 0.05,
      };
      pattern.push(segment);
    }
    return pattern;
  }, [skills]);

  // Generate unique ID from skills
  const uniqueId = useMemo(() => {
    const hash = skills.reduce((acc, skill) => {
      return acc + skill.score + skill.name.length;
    }, 0);
    return `CR-${hash.toString(36).toUpperCase().padStart(6, '0')}`;
  }, [skills]);

  return (
    <div className="flex flex-col items-center">
      {/* DNA Visualization */}
      <div 
        className="flex items-end justify-center gap-1 p-4 bg-dark-800/50 rounded-xl border border-dark-600"
        style={{ width: size, height: size * 0.6 }}
      >
        {dnaCode.map((segment, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: segment.height, opacity: 1 }}
            transition={{ delay: segment.delay, duration: 0.3 }}
            className="w-2 rounded-full"
            style={{ backgroundColor: segment.color }}
          />
        ))}
      </div>
      
      {/* Unique ID */}
      {showLabel && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Skill DNA</p>
          <p className="font-mono text-accent-primary font-bold tracking-wider">{uniqueId}</p>
        </div>
      )}
    </div>
  );
}
