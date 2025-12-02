/**
 * File System Utilities
 * 
 * Provides utilities for file and directory operations used during code generation.
 * Based on the original implementation from leds-tools-spark-lib.
 * 
 * @module utils/file-utils
 * @version 1.0.0
 */

import path from 'path';
import fs from 'fs';

/**
 * Creates a directory path recursively
 * 
 * Creates all directories in the path, similar to 'mkdir -p' in Unix.
 * If the directory already exists, it does nothing (idempotent operation).
 * 
 * @param {...string} args - Path segments to join and create
 * @returns {string} The created path
 * 
 * @example
 * ```typescript
 * const modulePath = createPath('./src/modules', 'User', 'api')
 * // Creates: ./src/modules/User/api
 * // Returns: './src/modules/User/api'
 * ```
 * 
 * @remarks
 * - Safe to call multiple times (idempotent)
 * - Creates parent directories automatically
 * - Works with both absolute and relative paths
 */
export function createPath(...args: string[]): string {
    const fullPath = path.join(...args);
    
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
    
    return fullPath;
}

/**
 * Writes content to a file
 * 
 * Creates the file at the specified path with the given content.
 * Creates parent directories automatically if they don't exist.
 * 
 * @param {string} filePath - Absolute or relative path to the file
 * @param {string} content - Content to write to the file
 * 
 * @example
 * ```typescript
 * writeFile('./src/modules/User/api/user.ts', generatedCode)
 * ```
 * 
 * @remarks
 * - Overwrites existing files
 * - Creates parent directories automatically
 * - Uses UTF-8 encoding
 */
export function writeFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    createPath(dir);
    fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Checks if a path exists
 * 
 * @param {string} targetPath - Path to check
 * @returns {boolean} True if path exists, false otherwise
 */
export function pathExists(targetPath: string): boolean {
    return fs.existsSync(targetPath);
}

/**
 * Capitalizes the first letter of a string
 * 
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 * 
 * @example
 * ```typescript
 * capitalizeString('user') // 'User'
 * capitalizeString('product') // 'Product'
 * ```
 */
export function capitalizeString(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
