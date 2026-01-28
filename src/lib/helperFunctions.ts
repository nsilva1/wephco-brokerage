/**
 * Calculates the relative time difference between a given date and now.
 * Supports Date objects, ISO strings, or Firebase Timestamps.
 */
export const getRelativeTime = (date: any): string => {
    // 1. Handle Firestore Timestamp objects
    let dateObj: Date;
    if (date && typeof date.toDate === 'function') {
        dateObj = date.toDate();
    } else {
        dateObj = new Date(date);
    }

    // 2. Fallback for invalid dates
    if (isNaN(dateObj.getTime())) return 'unknown time';

    const now = new Date().getTime();
    const then = dateObj.getTime();
    const diffInSeconds = Math.floor((then - now) / 1000);

    const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ];

    for (const { unit, seconds } of units) {
        if (Math.abs(diffInSeconds) >= seconds || unit === 'second') {
            const value = Math.floor(diffInSeconds / seconds);
            const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
            return rtf.format(value, unit);
        }
    }

    return 'just now';
};

/**
 * Formats a large number into a readable string with K, M, or B suffixes.
 * @param num - The number to format
 * @param digits - Number of decimal places to show (default: 1)
 */
export const formatCompactNumber = (
	num: number,
	digits: number = 1
): string => {
	if (!num) return '0';

	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'K' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'B' },
		{ value: 1e12, symbol: 'T' }, // Adding Trillion just in case!
	];

	// Find the highest threshold the number meets
	const item = lookup
		.slice()
		.reverse()
		.find((item) => {
			return Math.abs(num) >= item.value;
		});

	if (!item) return '0';

	// Use Intl to handle rounding and decimal formatting consistently
	const formatter = new Intl.NumberFormat('en', {
		minimumFractionDigits: 0,
		maximumFractionDigits: digits,
	});

	return formatter.format(num / item.value) + item.symbol;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};