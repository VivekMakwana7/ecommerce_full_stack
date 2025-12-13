import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-background">
                <Header />
                <div className="flex-1 p-8 space-y-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
