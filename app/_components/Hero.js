'use client'
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Calendar, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className=" relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-(--gradient-hero)" />
      <div className="absolute top-0 right-0 w-200 h-200 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-[#4ee1d3]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#4ee1d3] animate-pulse-soft" />
              Now with AI-powered scheduling
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Schedule meetings{" "}
              <span className="gradient-text">without the hassle</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Create your availability, share your link, and let others book time with you. No more back-and-forth emails.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <Link href="/auth/login" className="gap-2">
                  Sign Up With Google
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl">
                <Play className="w-5 h-5" />
                Sign Up with Facebook
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"
                    />
                  ))}
                </div>
                <span>10k+ users</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="text-yellow-500">★★★★★</span>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-red rounded-3xl shadow-xl border border-border/50 p-6 lg:p-8">
              {/* Calendar Preview */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">January 2026</h3>
                  <p className="text-sm text-muted-foreground">Select a date</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Mini Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all cursor-pointer ${
                      i === 20
                        ? "gradient-bg text-primary-foreground font-semibold shadow-soft"
                        : i === 14 || i === 22
                        ? "bg-[#4ee1d3]/10 text-[#4ee1d3] font-medium"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Time Slots Preview */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Available times</p>
                <div className="grid grid-cols-3 gap-2">
                  {["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "4:00 PM", "5:00 PM"].map(
                    (time, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2 rounded-lg text-sm text-center transition-all cursor-pointer ${
                          i === 1
                            ? "gradient-bg text-primary-foreground shadow-soft"
                            : "border border-border hover:border-primary/40 text-foreground"
                        }`}
                      >
                        {time}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-4 top-1/4 bg-card rounded-xl shadow-md border border-border/50 p-4 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">30 min meeting</p>
                    <p className="text-xs text-muted-foreground">Quick sync</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-4 bottom-1/4 bg-card rounded-xl shadow-md border border-border/50 p-4 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent-bg flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Meeting booked!</p>
                    <p className="text-xs text-muted-foreground">Jan 21, 10:30 AM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
