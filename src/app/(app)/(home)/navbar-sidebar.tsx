import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetContent,Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';

type NavbarItemProps = {
    href:string;
    children:React.ReactNode;
}


type Props = {
    items:NavbarItemProps[];
    open:boolean;
    onOpenChange:(open:boolean) => void;
}

const NavbarSidebar = ({items, open, onOpenChange}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}> 
        <SheetContent
            side='left'
            className='p-0 transition-none'
        >
            <SheetHeader className='p-4 border-b'>
                <div className='flex items-center'>
                    <SheetTitle>
                        Menu
                    </SheetTitle>

                </div>
            </SheetHeader>

            <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
                {
                    items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center'
                            onClick={()=>onOpenChange(false)}
                        >
                            {item.children}
                        </Link>
                    ))
                }
                <div className='border-t'>
                    <Link onClick={()=>onOpenChange(false)} href="/sign-in" className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center'>
                        Login
                    </Link>

                    <Link onClick={()=>onOpenChange(false)} href="/sign-up" className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center'>
                        Start Selling
                    </Link>
                </div>
            </ScrollArea>
 
        </SheetContent>
    </Sheet>
  )
}

export default NavbarSidebar