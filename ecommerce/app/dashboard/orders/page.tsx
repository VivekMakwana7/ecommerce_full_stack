'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, Package } from 'lucide-react';


interface User {
    id: number;
    email: string;
    name: string;
}

interface Product {
    id: number;
    name: string;
    image: string;
}

interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    size: string;
    color: string;
    product: Product;
}

interface Order {
    id: number;
    totalAmount: string;
    status: string;
    shippingAddress: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    orderItems: OrderItem[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            const data = response.data; // Assuming response is directly the array based on user request example
            // If it's wrapped in data property like products: response.data.data
            // The user example shows the array at top level response [ ... ]
            // However, usually NestJS standard response might wrap it. 
            // Looking at previous products code: response.data.data || response.data
            // I'll stick to that safety check.
            const ordersData = Array.isArray(data) ? data : (data.data || []);
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PENDING': return 'secondary'; // Valid variant for Badge
            case 'COMPLETED': return 'default'; // Success usually green, default in shadcn is primary (black). 
            // If we want specific colors we might need className. 
            // standard shadcn badge variants: default, secondary, destructive, outline.
            case 'CANCELLED': return 'destructive';
            case 'PROCESSING': return 'outline';
            default: return 'secondary';
        }
    };

    // Helper to format currency
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(amount));
    };

    const formatDate = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(dateString));
        } catch (e) {
            return 'Invalid Date';
        }
    };

    const formatDateTime = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(new Date(dateString));
        } catch (e) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
                    <p className="text-muted-foreground">
                        View and manage customer orders.
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No ordes found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">#{order.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.user?.name || 'Unknown'}</span>
                                                <span className="text-xs text-muted-foreground">{order.user?.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusColor(order.status) as any}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                                        <TableCell>
                                            {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(order)}>
                                                <Eye className="h-4 w-4 mr-2" /> View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Order Details #{selectedOrder?.id}</DialogTitle>
                        <DialogDescription>
                            Placed on {selectedOrder?.createdAt && formatDateTime(selectedOrder.createdAt)}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h4 className="font-semibold mb-1">Customer</h4>
                                    <p>{selectedOrder.user?.name}</p>
                                    <p className="text-muted-foreground">{selectedOrder.user?.email}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Shipping Address</h4>
                                    <p className="text-muted-foreground">{selectedOrder.shippingAddress}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3">Order Items</h4>
                                <div className="space-y-3">
                                    {selectedOrder.orderItems.map((item) => (
                                        <div key={item.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                                            <div className="flex gap-3">
                                                <div className="h-16 w-16 bg-muted rounded overflow-hidden shrink-0">
                                                    {item.product.image ? (
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-8 w-8 m-auto mt-4 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.product.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Size: {item.size} | Color: {item.color}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Qty: {item.quantity} x {formatCurrency(item.price)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="font-medium">
                                                {formatCurrency(Number(item.price) * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span>Total Amount</span>
                                    <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

