'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Calendar, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@/components/ui/button';
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
const navLinks = [
  { name: "Product", href: "#product" },
  { name: "Pricing", href: "#pricing" },
  { name: "About Us", href: "#about" },
  { name: "Contact Us", href: "#contact" },
]
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50'>
      <div className='container mx-auto lg:px-8 sm:px-6 px-4'>
        <div className='flex items-center justify-between  h-16 lg:h-20'>

          {/* logo */}
          <Link href='/' className='flex items-center gap-2 group'>

            <div className='w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-soft hover:shadow-elevated transition-shadow'>
              <Calendar className='w-5 h-5 text-white' />
            </div>
            <span className='text-xl font-bold text-foreground'>MeetFlow</span>


          </Link>

          {/* Desktop Nav */}
          <nav className='hidden lg:flex items-center gap-2'>
            {navLinks.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                className='px-4 py-2 text-sm font-medium  text-muted-foreground  hover:text-foreground transition-colors
                 rounded-lg hover:bg-muted/50'
              >
                {item.name}

              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LoginLink>
              <Button variant="outline" >
                Login
              </Button>
            </LoginLink>

            <RegisterLink>
              <Button variant="default" >
                Get Started
              </Button>
            </RegisterLink>

          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors hover:cursor-pointer'>
            {mobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* menue in mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-background"
          >
            <div className='container px-4 py-4 mx-auto space-y-2'>
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='block px-4 p-3 text-sm font-medium text-muted-foreground hover:text-foreground 
                    transition-colors rounded-lg hover:bg-muted/50 hover:cursor-pointer'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}

                </a>


              ))}
              {/*  button login & get started */}
              <div className="pt-4 space-y-2">
                <LoginLink>
                  <Button variant="outline" >
                    Login
                  </Button>
                </LoginLink>

                <RegisterLink>
                  <Button variant="default" >
                    Get Started
                  </Button>
                </RegisterLink>

              </div>
            </div>
          </motion.div>
        )

        }
      </AnimatePresence>
    </header>
  )
}

