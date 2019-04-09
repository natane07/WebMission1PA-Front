import { LogManager } from 'aurelia-framework';

import { APPLICATIONTITLE } from 'config/app-config';

/**
 * Logging module.
 * @module
 */

/**
 * The global application logger.
 */
export const logger = LogManager.getLogger(APPLICATIONTITLE);
