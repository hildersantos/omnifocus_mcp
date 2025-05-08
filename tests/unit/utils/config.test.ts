import { getConfig } from '../../../src/utils/config';

describe('Config utility', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should provide default configuration', () => {
    const config = getConfig();
    expect(config).toBeDefined();
    expect(config.port).toBe(3000);
    expect(config.logLevel).toBe('info');
  });

  it('should use environment variables if provided', () => {
    process.env.PORT = '4000';
    process.env.LOG_LEVEL = 'debug';
    
    const config = getConfig();
    expect(config.port).toBe(4000);
    expect(config.logLevel).toBe('debug');
  });
});