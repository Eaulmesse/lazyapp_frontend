"use client";

import { useState } from "react";
import { 
  Gauge, 
  BarChart3, 
  Settings, 
  BookOpen, 
  Zap,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { m } from "framer-motion";

const menuItems = [
  {
    icon: BarChart3,
    label: "Vue d'ensemble",
    href: "/dashboard",
  },
  // {
  //   icon: Zap,
  //   label: "Sites",
  //   href: "/dashboard/sites"
  // },
  {
    icon: BookOpen,
    label: "Documentation",
    href: "/dashboard/docs"
  }
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Nouvel Audit");

  const handleProfileClick = () => {
    // Redirection vers le profil
    window.location.href = "/dashboard/profil";
  };

  return (
    <div className="h-screen bg-gray-900/50 border-r border-gray-800 flex flex-col w-[200px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Gauge className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">Velocity</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <a key={item.label} href={item.href}>
            <Button 
              variant={activeItem === item.label ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 h-10 ${
                activeItem === item.label 
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`}
              onClick={() => setActiveItem(item.label)}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Button>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Système opérationnel</span>
        </div>
        
        {/* User Account - Simplified */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-gray-300 hover:text-white hover:bg-gray-800/50"
          onClick={handleProfileClick}
        >
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">Mon profil</span>
        </Button>
      </div>
    </div>
  );
}
