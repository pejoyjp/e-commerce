"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavbarSidebar from './navbar-sidebar';
import { MenuIcon } from 'lucide-react';


type NavbaItemProps = {    
    href: string;
    children: React.ReactNode;
    isActive: boolean;
}

const NavbarItem = ({href,children,isActive}: NavbaItemProps) => {
    return (
        <Button 
                className={cn("bg-transparent text-black hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
                    isActive && "bg-black text-white hover:bg-black hover:text-white")}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}

const navbarItems = [
    {href:"/",children:"Home"},
    {href:"/about",children:"About"},
    {href:"/contact",children:"Contact"},
    {href:"/pricing",children:"Pricing"},
    {href:"/features",children:"Features"}
];

const Navbar = () => {
  
 const pathname = usePathname();
 const [isSidebarOpen,setIsSidebarOpen] = useState(false);

  return (
    <nav className='h-20 flex border-b item-medium bg-white justify-between'>
        
        <Link href="/" className="pl-6 flex items-center">
            <span className={cn("text-5xl font-semibold")}>
                funroad
            </span>
        </Link>

        <NavbarSidebar 
            open={isSidebarOpen}
            items={navbarItems}
            onOpenChange={setIsSidebarOpen}
        />

        <div className='items-center gap-4 hidden lg:flex'>
            {navbarItems.map((item)=>(
                <NavbarItem key={item.href}
                            href={item.href}
                            isActive={pathname === item.href}
                >
                    {item.children}
                </NavbarItem>
            ))}
        </div>

        <div className='hidden lg:flex'>
            <Button variant="secondary" 
                    className='border-l border-t-0 border-b-0 px-12 h-full rounded-none bg-white
                            hover:bg-pink-400 transtion-colors text-lg'
                    asChild
                    
            >
                <Link href="/sign-in">
                    Login
                </Link>
            </Button>

            <Button variant="secondary" 
                    className='border-l border-t-0 border-b-0 px-12 h-full rounded-none bg-black
                            text-white hover:bg-pink-400 hover-text-black transtion-colors text-lg'
                    asChild
            >
                <Link href="/sign-up">
                    Start Selling
                </Link>
            </Button>
        </div>

        <div className='flex lg:hidden items-center justify-center'>
            <Button
                value="ghost"
                className='size-12 border-transpartent bg-white'
                onClick={()=>setIsSidebarOpen(true)}
            >
                <MenuIcon color='black'/>
            </Button>
        </div>
    </nav>
  )
}

export default Navbar