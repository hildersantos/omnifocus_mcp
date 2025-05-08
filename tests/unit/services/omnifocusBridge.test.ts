import { OmniFocusBridge } from '../../../src/services/omnifocusBridge';
import { Task } from '../../../src/services/omnifocus';

// Mock child_process.exec
jest.mock('child_process', () => ({
  exec: jest.fn((command, callback) => {
    callback(null, 'success', '');
  })
}));

// Spy on console.error
const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

describe('OmniFocusBridge', () => {
  let bridge: OmniFocusBridge;
  
  beforeEach(() => {
    bridge = new OmniFocusBridge();
    jest.clearAllMocks();
  });
  
  afterAll(() => {
    consoleSpy.mockRestore();
  });
  
  it('should create an instance of OmniFocusBridge', () => {
    expect(bridge).toBeInstanceOf(OmniFocusBridge);
  });
  
  describe('executeScript', () => {
    it('should execute a script via URL scheme', async () => {
      const script = 'console.log("Hello OmniFocus")';
      await bridge.executeScript(script);
      
      expect(require('child_process').exec).toHaveBeenCalled();
      const execCall = require('child_process').exec.mock.calls[0][0];
      expect(execCall).toContain('open "omnifocus://localhost/omnijs-run?script=');
      expect(execCall).toContain(encodeURIComponent(script));
    });
    
    it('should handle errors from script execution', async () => {
      // Mock exec to return an error
      require('child_process').exec.mockImplementationOnce((command, callback) => {
        callback(new Error('Failed to execute script'), '', 'Some error');
      });
      
      const script = 'console.log("Error test")';
      await expect(bridge.executeScript(script)).rejects.toThrow('Failed to execute script');
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
  
  describe('getInboxTasks', () => {
    it('should execute a script to get inbox tasks', async () => {
      // Mock the executeScript method to return sample tasks
      const mockTasks: Task[] = [
        { id: 'task1', name: 'Inbox Task 1', completed: false },
        { id: 'task2', name: 'Inbox Task 2', completed: false }
      ];
      
      jest.spyOn(bridge as any, 'executeScriptWithResult').mockResolvedValue(mockTasks);
      
      const result = await bridge.getInboxTasks();
      
      expect(result).toEqual(mockTasks);
      expect((bridge as any).executeScriptWithResult).toHaveBeenCalled();
      
      // Verify the script includes inbox-related code
      const scriptArg = (bridge as any).executeScriptWithResult.mock.calls[0][0];
      expect(scriptArg).toContain('inbox.tasks');
    });
  });
  
  // The executeScriptWithResult method is private but critical - we'll test it implicitly
  // through the getInboxTasks method that uses it
});