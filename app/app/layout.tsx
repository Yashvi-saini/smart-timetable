import { ReactNode } from "react";

export default function AppLayout({
    children,
    modal,
}: {
    children: ReactNode;
    modal: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {children}
            {modal}
        </div>
    );
}
