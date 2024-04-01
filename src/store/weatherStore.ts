import type { weatherType } from "../types/types";
import { atom } from "nanostores";

export const weather = atom<weatherType | null>(null)

export const imageCode = atom<string | null>(null)

export const imperialUnit = atom<boolean>(false)

type ToastType = {
    status: "success" | "error" | "warn",
    message: string,
    autoClose?: number,
    position?: "top-center",
    toastID?: number,
}

export const toastData = atom<ToastType | null>(null)