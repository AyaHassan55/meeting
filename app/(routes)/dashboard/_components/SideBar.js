"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Plus,
  List,
  CalendarDays,
  Clock,
  Menu,
  X,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const sidebarItems = [
  { icon: Plus, label: "Create", href: "/create-meeting" },
  { icon: List, label: "Meeting List", href: "/dashboard/meetings" },
  { icon: CalendarDays, label: "Schedule", href: "/dashboard/schedule" },
  { icon: Clock, label: "Availability", href: "/dashboard/availability" },
];

export default function SideBar({ children }) {
  const {user} = useKindeBrowserClient();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-25"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-soft">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-foreground"
              >
                MeetFlow
              </motion.span>
            )}
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "gradient-bg text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div
            className={cn(
              "flex items-center gap-3",
              sidebarOpen ? "flex-row" : "flex-col"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>

            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                    {user?.given_name || "Guest"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                 {user?.email || "Not signed in"}
                </p>
              </div>
            )}

            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            MeetFlow
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-40 bg-background pt-16"
          >
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl",
                      isActive
                        ? "gradient-bg text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/api/auth/logout">
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        <div className="pt-16 lg:pt-0">{children}</div>
      </main>
    </div>
  );
}
