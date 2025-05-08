/**
 * MCP Server Handler
 * 
 * Implements a Model Context Protocol server for OmniFocus integration.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { createLogger } from '../utils/logger';
import { OmniFocusService } from '../services/omnifocus';

const logger = createLogger('mcpServer');

/**
 * Create an MCP server with the required configuration and tools
 * 
 * @returns Configured MCP server instance
 */
export function createMcpServer(): McpServer {
  logger.info('Creating MCP server');
  
  // Create the MCP server with metadata
  const server = new McpServer({
    name: 'omnifocus-mcp',
    version: '1.0.0'
  });

  // Initialize OmniFocus service
  const omnifocusService = new OmniFocusService();

  // Register a simple health check tool to ensure the server is working
  server.tool(
    'health',
    { }, // No parameters needed
    async () => {
      logger.debug('Health check called');
      return {
        content: [{ 
          type: 'text', 
          text: 'OmniFocus MCP server is healthy' 
        }]
      };
    }
  );

  // Get all tasks
  server.tool(
    'get_tasks',
    { }, // No parameters needed
    async () => {
      logger.debug('Getting all tasks');
      const tasks = await omnifocusService.getTasks();
      return {
        content: [{ 
          type: 'text', 
          text: JSON.stringify(tasks, null, 2) 
        }]
      };
    }
  );

  // Get all projects
  server.tool(
    'get_projects',
    { }, // No parameters needed
    async () => {
      logger.debug('Getting all projects');
      const projects = await omnifocusService.getProjects();
      return {
        content: [{ 
          type: 'text', 
          text: JSON.stringify(projects, null, 2) 
        }]
      };
    }
  );

  // Get tasks by project ID
  server.tool(
    'get_tasks_by_project',
    { 
      project_id: z.string().describe('OmniFocus project ID')
    },
    async ({ project_id }) => {
      logger.debug(`Getting tasks for project: ${project_id}`);
      const projects = await omnifocusService.getProjects();
      const project = projects.find(p => p.id === project_id);
      
      if (!project) {
        return {
          content: [{ 
            type: 'text', 
            text: `Project with ID "${project_id}" not found` 
          }]
        };
      }
      
      return {
        content: [{ 
          type: 'text', 
          text: JSON.stringify(project.tasks, null, 2) 
        }]
      };
    }
  );

  logger.info('MCP server created successfully');
  return server;
}