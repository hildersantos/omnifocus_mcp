import { createLogger } from '../../../src/utils/logger';

describe('Logger utility', () => {
  // Mock process.stderr.write
  const originalStderrWrite = process.stderr.write;
  let stderrWriteMock: jest.Mock;
  
  beforeEach(() => {
    stderrWriteMock = jest.fn();
    process.stderr.write = stderrWriteMock;
  });
  
  afterEach(() => {
    process.stderr.write = originalStderrWrite;
  });
  
  it('should create a logger with the provided namespace', () => {
    const logger = createLogger('test');
    expect(logger).toBeDefined();
    expect(logger.namespace).toBe('test');
  });

  it('should have log methods', () => {
    const logger = createLogger('test');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.warn).toBe('function');
  });
  
  it('should write log messages to stderr', () => {
    const logger = createLogger('test');
    logger.info('Test message');
    expect(stderrWriteMock).toHaveBeenCalledWith('[test] INFO: Test message \n');
    
    logger.error('Error message');
    expect(stderrWriteMock).toHaveBeenCalledWith('[test] ERROR: Error message \n');
  });
  
  it('should stringify objects in log messages', () => {
    const logger = createLogger('test');
    const testObj = { foo: 'bar' };
    logger.info('Object:', testObj);
    expect(stderrWriteMock).toHaveBeenCalledWith('[test] INFO: Object: {"foo":"bar"}\n');
  });
});