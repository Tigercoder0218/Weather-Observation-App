import { useStore } from "@nanostores/preact"
import { toastData } from "../store/weatherStore"
import { useEffect } from "preact/hooks"

export const Toaster = () => {
    const $toastData = useStore(toastData)

    useEffect(() => {
        setTimeout(async () => {
            toastData.set(null)
        }, 4000)
    }, [$toastData])

    const styles = {
        display: $toastData ? "flex" : "hidden",
        top: $toastData ? "4rem" : "0",
        opacity: $toastData ? "1" : "0",
        scale: $toastData ? "1" : "0.75",
    }

    return (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[9]">
            <div style={styles} className="relative flex justify-evenly items-center gap-4 bg-white w-fit h-fit px-4 py-2 rounded transition-all duration-300 ease-in-out">
                {$toastData?.status == "success" && <span className="text-[1.1em]">✅</span>}
                {$toastData?.status == "error" && <span className="text-[1.1em]">❌</span>}
                {$toastData?.status == "warn" && <span className="text-[1.1em]">⚠️</span>}

                <span className="text-black text-[1.1em] font-medium">{$toastData?.message}</span>
            </div>
        </div>
    )
}
