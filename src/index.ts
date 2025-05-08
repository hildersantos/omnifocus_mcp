/**
 * OmniFocus MCP Server
 * 
 * A Model Context Protocol server for OmniFocus integration.
 */

import { createLogger } from './utils/logger';
import { getConfig } from './utils/config';

const config = getConfig();
const logger = createLogger('app');

logger.info('OmniFocus MCP Server starting...');
logger.debug('Configuration:', config);

/**
 * Main application function
 */
async function main() {
  try {
    logger.info(`Server initialized on port ${config.port}`);
  } catch (error) {
    logger.error('Failed to start server:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Start the application
if (require.main === module) {
  main();
}

export default main;