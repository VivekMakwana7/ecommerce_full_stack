'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Package,
} from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const sidebarNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Products',
        href: '/dashboard/products',
        icon: ShoppingBag,
    },
    {
        title: 'Orders',
        href: '/dashboard/orders',
        icon: Package,
    },
    {
        title: 'Users',
        href: '/dashboard/users',
        icon: Users,
    },
    {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/login');
        router.refresh();
    };

    return (
        <div className="flex h-screen border-r bg-muted/10 w-64 flex-col">
            <div className="p-6 border-b">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl font-bold tracking-tight">AdminPanel</span>
                </Link>
            </div>
            <ScrollArea className="flex-1 px-4 py-4">
                <nav className="flex flex-col gap-2">
                    {sidebarNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                        >
                            <Button
                                variant={pathname === item.href ? 'secondary' : 'ghost'}
                                className={cn(
                                    'w-full justify-start gap-2',
                                    pathname === item.href && 'bg-secondary'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
            <div className="p-4 border-t">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
