// import mongoose, { Schema } from "mongoose";

// export interface IProperty {
//     slug: string;
//     coverPhoto: string;
//     price: number;
//     rentFrequency: string;
//     rooms: number;
//     title: string;
//     baths: number;
//     area: number;
//     agency: string;
//     isVerified: boolean;
//     externalID: string;
//     publishedAt?: Date;
//     updatedAt?: Date;
//     _id?: string;
// }

// export const PropertySchema = new Schema<IProperty>({
//     slug: { type: String, required: true, unique: true },
//     coverPhoto: { type: String, required: true },
//     price: { type: Number, required: true },
//     rentFrequency: { type: String, required: true },
//     rooms: { type: Number, required: true },
//     title: { type: String, required: true },
//     baths: { type: Number, required: true },
//     area: { type: Number, required: true },
//     agency: { type: String, required: true },
//     isVerified: { type: Boolean, required: true },
//     externalID: { type: String, required: true },
//     publishedAt: { type: Date },
//     updatedAt: { type: Date }
// });

// export const PropertyModal = mongoose.models?.Property || mongoose.model("Property", PropertySchema);
import mongoose, { Schema, Document } from "mongoose";

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
] as const;
const pT = [
  "apartment",
  "townhouses",
  "villas",
  "penthouses",
  "hotel_apartments",
  "villa_compound",
  "residential_plot",
  "residential_floor",
  "residential_building",
] as const;
type TP = typeof propertyTypes[number]["value"];
let a: TP;

export interface IProperty {
  _id: string;
  show: boolean;
  state: string;
  purpose: 'for-sale' | 'for-rent';
  pType: TP;
  price: number;
  rentFrequency?: string | null;
  referenceNumber?: string;
  permitNumber: string;
  projectNumber?: string | null;
  nearby?: string[];
  highlights?: string[];
  title: string;
  description: string;
  slug: string;
  category: string[];
  location: {
    state: string;
    city?: string;
    pincode?: string;
    street?: string;
    landmark?: string;
    full: string;
  }
  coordinates: {
    lat: number;
    lng: number;
  };
  agency?: {
    name: string;
    logo: string;
  };
  coverPhoto: {
    url: string;
    title: string;
  },
  photos:
  {
    url: string;
    title: string;
    description?: string;
  }[]
  ,
  createdAt: Date;
  updatedAt: Date;
  rooms: number;
  area: number;
}

const PropertySchema = new Schema<IProperty>(
  {
    show: { type: Boolean, required: true },
    state: { type: String, required: true },
    purpose: { type: String, enum: ["for-sale", "for-rent"], required: true },
    pType: { type: String, enum: pT, required: true },
    price: { type: Number, required: true },
    rentFrequency: { type: String, default: null },
    referenceNumber: { type: String },
    permitNumber: { type: String, required: true },
    projectNumber: { type: String, default: null },
    nearby: { type: [String], default: null },
    highlights: { type: [String], default: null },
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: [String], required: true },
    location: {
      state: { type: String, required: true },
      city: { type: String },
      pincode: { type: String },
      street: { type: String },
      landmark: { type: String },
      full: { type: String, required: true },
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    agency: {
      name: { type: String },
      logo: { type: String },
    },
    coverPhoto: {
      url: { type: String, required: true },
      title: { type: String, required: true },
    },
    photos: [
      {
        url: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rooms: { type: Number, required: true },
    area: { type: Number, required: true },
  },
  { timestamps: true }
);

const Property = mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
