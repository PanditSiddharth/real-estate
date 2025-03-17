"use client"
import Image from "next/image";
import { useState } from "react";
import { Star, Briefcase, X } from "lucide-react";
import AgentAsk from "./AgentAsk";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface AgenstData {
  id: number;
  img: string;
  name: string;
  rating: number;
}

const agentsData: AgenstData[] = [
  {
    id: 1,
    img: "/courtney.jpeg",
    name: "Courtney Geissinger",
    rating: 4.8,
  },
  {
    id: 2,
    img: "/michael.jpeg",
    name: "Micheal Fadeeff",
    rating: 4.8,
  },
  {
    id: 3,
    img: "/raul.jpeg",
    name: "Roul Alcaraz",
    rating: 4.8,
  },
  {
    id: 4,
    img: "/francisco.jpeg",
    name: "Francisco Gonzalez",
    rating: 4.8,
  },
];

const Agents = () => {
  const [agentData, setAgentData] = useState<AgenstData | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) setAgentData(null);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={`star-${i}`} className="h-3 w-3 fill-sky-500 text-sky-500" />
        ))}
        {hasHalfStar && (
          <Star className="h-3 w-3 fill-sky-500 text-sky-500 half-filled" />
        )}
      </div>
    );
  };

  return (
    <section className="w-full py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-2">OJO NETWORK AGENTS</Badge>
          <h2 className="text-2xl font-bold">
            Agents in <span className="text-sky-500">San Francisco</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agentsData.map((agent) => (
            <Card 
              key={agent.id} 
              className="bg-transparent hover:bg-gray-50 transition-colors duration-300 border-none overflow-hidden rounded-xl"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-2 border-sky-100">
                  <AvatarImage src={agent.img} alt={agent.name} />
                  <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex items-center gap-1 mb-1 text-xs">
                  <Briefcase className="h-3 w-3 text-sky-500" />
                  <span className="text-gray-500">Professional Broker</span>
                </div>
                
                <h3 className="font-medium text-lg mb-1">{agent.name}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-sky-500 font-medium">{agent.rating}</span>
                  {renderStars(agent.rating)}
                </div>
                
                <Dialog open={open && agentData?.id === agent.id} onOpenChange={(o) => {
                  if (o) {
                    setAgentData(agent);
                  }
                  handleOpenChange(o);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="default" 
                      className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6 mt-2"
                    >
                      Ask a Question
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-xl border-none p-0">
                    <button 
                      onClick={() => setOpen(false)} 
                      className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {agentData && <AgentAsk agent={agentData} />}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agents;