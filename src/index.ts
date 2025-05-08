/**
 * OmniFocus MCP Server
 * 
 * A Model Context Protocol server for OmniFocus integration.
 */

import { createLogger } from './utils/logger';
import { getConfig } from './utils/config';
import { createMcpServer } from './handlers/mcpServer';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const config = getConfig();
const logger = createLogger('app');

logger.info('OmniFocus MCP Server starting...');
logger.debug('Configuration:', config);

/**
 * Main application function
 */
async function main() {
  try {
    // Create MCP server
    const server = createMcpServer();
    
    // Create transport layer for communication
    const transport = new StdioServerTransport();
    
    // Connect the server to the transport
    logger.info('Connecting MCP server to transport');
    await server.connect(transport);
    
    logger.info('MCP server running');
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