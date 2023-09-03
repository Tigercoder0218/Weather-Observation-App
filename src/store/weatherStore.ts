import type { weatherType } from "../types/types";
import { atom } from "nanostores";

export const weather = atom<weatherType | null>(null)

export const imageCode = atom<string>("default")