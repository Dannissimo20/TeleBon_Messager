export const INIT = "INIT";
export const PENDING = "PENDING";
export const FULFILLED = "FULFILLED";
export const REJECTED = "REJECTED";

const STATES = [INIT, PENDING, FULFILLED, REJECTED];

export type STATE = (typeof STATES)[number];
