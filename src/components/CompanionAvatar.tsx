import React from 'react';
import { UserStats, MasterDailyState } from '../types';
import { FreyaCompanion } from './FreyaCompanion/FreyaCompanion';
import { FreyaCharacter, CharacterState } from './FreyaCompanion/FreyaCharacter';

export { FreyaCompanion, FreyaCharacter };
export type { CharacterState };

interface CompanionAvatarProps {
  stats: UserStats;
  daily: MasterDailyState;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  onOpenWardrobe: () => void;
  onOpenTimer: () => void;
  onOpenFounderRoadmap: () => void;
  speechOverride?: string | null;
  characterState?: CharacterState;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  floatingXP?: number | null;
}

export const CompanionAvatar: React.FC<CompanionAvatarProps> = (props) => {
  return <FreyaCompanion {...props} />;
};

export default CompanionAvatar;
