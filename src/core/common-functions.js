/**
 * Common functions module.
 * @module
 */

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const wait = ms => new Promise(callback => setTimeout(callback, ms));

export const delay = callback => setTimeout(callback, 10);

export const nop = () => {};

export const identity = x => x;

export const falsy = () => false;

export const truthy = () => true;

export const isNullOrEmpty = value => !value || value === null || value === '';
