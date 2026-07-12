/**
 * Determines if a text contains only a specific pattern.
 * @param text the text to check
 * @param pattern the pattern to check against
 */
export function textContainsOnlyPattern(text: string, pattern: RegExp): boolean {
	const trimmed = text.trim();
	if (trimmed.length === 0) {
		return false;
	}
	const withoutLinks = trimmed.replace(pattern, '');
	const remainder = withoutLinks.replace(/[\s,.\-–—]/g, '');
	return remainder.length === 0;
}

/**
 * Determines if a text contains only wikilinks.
 * @param text the text to check
 */
export function textContainsOnlyWikilinks(text: string): boolean {
	const wikilinkPattern = /\[\[.*?\]\]/g;
	return textContainsOnlyPattern(text, wikilinkPattern);
}