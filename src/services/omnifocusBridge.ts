/**
 * OmniFocus Bridge Service
 * 
 * Provides a bridge to interact with OmniFocus using URL schemes and script execution.
 */

import { exec } from 'child_process';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../utils/logger';
import { Task, Project } from './omnifocus';

const logger = createLogger('omnifocusBridge');

/**
 * Bridge service for interacting with OmniFocus via URL scheme and script execution
 */
export class OmniFocusBridge {
  /**
   * Create a new OmniFocus bridge service
   */
  constructor() {
    logger.info('OmniFocus bridge service initialized');
  }

  /**
   * Execute a script in OmniFocus via URL scheme
   * 
   * @param script - The JavaScript script to execute
   * @returns Promise resolving when the script is executed
   */
  async executeScript(script: string): Promise<void> {
    logger.debug('Executing script in OmniFocus');
    
    // Encode the script for URL
    const encodedScript = encodeURIComponent(script);
    
    // Create the URL to execute the script
    const url = `omnifocus://localhost/omnijs-run?script=${encodedScript}`;
    
    return new Promise((resolve, reject) => {
      exec(`open "${url}"`, (error, stdout, stderr) => {
        if (error) {
          logger.error('Failed to execute script in OmniFocus:', error);
          reject(error);
          return;
        }
        
        if (stderr) {
          logger.error('Script error:', stderr);
          reject(new Error(stderr));
          return;
        }
        
        logger.debug('Script executed successfully');
        resolve();
      });
    });
  }

  /**
   * Execute a script that returns a result by writing to a temp file
   * 
   * @param script - The JavaScript script to execute
   * @returns Promise resolving to the result of the script
   * @private
   */
  private async executeScriptWithResult<T>(script: string): Promise<T> {
    logger.debug('Executing script with result in OmniFocus');
    
    // Create unique ID for this execution
    const executionId = uuidv4();
    const resultFile = `/tmp/omnifocus_result_${executionId}.json`;
    
    // Wrap the script to write results to a file
    const wrappedScript = `
      (function() {
        try {
          // Execute the original script
          const result = (function() {
            ${script}
          })();
          
          // Write result to file
          const resultData = {
            result: result,
            error: null
          };
          
          // Convert Date objects to ISO strings for serialization
          const serializedData = JSON.stringify(resultData, (key, value) => {
            if (value instanceof Date) {
              return value.toISOString();
            }
            return value;
          });
          
          // Write to file using FileManager
          const fm = FileManager.createLocal();
          fm.createFile("${resultFile}", serializedData);
          
          return result;
        } catch(err) {
          // Write error to file
          const resultData = {
            result: null,
            error: err.toString()
          };
          
          const fm = FileManager.createLocal();
          fm.createFile("${resultFile}", JSON.stringify(resultData));
          
          throw err;
        }
      })();
    `;
    
    try {
      // Execute the script
      await this.executeScript(wrappedScript);
      
      // Wait for the result file to be created (simple polling)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Read the result file
      const resultJson = fs.readFileSync(resultFile, 'utf-8');
      const resultData = JSON.parse(resultJson);
      
      // Clean up the result file
      fs.unlinkSync(resultFile);
      
      // Check for error
      if (resultData.error) {
        throw new Error(resultData.error);
      }
      
      return resultData.result;
    } catch (error) {
      logger.error('Failed to execute script with result:', error);
      throw error;
    }
  }

  /**
   * Get tasks from the inbox
   * 
   * @returns Promise resolving to an array of inbox tasks
   */
  async getInboxTasks(): Promise<Task[]> {
    logger.info('Getting tasks from OmniFocus inbox');
    
    const script = `
      function mapTask(task) {
        return {
          id: task.id.primaryKey,
          name: task.name,
          completed: task.completed,
          dueDate: task.dueDate,
          note: task.note,
          flagged: task.flagged
        };
      }
      
      // Get tasks from inbox
      const inboxTasks = inbox.tasks;
      
      // Map tasks to simplified objects
      return inboxTasks.map(mapTask);
    `;
    
    try {
      return await this.executeScriptWithResult<Task[]>(script);
    } catch (error) {
      logger.error('Failed to get inbox tasks:', error);
      throw error;
    }
  }
}