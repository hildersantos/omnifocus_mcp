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
      // Write to stderr instead of stdout to avoid interfering with MCP JSON-RPC communication
      process.stderr.write(`[${namespace}] INFO: ${message} ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')}\n`);
    },
    error: (message: string, ...args: any[]) => {
      process.stderr.write(`[${namespace}] ERROR: ${message} ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')}\n`);
    },
    warn: (message: string, ...args: any[]) => {
      process.stderr.write(`[${namespace}] WARN: ${message} ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')}\n`);
    },
    debug: (message: string, ...args: any[]) => {
      process.stderr.write(`[${namespace}] DEBUG: ${message} ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')}\n`);
    }
  };
}