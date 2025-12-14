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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    color: string[];
    size: string[];
    quantity: number;
    categoryId: number;
    subCategoryId: number;
    image?: string;
    // relations
    category?: { name: string };
    subCategory?: { name: string };
}

interface Category {
    id: number;
    name: string;
    children?: Category[];
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        color: '', // managed by separate state
        size: '',  // managed by separate state
        quantity: '',
        categoryId: '',
        subCategoryId: '',
        image: null as File | null
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Dynamic fields for colors and sizes
    const [colors, setColors] = useState<string[]>(['']);
    const [sizes, setSizes] = useState<string[]>(['']);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            const data = response.data.data || response.data;
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            const data = response.data.data || response.data;
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Helper to format image URL
    const getImageUrl = (path?: string) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        // Replace backslashes with forward slashes
        const normalizedPath = path.replace(/\\/g, '/');
        // Ensure strictly one slash between domain and path
        return `http://localhost:3000/${normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath}`;
    };

    const handleOpenDialog = (product?: Product) => {
        if (product) {
            setEditingProduct(product);

            // Robust handling for color/size whether they come as array or string
            let initialColors: string[] = [''];
            if (Array.isArray(product.color)) {
                initialColors = product.color;
            } else if (typeof product.color === 'string') {
                initialColors = (product.color as string).split(',');
            }

            let initialSizes: string[] = [''];
            if (Array.isArray(product.size)) {
                initialSizes = product.size;
            } else if (typeof product.size === 'string') {
                initialSizes = (product.size as string).split(',');
            }

            setColors(initialColors.length > 0 ? initialColors : ['']);
            setSizes(initialSizes.length > 0 ? initialSizes : ['']);

            setFormData({
                name: product.name,
                description: product.description,
                price: String(product.price),
                color: '',
                size: '',
                quantity: String(product.quantity),
                categoryId: String(product.categoryId),
                subCategoryId: String(product.subCategoryId || ''),
                image: null
            });

            setImagePreview(getImageUrl(product.image));

        } else {
            setEditingProduct(null);
            setColors(['']);
            setSizes(['']);
            setFormData({
                name: '',
                description: '',
                price: '',
                color: '',
                size: '',
                quantity: '',
                categoryId: '',
                subCategoryId: '',
                image: null
            });
            setImagePreview(null);
        }
        setIsDialogOpen(true);
    };

    const handleOpenDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteDialogOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleColorChange = (index: number, value: string) => {
        const newColors = [...colors];
        newColors[index] = value;
        setColors(newColors);
    };

    const addColorField = () => {
        setColors([...colors, '']);
    };

    const removeColorField = (index: number) => {
        const newColors = colors.filter((_, i) => i !== index);
        setColors(newColors.length ? newColors : ['']);
    };

    const handleSizeChange = (index: number, value: string) => {
        const newSizes = [...sizes];
        newSizes[index] = value;
        setSizes(newSizes);
    };

    const addSizeField = () => {
        setSizes([...sizes, '']);
    };

    const removeSizeField = (index: number) => {
        const newSizes = sizes.filter((_, i) => i !== index);
        setSizes(newSizes.length ? newSizes : ['']);
    };

    const handleSubmit = async () => {
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);

            // Join dynamic fields
            const colorString = colors.filter(c => c.trim() !== '').join(',');
            const sizeString = sizes.filter(s => s.trim() !== '').join(',');

            data.append('color', colorString);
            data.append('size', sizeString);

            data.append('quantity', formData.quantity);
            if (formData.categoryId) data.append('categoryId', formData.categoryId);
            if (formData.subCategoryId) data.append('subCategoryId', formData.subCategoryId);

            if (formData.image) {
                data.append('image', formData.image);
            }

            if (editingProduct) {
                await api.patch(`/products/${editingProduct.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success("Product updated successfully");
            } else {
                await api.post('/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success("Product created successfully");
            }

            setIsDialogOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error("Failed to save product.");
        }
    };

    const handleDelete = async () => {
        if (!selectedProduct) return;
        try {
            await api.delete(`/products/${selectedProduct.id}`);
            toast.success("Product deleted successfully");
            setIsDeleteDialogOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error("Failed to delete product.");
        }
    };

    const subCategories = categories.find(c => String(c.id) === formData.categoryId)?.children || [];

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">
                        Manage your inventory and product listings.
                    </p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
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
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="h-20 w-20 relative rounded overflow-hidden bg-muted">
                                                {product.image ? (
                                                    <img
                                                        src={getImageUrl(product.image) || ''}
                                                        alt={product.name}
                                                        className="object-cover h-full w-full"
                                                    />
                                                ) : (
                                                    <ImageIcon className="h-8 w-8 m-auto mt-6 text-muted-foreground" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell className="max-w-xs truncate" title={product.description}>{product.description}</TableCell>
                                        <TableCell>
                                            {product.category?.name}
                                            {product.subCategory && <span className="text-muted-foreground text-xs ml-1">({product.subCategory.name})</span>}
                                        </TableCell>
                                        <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleOpenDelete(product)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
                        <DialogDescription>
                            {editingProduct ? "Update product details." : "Create a new product listing."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Label htmlFor="image" className="cursor-pointer">
                                <div className={cn(
                                    "h-40 w-40 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors relative overflow-hidden",
                                    !imagePreview && "border-muted-foreground/25"
                                )}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="text-center space-y-2 text-muted-foreground">
                                            <ImageIcon className="h-8 w-8 mx-auto" />
                                            <span className="text-xs">Upload Image</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </Label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Product Name" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="0.00" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Product Details..." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Category</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value, subCategoryId: '' })}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Sub Category</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.subCategoryId}
                                    onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value })}
                                    disabled={!formData.categoryId || subCategories.length === 0}
                                >
                                    <option value="">Select Sub Category</option>
                                    {subCategories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Colors */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>Color(s)</Label>
                                    <Button type="button" variant="ghost" size="sm" onClick={addColorField} className="h-6 px-2 text-primary">
                                        <Plus className="h-3 w-3 mr-1" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                                    {colors.map((color, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={color}
                                                onChange={(e) => handleColorChange(index, e.target.value)}
                                                placeholder="e.g. Red"
                                            />
                                            {colors.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeColorField(index)} tabIndex={-1}>
                                                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>Size(s)</Label>
                                    <Button type="button" variant="ghost" size="sm" onClick={addSizeField} className="h-6 px-2 text-primary">
                                        <Plus className="h-3 w-3 mr-1" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                                    {sizes.map((size, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={size}
                                                onChange={(e) => handleSizeChange(index, e.target.value)}
                                                placeholder="e.g. L"
                                            />
                                            {sizes.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeSizeField(index)} tabIndex={-1}>
                                                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input id="quantity" type="number" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} placeholder="0" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit}>{editingProduct ? "Update Product" : "Create Product"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete the product "{selectedProduct?.name}". This action cannot be undone.
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
