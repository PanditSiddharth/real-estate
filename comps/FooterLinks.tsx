"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const footerLinks = [
  {
    id: "1",
    title: "Real Estate Markets",
    arr: [
      "Alaska Real Estate",
      "Alabama Real Estate",
      "Arkansas Real Estate",
      "Arizona Real Estate",
      "California Real Estate",
      "Colorado Real Estate",
      "Connecticut Real Estate",
      "District Of Columbia Real Estate",
      "Delaware Real Estate",
      "Florida Real Estate",
      "Georgia Real Estate",
      "Hawaii Real Estate",
      "Iowa Real Estate",
      "Idaho Real Estate",
      "Illinois Real Estate",
      "Indiana Real Estate",
      "Kansas Real Estate",
      "Kentucky Real Estate",
      "Louisiana Real Estate",
      "Massachusetts Real Estate",
      "Maryland Real Estate",
      "Maine Real Estate",
      "Michigan Real Estate",
      "Minnesota Real Estate",
      "Missouri Real Estate",
      "Mississippi Real Estate",
      "Montana Real Estate",
      "North Carolina Real Estate",
    ],
  },
  {
    id: "2",
    title: "Popular Searches",
    arr: [
      "Houses for Sale Near Me by Owner",
      "Cheap Apartments for Rent Near Me",
      "Townhomes for Rent Near Me",
      "Condos for Sale Near Me",
      "Apartments for Rent Near Me",
      "Houses for Rent Near Me",
      "Houses for Sale Near Me",
      "Pet Friendly Apartments Near Me",
      "Land for Sale Near Me",
      "Open Houses Near Me",
      "Townhomes for Sale Near Me",
      "San Antonio Homes For Sale",
      "Chicago Homes For Sale",
      "Philadelphia Homes For Sale",
      "Sacramento Homes For Sale",
      "Bakersfield Homes For Sale",
      "New York Homes For Sale",
      "San Francisco Homes For Sale",
    ],
  },
  {
    id: "3",
    title: "For Professionals",
    arr: ["Popular Counties", "Rental Communities", "Real Estate Leads"],
  },
];

const FooterLinks = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [visibleItems, setVisibleItems] = useState<Record<string, number>>({
    "1": 5,
    "2": 5,
    "3": 5,
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleVisibleItems = (id: string) => {
    setVisibleItems((prev) => ({
      ...prev,
      [id]: prev[id] === 5 ? footerLinks.find(section => section.id === id)?.arr.length || 5 : 5,
    }));
  };

  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {footerLinks.map((section) => (
            <div key={section.id} className="space-y-4">
              {/* Desktop View */}
              <div className="hidden md:block">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.arr.slice(0, visibleItems[section.id]).map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-sm text-gray-600 hover:text-sky-600 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
                {section.arr.length > 5 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 p-0 h-auto font-normal"
                    onClick={() => toggleVisibleItems(section.id)}
                  >
                    {visibleItems[section.id] === 5 ? (
                      <span className="flex items-center gap-1">
                        View more <ChevronDown className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        View less <ChevronUp className="h-3 w-3" />
                      </span>
                    )}
                  </Button>
                )}
              </div>
              
              {/* Mobile View with Collapsible */}
              <Collapsible
                open={expandedSections[section.id]}
                onOpenChange={() => toggleSection(section.id)}
                className="md:hidden"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex justify-between w-full p-0 h-auto"
                  >
                    <h2 className="text-sm font-semibold text-gray-900">{section.title}</h2>
                    {expandedSections[section.id] ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <ul className="space-y-2">
                    {section.arr.slice(0, visibleItems[section.id]).map((link, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          className="text-sm text-gray-600 hover:text-sky-600 transition-colors duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {section.arr.length > 5 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 p-0 h-auto font-normal"
                      onClick={() => toggleVisibleItems(section.id)}
                    >
                      {visibleItems[section.id] === 5 ? (
                        <span className="flex items-center gap-1">
                          View more <ChevronDown className="h-3 w-3" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          View less <ChevronUp className="h-3 w-3" />
                        </span>
                      )}
                    </Button>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
        
        <Separator className="mt-12 mb-6" />
        
        <div className="text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks;