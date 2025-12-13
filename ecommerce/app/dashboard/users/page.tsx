'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { DataTable } from '@/components/ui/data-table';
import { User, createColumns } from './columns';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

export default function UsersPage() {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editForm, setEditForm] = useState({ name: '', number: '' });

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            // API returns { data: [...], code: 200 }
            // We need to pass the array to setData
            const users = response.data.data || response.data;
            setData(Array.isArray(users) ? users : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error("Failed to fetch users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setEditForm({ name: user.name, number: user.number });
        setIsEditOpen(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const submitEdit = async () => {
        if (!selectedUser) return;
        try {
            await api.patch(`/users/${selectedUser.id}`, editForm);
            toast.success("User updated successfully.");
            setIsEditOpen(false);
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error("Failed to update user.");
        }
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;
        try {
            await api.delete(`/users/${selectedUser.id}`);
            toast.success("User deleted successfully.");
            setIsDeleteOpen(false);
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error("Failed to delete user.");
        }
    };

    const columns = createColumns({ onEdit: handleEdit, onDelete: handleDelete });

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        Here's a list of your users!
                    </p>
                </div>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <DataTable columns={columns} data={data} />
            )}

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to the user's profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Number
                            </Label>
                            <Input
                                id="number"
                                value={editForm.number}
                                onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={submitEdit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the user account
                            and remove their data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
