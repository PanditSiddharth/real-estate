"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import millify from "millify";
import { Heart } from "lucide-react";
import { Bed, Bath, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DefaultImage from "../assets/images/house.webp";
import useDB from "./dls/useDB";
import { MdVerified } from "react-icons/md";

const Property = ({
  property,
  formSearch,
}: {
  property: any;
  formSearch?: boolean;
}) => {
  const [update, setupdate] = useState<number>(0);
  const { addFav } = useDB();

  const {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  } = property;

  const isFavorite = () => {
    if (typeof window !== "undefined" && localStorage.fav) {
      return JSON.parse(localStorage.fav).filter(
        (id: any) => id === externalID
      ).length >= 1;
    }
    return false;
  };

  const onFavClick = async (id: any) => {
    addFav(id);
    setupdate((p) => ++p);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 border-none bg-transparent hover:bg-gray-50 rounded-xl group">
      <div className="relative overflow-hidden rounded-xl">
        {/* Property Image */}
        <div className="relative h-52 w-full overflow-hidden rounded-xl">
        <Image
            src={coverPhoto ? coverPhoto.url : DefaultImage}
            alt={title || "Property"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavClick(externalID);
            }}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/80 backdrop-blur-sm p-2 transition-all duration-300 hover:bg-white"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${isFavorite() ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
            />
          </button>
          
          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 border-none px-3 py-1.5 text-sm font-medium">
              AED {millify(Number(price))}
              {rentFrequency && <span className="text-xs ml-1 font-normal opacity-75">/{rentFrequency}</span>}
            </Badge>
          </div>
        </div>
      </div>

      <Link href={`/${formSearch ? "searched" : "property"}/${externalID}`} passHref>
        <CardContent className="p-4 pt-5 pb-2 bg-transparent">
          {/* Title with verification badge */}
          <div className="flex items-start gap-2 mb-3">
            {isVerified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="mt-1 text-sky-500">
                      <MdVerified className="text-lg" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified Property</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <h3 className="font-medium text-gray-800 line-clamp-1">
              {title}
            </h3>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{rooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{baths}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{millify(Number(area))}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center px-4 py-3 bg-transparent">
          <span className="text-xs text-gray-400">
            {formSearch ? "Search Result" : "Featured"}
          </span>
          
          <Avatar className="h-6 w-6 border-none">
            <AvatarImage src={agency?.logo?.url} alt={agency?.name || "Agency"} />
            <AvatarFallback className="bg-gray-100 text-gray-400 text-xs">AG</AvatarFallback>
          </Avatar>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default Property;