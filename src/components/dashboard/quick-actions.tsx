"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface QuickAccessItem {
  title: string;
  description: string;
  gradient: string;
  icon: React.ElementType;
}

interface QuickAccessSectionProps {
  quickAccessItems: QuickAccessItem[];
}

export const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  quickAccessItems,
}) => (
  <section className="mb-10 animate-in slide-in-from-left duration-600 delay-300">
    <h2 className="text-2xl font-bold text-tan-800 mb-6 flex items-center">
      <TrendingUp className="w-6 h-6 mr-2 text-tan-600" />
      Quick Access
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickAccessItems.map((item, index) => (
        <Card
          key={index}
          className="group hover:shadow-xl transition-all  border-tan-200 hover:border-tan-300 cursor-pointer animate-in zoom-in-95 duration-500"
          style={{ animationDelay: `${index * 100 + 400}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-tan-800">
                  {item.title}
                </h3>
                <p className="text-sm text-tan-600">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-tan-400 group-hover:text-tan-600 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);
