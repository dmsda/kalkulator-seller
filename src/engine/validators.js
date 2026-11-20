/**
 * Tariff Configuration Validator
 * Sesuai spesifikasi PRD Section 7.1, 7.2, dan 16.
 */

export const VALID_BASIS = ['original_price', 'seller_discounted_price', 'order_subtotal', 'flat'];
export const VALID_UNITS = ['per_item', 'per_order'];
export const VALID_TYPES = ['percentage', 'fixed'];
export const VALID_STATUSES = ['verified', 'assumption', 'unverified', 'blocked'];

export function validateTariffConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object') {
    return { valid: false, errors: ['Configuration must be a non-null object'] };
  }

  // Root level validation
  if (!config.schemaVersion || typeof config.schemaVersion !== 'string') {
    errors.push('Missing or invalid schemaVersion (must be string)');
  }

  if (!config.platform || typeof config.platform !== 'string') {
    errors.push('Missing or invalid platform (must be string)');
  }

  if (!config.version || typeof config.version !== 'string') {
    errors.push('Missing or invalid version (must be string)');
  }

  if (!config.effectiveFrom || !/^\d{4}-\d{2}-\d{2}$/.test(config.effectiveFrom)) {
    errors.push('Missing or invalid effectiveFrom (must be YYYY-MM-DD)');
  }

  if (!config.lastVerified || !/^\d{4}-\d{2}-\d{2}$/.test(config.lastVerified)) {
    errors.push('Missing or invalid lastVerified (must be YYYY-MM-DD)');
  }

  if (!config.sourceUrl || typeof config.sourceUrl !== 'string') {
    errors.push('Missing or invalid sourceUrl (must be string URL)');
  }

  if (!config.status || !VALID_STATUSES.includes(config.status)) {
    errors.push(`Invalid status: ${config.status}. Allowed: ${VALID_STATUSES.join(', ')}`);
  }

  if (!Array.isArray(config.fees) || config.fees.length === 0) {
    errors.push('fees must be a non-empty array of fee rules');
  } else {
    config.fees.forEach((fee, index) => {
      const feePrefix = `fees[${index}] (${fee.id || 'unknown'})`;

      if (!fee.id || typeof fee.id !== 'string') {
        errors.push(`${feePrefix}: missing or invalid id`);
      }
      if (!fee.name || typeof fee.name !== 'string') {
        errors.push(`${feePrefix}: missing or invalid name`);
      }
      if (!VALID_TYPES.includes(fee.type)) {
        errors.push(`${feePrefix}: invalid type "${fee.type}". Allowed: ${VALID_TYPES.join(', ')}`);
      }
      if (fee.type === 'percentage') {
        if (typeof fee.rate !== 'number' || fee.rate < 0 || fee.rate > 1) {
          errors.push(`${feePrefix}: rate must be a number between 0 and 1`);
        }
      }
      if (fee.type === 'fixed') {
        if (typeof fee.amount !== 'number' || !Number.isInteger(fee.amount) || fee.amount < 0) {
          errors.push(`${feePrefix}: amount must be a non-negative integer Rupiah`);
        }
      }
      if (!VALID_BASIS.includes(fee.basis)) {
        errors.push(`${feePrefix}: invalid basis "${fee.basis}". Allowed: ${VALID_BASIS.join(', ')}`);
      }
      if (!VALID_UNITS.includes(fee.unit)) {
        errors.push(`${feePrefix}: invalid unit "${fee.unit}". Allowed: ${VALID_UNITS.join(', ')}`);
      }
      if (fee.cap !== null && fee.cap !== undefined) {
        if (typeof fee.cap !== 'number' || fee.cap < 0) {
          errors.push(`${feePrefix}: cap must be a positive number or null`);
        }
        if (!VALID_UNITS.includes(fee.capScope)) {
          errors.push(`${feePrefix}: capScope must be specified when cap is defined ('per_item' or 'per_order')`);
        }
      }
      if (typeof fee.required !== 'boolean') {
        errors.push(`${feePrefix}: required must be a boolean`);
      }
      if (typeof fee.isAssumption !== 'boolean') {
        errors.push(`${feePrefix}: isAssumption must be a boolean`);
      }
      if (!Array.isArray(fee.conditions)) {
        errors.push(`${feePrefix}: conditions must be an array`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
