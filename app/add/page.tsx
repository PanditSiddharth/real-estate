// app/properties/add/page.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ChevronsUpDown, Plus, X, MapPin, Upload } from "lucide-react";

// Form components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Form validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { ImageUpload } from "@/components/UploadImage";
import { MyField } from "@/components/FormField";

// Property types from your schema
const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "townhouses", label: "Townhouses" },
    { value: "villas", label: "Villas" },
    { value: "penthouses", label: "Penthouses" },
    { value: "hotel_apartments", label: "Hotel Apartments" },
    { value: "villa_compound", label: "Villa Compound" },
    { value: "residential_plot", label: "Residential Plot" },
    { value: "residential_floor", label: "Residential Floor" },
    { value: "residential_building", label: "Residential Building" }
];

// States (example - you can expand this list)
const states = [
    { value: "dubai", label: "Dubai" },
    { value: "abu_dhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
    { value: "ajman", label: "Ajman" },
];

// Form schema with validations
const formSchema = z.object({
    show: z.boolean().default(true),
    state: z.string().min(1, "State is required"),
    purpose: z.enum(["for-sale", "for-rent"], {
        required_error: "Purpose is required",
    }),
    pType: z.enum([
        "apartment",
        "townhouses",
        "villas",
        "penthouses",
        "hotel_apartments",
        "villa_compound",
        "residential_plot",
        "residential_floor",
        "residential_building",
    ], {
        required_error: "Property type is required",
    }),
    price: z.coerce.number().positive("Price must be positive"),
    rentFrequency: z.string().nullable().optional(),
    referenceNumber: z.string().optional(),
    permitNumber: z.string().min(1, "Permit number is required"),
    projectNumber: z.string().nullable().optional(),
    nearby: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    slug: z.string()
        .min(5, "Slug must be at least 5 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    category: z.array(z.string()).min(1, "At least one category is required"),
    location: z.object({
        state: z.string().min(1, "State is required"),
        city: z.string().optional(),
        pincode: z.string().optional(),
        street: z.string().optional(),
        landmark: z.string().optional(),
        full: z.string().min(5, "Full address is required"),
    }),
    coordinates: z.object({
        lat: z.coerce.number(),
        lng: z.coerce.number(),
    }),
    agency: z.object({
        name: z.string().optional(),
        logo: z.string().optional(),
    }).optional(),
    coverPhoto: z.object({
        url: z.string().url("Must be a valid URL"),
        title: z.string().min(1, "Cover photo title is required"),
    }),
    photos: z.array(
        z.object({
            url: z.string().url("Must be a valid URL"),
            title: z.string().min(1, "Photo title is required"),
            description: z.string().optional(),
        })
    ).min(1, "At least one photo is required"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    rooms: z.coerce.number().int().positive("Number of rooms must be positive"),
    area: z.coerce.number().positive("Area must be positive"),
    password: z.string()
});

export default function AddPropertyPage() {
    const router = useRouter();
    const [newNearby, setNewNearby] = useState("");
    const [newHighlight, setNewHighlight] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);

    // Initialize the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            show: true,
            state: "",
            purpose: "for-sale",
            pType: "apartment",
            price: 0,
            rentFrequency: null,
            nearby: [],
            highlights: [],
            category: [],
            location: {
                state: "",
                full: "",
            },
            coordinates: {
                lat: 0,
                lng: 0,
            },
            coverPhoto: {
                url: "",
                title: "",
            },
            photos: [],
            rooms: 1,
            area: 0,
        },
    });

    // Form submission handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);

            // Generate a slug if not provided
            if (!values.slug) {
                values.slug = values.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, '')
                    .replace(/\s+/g, '-');
                form.setValue('slug', values.slug);
            }

            // Add timestamp
            values.updatedAt = new Date();
            if (!values.createdAt) {
                values.createdAt = new Date();
            }

            console.log("Form values:", values);

            // API call to save property
            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to add property');
            }

            const data = await response.json();

            toast.success("Property has been added successfully");

            // Redirect to property list
            router.push('/properties');
            router.refresh();
        } catch (error) {
            console.error('Error adding property:', error);
            toast.error(
                error instanceof Error ? error.message : "Failed to add property",
            );
        } finally {
            setLoading(false);
        }
    }

    // Helper functions for adding array items
    const addNearby = () => {
        if (newNearby && !form.getValues().nearby?.includes(newNearby)) {
            const currentNearby = form.getValues().nearby || [];
            form.setValue('nearby', [...currentNearby, newNearby]);
            setNewNearby("");
        }
    };

    const removeNearby = (item: string) => {
        const currentNearby = form.getValues().nearby || [];
        form.setValue('nearby', currentNearby.filter(i => i !== item));
    };

    const addHighlight = () => {
        if (newHighlight && !form.getValues().highlights?.includes(newHighlight)) {
            const currentHighlights = form.getValues().highlights || [];
            form.setValue('highlights', [...currentHighlights, newHighlight]);
            setNewHighlight("");
        }
    };

    const removeHighlight = (item: string) => {
        const currentHighlights = form.getValues().highlights || [];
        form.setValue('highlights', currentHighlights.filter(i => i !== item));
    };

    const addCategory = () => {
        if (newCategory && !form.getValues().category?.includes(newCategory)) {
            const currentCategories = form.getValues().category || [];
            form.setValue('category', [...currentCategories, newCategory]);
            setNewCategory("");
        }
    };

    const removeCategory = (item: string) => {
        const currentCategories = form.getValues().category || [];
        form.setValue('category', currentCategories.filter(i => i !== item));
    };

    // Photo management
    const addPhoto = () => {
        const photos = form.getValues().photos || [];
        form.setValue('photos', [...photos, { url: "", title: "", description: "" }]);
    };

    const removePhoto = (index: number) => {
        const photos = form.getValues().photos || [];
        form.setValue('photos', photos.filter((_, i) => i !== index));
    };

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="show"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Visibility</FormLabel>
                                            <FormDescription>
                                                Make this property visible to users
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="purpose"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Purpose</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select purpose" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="for-sale">For Sale</SelectItem>
                                                <SelectItem value="for-rent">For Rent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <MyField form={form} name="title"
                                label="Property Title"
                                input={(field) => <Input placeholder="Luxury Apartment in Downtown" />
                                } />
                            <MyField
                                form={form}
                                name="slug"
                                label="Slug"
                                description="URL-friendly name for the property"
                                input={(field) => <Input placeholder="luxury-apartment-downtown" {...field} />}
                            />


                            <MyField
                                form={form}
                                name="pType"
                                label="Property Type"
                                input={(field) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select property type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {propertyTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            <MyField
                                form={form}
                                name="state"
                                label="Property State"
                                input={(field) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem key={state.value} value={state.value}>
                                                    {state.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />


                            <MyField
                                form={form}
                                name="price"
                                label="Price"
                                input={(field) => <Input type="number" placeholder="500000" {...field} />}
                            />


                            {form.watch("purpose") === "for-rent" && (
                                <MyField
                                    form={form}
                                    name="rentFrequency"
                                    label="Rent Frequency"
                                    input={(field) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="yearly">Yearly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="daily">Daily</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            )}

                            <MyField
                                form={form}
                                name="rooms"
                                label="Number of Rooms"
                                input={(field) => <Input type="number" placeholder="3" {...field} />}
                            />


                            <MyField
                                form={form}
                                name="area"
                                label="Area (sq ft)"
                                input={(field) => <Input type="number" placeholder="1200" {...field} />}
                            />


                            <MyField
                                form={form}
                                name="permitNumber"
                                label="Permit Number"
                                input={(field) => <Input placeholder="P-12345" {...field} />}
                            />

                            <MyField
                                form={form}
                                name="referenceNumber"
                                label="Reference Number"
                                description="Optional"
                                input={(field) => <Input placeholder="REF-5678" {...field} />}
                            />

                            <MyField
                                form={form}
                                name="projectNumber"
                                label="Project Number"
                                description="Optional"
                                input={(field) => <Input placeholder="PROJ-9012" {...field} value={field.value + ""} />}
                            />
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Description</h2>
                        <MyField
                            form={form}
                            name="description"
                            label="Property Description"
                            input={(field) => (
                                <Textarea placeholder="Describe the property in detail..." className="min-h-32" {...field} />
                            )}
                        />
                    </div>

                    {/* Categories Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {form.watch("category")?.map((item, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1">
                                    {item}
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(item)}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add category..."
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                            />
                            <Button type="button" size="sm" onClick={addCategory}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {form.formState.errors.category && (
                            <p className="text-sm font-medium text-destructive mt-2">
                                {form.formState.errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Location Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Location</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location.state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select state" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {states.map((state) => (
                                                    <SelectItem key={state.value} value={state.value}>
                                                        {state.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dubai Marina" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location.street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Al Marsa Street" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location.landmark"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Landmark</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Near Dubai Marina Mall" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location.pincode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pincode</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123456" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location.full"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Full Address</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Complete address of the property" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coordinates.lat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitude</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="any" placeholder="25.1234" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coordinates.lng"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitude</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="any" placeholder="55.1234" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Nearby & Highlights Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nearby Places */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Nearby Places</h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {form.watch("nearby")?.map((item, index) => (
                                    <Badge key={index} variant="secondary" className="px-3 py-1">
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeNearby(item)}
                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add nearby place..."
                                    value={newNearby}
                                    onChange={(e) => setNewNearby(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNearby())}
                                />
                                <Button type="button" size="sm" onClick={addNearby}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {form.watch("highlights")?.map((item, index) => (
                                    <Badge key={index} variant="secondary" className="px-3 py-1">
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeHighlight(item)}
                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add highlight..."
                                    value={newHighlight}
                                    onChange={(e) => setNewHighlight(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                                />
                                <Button type="button" size="sm" onClick={addHighlight}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Agency Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Agency Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="agency.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agency Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Premier Real Estate" {...field} />
                                        </FormControl>
                                        <FormDescription>Optional</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="agency.logo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agency Logo URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/logo.png" {...field} />
                                        </FormControl>
                                        <FormDescription>Optional</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Photos Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Photos</h2>

                        {/* Cover Photo */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Cover Photo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="coverPhoto.url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cover Photo URL</FormLabel>
                                            <FormControl>
                                                <ImageUpload {...field} onChange={field.onChange} img_src={field.value} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="coverPhoto.title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cover Photo Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Beautiful property view" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Additional Photos */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-medium">Additional Photos</h3>
                                <Button type="button" variant="outline" onClick={addPhoto}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Photo
                                </Button>
                            </div>
                            {form.watch("photos")?.map((_, index) => (
                                <Card key={index} className="mb-4">
                                    <CardContent className="pt-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium">Photo {index + 1}</h4>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removePhoto(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name={`photos.${index}.url`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Photo URL</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="https://example.com/photo.jpg" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`photos.${index}.title`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Photo Title</FormLabel>
                                                        <FormControl>


                                                            <Input placeholder="Kitchen view" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`photos.${index}.description`}
                                                render={({ field }) => (
                                                    <FormItem className="md:col-span-2">
                                                        <FormLabel>Photo Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Modern kitchen with granite countertops..." {...field} />
                                                        </FormControl>
                                                        <FormDescription>Optional</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {form.formState.errors.photos && (
                                <p className="text-sm font-medium text-destructive mt-2">
                                    {form.formState.errors.photos.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Agency Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">User Authentication</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button type="submit" className="px-8" disabled={loading}>
                            {loading ? "Adding Property..." : "Add Property"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}                                     