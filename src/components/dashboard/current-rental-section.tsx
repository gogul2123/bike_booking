"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bike, Clock, MapPin, Navigation, Play } from "lucide-react";
import React from "react";

interface CurrentRental {
  isActive: boolean;
  bikeName: string;
  startTime: string;
  duration: string;
  location: string;
}

interface CurrentRentalSectionProps {
  currentActiveRental: CurrentRental;
}

export const CurrentRentalSection: React.FC<CurrentRentalSectionProps> = ({
  currentActiveRental,
}) => (
  <section className="mb-10 animate-in slide-in-from-right duration-600 delay-500">
    <h2 className="text-2xl font-bold text-tan-800 mb-6 flex items-center">
      <Play className="w-6 h-6 mr-2 text-tan-600" />
      Current Rental
    </h2>
    {currentActiveRental?.isActive ? (
      <Card className="border-tan-200 bg-gradient-to-r from-tan-50 to-tan-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Active Rental
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-tan-800 mb-4">
                {currentActiveRental.bikeName}
              </h3>
              <div className="flex flex-wrap gap-4 text-tan-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Started: {currentActiveRental.startTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4" />
                  <span>Duration: {currentActiveRental.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{currentActiveRental.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <Button className="bg-tan-500 text-white hover:bg-tan-700 shadow-md">
                End Ride
              </Button>
              <Button
                variant="outline"
                className="border-tan-600 text-tan-600 hover:bg-tan-50"
              >
                Extend
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ) : (
      <Card className="border-tan-200">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-tan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bike className="w-8 h-8 text-tan-400" />
          </div>
          <p className="text-tan-600">No active rentals at the moment</p>
        </CardContent>
      </Card>
    )}
  </section>
);
