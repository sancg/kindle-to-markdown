import { describe, expect, it } from 'vitest';
import { Core } from '../src/index.ts';
const mockData = `Dive into Refactoring  
    - Your Highlight on page 6-6 | Added on Wednesday, April 5, 2023 2:54:05 AM
    
    Therefore, it is necessary to get rid of code smells while they are still small.`;
const core = new Core('');

describe('the clipping.txt structure', async () => {
  it('should be an array', async () => {
    const result = await core.DataStructure(mockData);

    expect(Array.isArray(result)).toBeTruthy();
  });
});
