/**
 * Simple logger utility
 */

export interface Logger {
  namespace: string;
  info(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

/**
 * Creates a logger with a specified namespace
 * 
 * @param namespace - The namespace for the logger
 * @returns A logger instance
 */
export function createLogger(namespace: string): Logger {
  return {
    namespace,
    info: (message: string, ...args: any[]) => {
      console.info(`[${namespace}] INFO: ${message}`, ...args);
    },
    error: (message: string, ...args: any[]) => {
      console.error(`[${namespace}] ERROR: ${message}`, ...args);
    },
    warn: (message: string, ...args: any[]) => {
      console.warn(`[${namespace}] WARN: ${message}`, ...args);
    },
    debug: (message: string, ...args: any[]) => {
      console.debug(`[${namespace}] DEBUG: ${message}`, ...args);
    }
  };
}