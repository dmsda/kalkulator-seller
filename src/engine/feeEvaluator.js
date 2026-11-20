/**
 * Fee Evaluator Engine
 * Sesuai PRD Bagian 7.2, 7.3, 8.1, 8.3
 */

function roundAmount(amount, policy = 'nearest') {
  if (policy === 'floor') return Math.floor(amount);
  if (policy === 'ceil') return Math.ceil(amount);
  return Math.round(amount);
}

function matchCondition(condition, context) {
  const { field, operator, value } = condition;
  const contextValue = context[field];

  if (operator === 'eq') {
    return contextValue === value;
  }
  if (operator === 'neq') {
    return contextValue !== value;
  }
  if (operator === 'in' && Array.isArray(value)) {
    return value.includes(contextValue);
  }
  return false;
}

export function evaluateFees({
  tariffConfig,
  price,
  effectivePrice,
  qty,
  storeType = 'non_star',
  category = 'cat_a',
  selectedPrograms = [],
  overrides = {},
  roundingPolicy = 'nearest',
}) {
  const feeRules = tariffConfig?.fees || [];
  const feeBreakdown = [];
  let totalMarketplaceFees = 0;
  let totalPerUnitFee = 0;

  const flags = {
    assumptionsUsed: Boolean(tariffConfig?.status === 'assumption'),
    cappedFees: false,
    overriddenFees: false,
  };

  const evalContext = {
    storeType,
    category,
    price,
    effectivePrice,
    qty,
  };

  for (const fee of feeRules) {
    // 1. Check conditions
    let isApplicable = false;

    if (fee.required) {
      if (!fee.conditions || fee.conditions.length === 0) {
        isApplicable = true;
      } else {
        isApplicable = fee.conditions.every((cond) => matchCondition(cond, evalContext));
      }
    } else {
      // Optional fee (e.g. Gratis Ongkir XTRA, Cashback XTRA)
      const isProgramSelected = selectedPrograms.some((prog) => {
        return fee.conditions && fee.conditions.some((c) => c.field === 'program' && c.value === prog);
      });
      isApplicable = isProgramSelected;
    }

    if (!isApplicable) {
      continue;
    }

    // 2. Check override
    const override = overrides[fee.id];
    let effectiveRate = fee.rate;
    let effectiveFixedAmount = fee.amount;
    let isOverridden = false;

    if (override !== undefined) {
      isOverridden = true;
      flags.overriddenFees = true;
      if (fee.type === 'percentage' && typeof override.rate === 'number') {
        effectiveRate = override.rate;
      } else if (fee.type === 'fixed' && typeof override.amount === 'number') {
        effectiveFixedAmount = Math.max(0, Math.round(override.amount));
      }
    }

    if (fee.isAssumption) {
      flags.assumptionsUsed = true;
    }

    // 3. Determine basis value
    let basisValue = 0;
    if (fee.basis === 'original_price') {
      basisValue = price;
    } else if (fee.basis === 'seller_discounted_price') {
      basisValue = effectivePrice;
    } else if (fee.basis === 'order_subtotal') {
      basisValue = effectivePrice * qty;
    } else if (fee.basis === 'flat') {
      basisValue = 1;
    }

    // 4. Calculate raw fee
    let rawAmount = 0;
    if (fee.type === 'percentage') {
      rawAmount = basisValue * effectiveRate;
    } else {
      rawAmount = effectiveFixedAmount;
    }

    // 5. Apply Cap & Unit
    let isCapped = false;
    let unitFee = 0;
    let totalFee = 0;

    if (fee.unit === 'per_item') {
      let perItemRaw = rawAmount;
      if (fee.cap !== null && fee.cap !== undefined && fee.capScope === 'per_item') {
        if (perItemRaw > fee.cap) {
          perItemRaw = fee.cap;
          isCapped = true;
          flags.cappedFees = true;
        }
      }
      unitFee = roundAmount(perItemRaw, roundingPolicy);
      totalFee = unitFee * qty;
    } else if (fee.unit === 'per_order') {
      let perOrderRaw = rawAmount;
      if (fee.cap !== null && fee.cap !== undefined && fee.capScope === 'per_order') {
        if (perOrderRaw > fee.cap) {
          perOrderRaw = fee.cap;
          isCapped = true;
          flags.cappedFees = true;
        }
      }
      totalFee = roundAmount(perOrderRaw, roundingPolicy);
      unitFee = qty > 0 ? roundAmount(totalFee / qty, roundingPolicy) : totalFee;
    }

    totalMarketplaceFees += totalFee;
    totalPerUnitFee += unitFee;

    feeBreakdown.push({
      id: fee.id,
      name: fee.name,
      type: fee.type,
      rate: effectiveRate,
      amount: effectiveFixedAmount,
      basis: fee.basis,
      unit: fee.unit,
      cap: fee.cap,
      isCapped,
      isOverridden,
      isAssumption: fee.isAssumption,
      unitFee,
      totalFee,
    });
  }

  return {
    feeBreakdown,
    totalMarketplaceFees,
    totalPerUnitFee,
    flags,
  };
}
