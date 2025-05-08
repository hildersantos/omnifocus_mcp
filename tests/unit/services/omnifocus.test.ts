import { OmniFocusService } from '../../../src/services/omnifocus';

describe('OmniFocus Service', () => {
  it('should create an OmniFocus service', () => {
    const service = new OmniFocusService();
    expect(service).toBeDefined();
  });

  it('should have a method to get tasks', async () => {
    const service = new OmniFocusService();
    // Since we can't actually connect to OmniFocus in tests, 
    // we just verify the method exists and returns something
    const result = await service.getTasks();
    expect(result).toBeDefined();
  });

  it('should have a method to get projects', async () => {
    const service = new OmniFocusService();
    const result = await service.getProjects();
    expect(result).toBeDefined();
  });
});