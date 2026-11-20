import { describe, it, expect } from 'vitest';
import { generateSkuCsv } from '../../src/utils/exportCsv.js';
import { validateJsonBackup } from '../../src/utils/backup.js';

describe('Storage & CSV Security (Phase 6 foundation)', () => {
  it('should sanitize dangerous leading characters to prevent CSV formula injection', () => {
    const maliciousItems = [
      {
        id: '1',
        name: '=SUM(A1:A10)', // Formula injection!
        platform: 'shopee',
        price: 50000,
        sellerDiscount: 0,
        hpp: 25000,
        qty: 1,
      },
      {
        id: '2',
        name: '+cmd|"/C calc"!A0', // Dangerous command injection!
        platform: 'shopee',
        price: 50000,
        sellerDiscount: 0,
        hpp: 25000,
        qty: 1,
      },
    ];

    const csv = generateSkuCsv(maliciousItems);

    // Should start with UTF-8 BOM
    expect(csv.startsWith('\uFEFF')).toBe(true);

    // Formula injection should be neutralized with prepended single quote
    expect(csv).toContain("'=SUM(A1:A10)");
    expect(csv).toContain("'+cmd|\"\"/C calc\"\"!A0");
  });

  it('should validate and clean JSON backup inputs safely', () => {
    const validJson = JSON.stringify({
      schemaVersion: '1.0.0',
      items: [
        {
          name: 'Produk Sehat',
          platform: 'tokopedia',
          price: 100000,
          hpp: 60000,
        },
      ],
    });

    const result = validateJsonBackup(validJson);
    expect(result.ok).toBe(true);
    expect(result.count).toBe(1);
    expect(result.items[0].name).toBe('Produk Sehat');
    expect(result.items[0].platform).toBe('tokopedia');
  });

  it('should reject invalid or oversized JSON backup safely', () => {
    const invalidJson = 'Not a json string';
    const result = validateJsonBackup(invalidJson);
    expect(result.ok).toBe(false);
    expect(result.error).toBeDefined();
  });
});
