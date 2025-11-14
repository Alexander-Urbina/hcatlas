/**
 * Utility functions for converting consumption volumes to 3D scales
 */

/**
 * Convert volume (m³) to a scale factor for 3D objects
 * Uses cube root to maintain proportional volume
 * @param {number} volume - Volume in m³
 * @param {number} minScale - Minimum scale (default: 0.1)
 * @param {number} maxScale - Maximum scale (default: 10)
 * @returns {number} Scale factor
 */
export function volumeToScale(volume, minScale = 0.1, maxScale = 10) {
  if (!volume || volume <= 0) return minScale;
  
  // Cube root to get linear scale (volume = scale³)
  const scale = Math.cbrt(volume);
  
  // Clamp to reasonable bounds
  return Math.max(minScale, Math.min(maxScale, scale));
}

/**
 * Calculate height from volume for fixed base dimensions
 * @param {number} volume - Volume in m³
 * @param {number} baseWidth - Base width (default: 0.25)
 * @param {number} baseDepth - Base depth (default: 0.50)
 * @param {number} scaleFactor - Optional scaling factor to adjust height (default: 1)
 * @param {number} minHeight - Minimum height (default: 0.1)
 * @param {number} maxHeight - Maximum height (default: 20)
 * @returns {number} Height value
 */
export function volumeToHeight(volume, baseWidth = 0.25, baseDepth = 0.50, scaleFactor = 1, minHeight = 0.1, maxHeight = 20) {
  if (!volume || volume <= 0) return minHeight;
  
  // Base area = width * depth
  // Height = volume / baseArea
  const baseArea = baseWidth * baseDepth;
  let height = (volume / baseArea) * scaleFactor;
  
  // Clamp to reasonable bounds
  return Math.max(minHeight, Math.min(maxHeight, height));
}

/**
 * Calculate cube dimensions from volume (all sides equal)
 * @param {number} volume - Volume in m³
 * @param {number} minSize - Minimum size (default: 0.1)
 * @param {number} maxSize - Maximum size (default: 10)
 * @returns {number} Size for all dimensions (width, depth, height)
 */
export function volumeToCubeSize(volume, minSize = 0.1, maxSize = 10) {
  if (!volume || volume <= 0) return minSize;
  
  // Cube root to get equal dimensions (volume = size³)
  const size = Math.cbrt(volume);
  
  // Clamp to reasonable bounds
  return Math.max(minSize, Math.min(maxSize, size));
}

/**
 * Get color for a consumption category
 * @param {string} category - Category name (water, energy, concrete, food, waste)
 * @returns {string} Hex color code
 */
export function getCategoryColor(category) {
  const colors = {
    water: '#3498db',      // Blue
    energy: '#f39c12',     // Orange
    concrete: '#95a5a6',   // Gray
    food: '#e74c3c',       // Red
    waste: '#9b59b6',      // Purple
  };
  
  return colors[category] || '#ffffff';
}

/**
 * Get position offset for comparison mode
 * @param {number} index - Index of the country (0, 1, 2...)
 * @param {number} spacing - Spacing between country centers (default: 5)
 * @returns {number} X position offset for country center
 */
export function getComparisonPosition(index, spacing = 5) {
  // For 2 countries: index 0 at -spacing/2, index 1 at +spacing/2
  // For 3 countries: index 0 at -spacing, index 1 at 0, index 2 at +spacing
  if (index === 0) {
    return -spacing; // First country to the left
  } else if (index === 1) {
    return 0; // Second country at center
  } else {
    return spacing; // Third country to the right
  }
}

