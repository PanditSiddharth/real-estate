"use client";

import { useEffect, useState } from "react";
import { MdSell } from "react-icons/md";
import { Home as HomeIcon, Building, Filter } from "lucide-react";
import Agents from "../comps/Agents";
import Banner from "../comps/dls/Banner/Banner";
import FooterLinks from "../comps/FooterLinks";
import HomeSearch from "../comps/HomeSearch";
import Property from "../comps/Property";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Home({ propertyForSale, propertyForRent }: any) {
  const [count, setCount] = useState(false);
  
  useEffect(() => {
    if (!localStorage.fav) {
      localStorage.setItem("fav", "");
    }
    setCount(true);
  }, []);

  const SectionTitle = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-2 mb-6">
      <div className="bg-sky-100 p-2 rounded-lg">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800">{text}</h2>
      <Separator className="flex-1 ml-4" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Card className="mb-12 bg-gradient-to-r from-sky-50 to-blue-50 border-none shadow-md">
          <CardContent className="pt-8 pb-8 px-8">
            <div className="flex flex-col items-center text-center">
              <Badge variant="outline" className="bg-sky-100 text-sky-800 mb-4 px-4 py-1 text-sm">
                Find Your Dream Home
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Explore homes with us
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Discover a place youll love to call home. Browse our extensive collection of properties.
              </p>
              <HomeSearch />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="rent" className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Properties</h2>
            <TabsList>
              <TabsTrigger value="rent" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-800">
                <Building className="mr-2 h-4 w-4" />
                For Rent
              </TabsTrigger>
              <TabsTrigger value="sale" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-800">
                <MdSell className="mr-2 h-4 w-4" />
                For Sale
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="rent" className="mt-0">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {count &&
                propertyForRent
                  .slice(0, 6)
                  .map((property: any, index: any) => (
                    <Property property={property} key={property._id} />
                  ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                View All Rental Properties
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sale" className="mt-0">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {count &&
                propertyForSale
                  .slice(1, 7)
                  .map((property: any, index: any) => (
                    <Property property={property} key={index} />
                  ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                View All Properties For Sale
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mb-12 bg-white border-none shadow-md">
          <CardHeader className="pb-4">
            <SectionTitle icon={<HomeIcon className="h-5 w-5 text-sky-600" />} text="Our Featured Agents" />
          </CardHeader>
          <CardContent>
            <Agents />
          </CardContent>
        </Card>

        <FooterLinks />
      </div>
    </div>
  );
}

