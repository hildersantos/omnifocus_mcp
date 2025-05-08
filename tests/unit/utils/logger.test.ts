import { createLogger } from '../../../src/utils/logger';

describe('Logger utility', () => {
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
});