'use client';

import { useState, useEffect, Fragment } from 'react';
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ChevronRight, ChevronDown, Loader2, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface Category {
    id: number;
    name: string;
    description: string;
    children?: Category[];
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentId: 'root' // 'root' or string id
    });

    const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

    const [openCombobox, setOpenCombobox] = useState(false);
    const [searchResults, setSearchResults] = useState<{ id: number, name: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    // Effect to debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (openCombobox) {
                // Fetch matches
                try {
                    const params = searchQuery ? `?q=${searchQuery}` : '';
                    const url = `/categories/search${params}`;
                    // Note: If no query, maybe we want to show some defaults? 
                    // Prompt says "Use this API for find Parent Category at add/edit time".
                    // Assuming empty query returns some list or we can default to flatCategories if API requires query.

                    const response = await api.get(url);
                    // Expected response structure from prompt: { data: [...], code: 200 } or similar list
                    const results = response.data.data || response.data || [];
                    const list = Array.isArray(results) ? results : [];
                    setSearchResults(list);
                } catch (err) {
                    console.error("Search failed", err);
                    setSearchResults([]);
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, openCombobox]);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            const data = response.data.data || response.data;
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error("Failed to fetch categories.");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleOpenDialog = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                description: category.description,
                parentId: 'root'
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                description: '',
                parentId: 'root'
            });
        }
        setIsDialogOpen(true);
    };

    const handleOpenDelete = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteDialogOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const payload: any = {
                name: formData.name,
                description: formData.description,
            };

            const parentId = formData.parentId === 'root' ? null : Number(formData.parentId);

            if (!editingCategory) {
                payload.parentId = parentId;
                await api.post('/categories', payload);
                toast.success("Category created successfully");
            } else {
                // For Update
                await api.patch(`/categories/${editingCategory.id}`, payload);
                toast.success("Category updated successfully");
            }

            setIsDialogOpen(false);
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error("Failed to save category.");
        }
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;
        try {
            await api.delete(`/categories/${selectedCategory.id}`);
            toast.success("Category deleted successfully");
            setIsDeleteDialogOpen(false);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error("Failed to delete category.");
        }
    };

    // Helper to flatten categories for the Select Dropdown
    const getFlatCategories = (cats: Category[], prefix = ''): { id: number, name: string }[] => {
        let flat: { id: number, name: string }[] = [];
        cats.forEach(cat => {
            flat.push({ id: cat.id, name: prefix + cat.name });
            if (cat.children && cat.children.length > 0) {
                flat = [...flat, ...getFlatCategories(cat.children, prefix + '-- ')];
            }
        });
        return flat;
    };

    const flatCategories = getFlatCategories(categories);

    // Recursive component for Table Rows
    const renderCategoryRows = (cats: Category[], depth = 0) => {
        return cats.map(cat => (
            <Fragment key={cat.id}>
                <TableRow>
                    <TableCell className="font-medium">
                        <div className="flex items-center" style={{ paddingLeft: `${depth * 20}px` }}>
                            {cat.children && cat.children.length > 0 ? (
                                <button onClick={() => toggleExpand(cat.id)} className="mr-2 p-1 hover:bg-muted rounded text-muted-foreground">
                                    {expandedCategories[cat.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </button>
                            ) : (
                                <span className="w-6 mr-2"></span>
                            )}
                            {cat.name}
                        </div>
                    </TableCell>
                    <TableCell>{cat.description}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleOpenDialog(cat)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleOpenDelete(cat)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
                {cat.children && cat.children.length > 0 && expandedCategories[cat.id] && (
                    renderCategoryRows(cat.children, depth + 1)
                )}
            </Fragment>
        ));
    };

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                    <p className="text-muted-foreground">
                        Manage your product categories and hierarchy.
                    </p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
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
                                <TableHead className="w-[40%]">Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                renderCategoryRows(categories)
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
                        <DialogDescription>
                            {editingCategory ? "Update the category details." : "Create a new category. You can choose a parent to nest it."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Electronics"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the category..."
                            />
                        </div>
                        {!editingCategory && (
                            <div className="grid gap-2">
                                <Label htmlFor="parent">Parent Category (Optional)</Label>
                                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openCombobox}
                                            className="w-full justify-between"
                                        >
                                            {formData.parentId && formData.parentId !== 'root'
                                                ? (
                                                    // Try to find name in flatCategories first (initially loaded) or searchResults
                                                    flatCategories.find((cat) => String(cat.id) === formData.parentId)?.name ||
                                                    searchResults.find((cat) => String(cat.id) === formData.parentId)?.name ||
                                                    formData.parentId
                                                )
                                                : "Select parent category..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command shouldFilter={false}>
                                            <CommandInput placeholder="Search category..." value={searchQuery} onValueChange={setSearchQuery} />
                                            <CommandList>
                                                <CommandEmpty>No category found.</CommandEmpty>
                                                <CommandGroup>
                                                    <CommandItem
                                                        value="root"
                                                        onSelect={() => {
                                                            setFormData({ ...formData, parentId: 'root' });
                                                            setOpenCombobox(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                formData.parentId === 'root' ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        None (Root Category)
                                                    </CommandItem>
                                                    {searchResults.map((cat) => (
                                                        <CommandItem
                                                            key={cat.id}
                                                            value={String(cat.id)}
                                                            onSelect={(currentValue) => {
                                                                setFormData({ ...formData, parentId: currentValue === formData.parentId ? "root" : currentValue });
                                                                setOpenCombobox(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    formData.parentId === String(cat.id) ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {cat.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Alert */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete the category and may affect products associated with it.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
