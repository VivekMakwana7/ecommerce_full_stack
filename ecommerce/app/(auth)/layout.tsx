import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-muted/20 p-4 md:p-8">
            {children}
        </div>
    );
}
