/**
 * Configuration utility
 */

export interface Config {
  port: number;
  logLevel: string;
}

/**
 * Get application configuration from environment variables or defaults
 * 
 * @returns Configuration object
 */
export function getConfig(): Config {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    logLevel: process.env.LOG_LEVEL || 'info'
  };
}