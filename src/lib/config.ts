import userConfig from '../../pbnj.config.js';

export interface PbnjConfig {
  name: string;
  logo: string;
  idStyle: 'sandwich' | 'short' | 'uuid';
  homepage: boolean;
  maxPasteSize: string;
}

const defaults: PbnjConfig = {
  name: 'pbnj',
  logo: '/logo.png',
  idStyle: 'sandwich',
  homepage: true,
  maxPasteSize: '1mb',
};

export const config: PbnjConfig = {
  ...defaults,
  ...userConfig,
};

/**
 * Parse size string to bytes
 * @param size - Size string like '1mb', '500kb'
 * @returns Size in bytes
 */
export function parseSize(size: string): number {
  const match = size.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/);
  if (!match) return 1024 * 1024; // Default 1mb

  const value = parseFloat(match[1]);
  const unit = match[2] || 'b';

  const multipliers: Record<string, number> = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
  };

  return Math.floor(value * multipliers[unit]);
}

export default config;
