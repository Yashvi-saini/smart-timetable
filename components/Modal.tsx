"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-white">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => router.back()}
            />

            <div className="relative transform overflow-hidden rounded-2xl bg-slate-900 border border-white/10 text-left shadow-2xl transition-all w-full max-w-lg">
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={() => router.back()}
                        className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
