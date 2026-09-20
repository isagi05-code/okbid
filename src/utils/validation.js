export function isValidUrl(string) {
  if (!string) return false;
  try {
    const url = new URL(string.startsWith('http') ? string : `https://${string}`);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateProductSubmission(data, minAllowedBid = 200) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Product name must be at least 2 characters';
  } else if (data.name.length > 50) {
    errors.name = 'Product name must not exceed 50 characters';
  }

  if (!data.website || !isValidUrl(data.website)) {
    errors.website = 'Please provide a valid website URL (e.g. https://yourstartup.com)';
  }

  if (!data.tagline || data.tagline.trim().length < 10) {
    errors.tagline = 'Tagline must be at least 10 characters';
  } else if (data.tagline.length > 120) {
    errors.tagline = 'Tagline must not exceed 120 characters';
  }

  if (!data.category) {
    errors.category = 'Please select a valid category';
  }

  const numericBid = Number(data.bid);
  if (isNaN(numericBid) || numericBid < minAllowedBid) {
    errors.bid = `Minimum initial bid is $${minAllowedBid}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
