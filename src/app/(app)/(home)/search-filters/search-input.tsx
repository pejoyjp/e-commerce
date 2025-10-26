"use client"
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import {ListFilterIcon, SearchIcon } from 'lucide-react';
import { CustomCategory } from '../type';
import CategoriesSidebar from './categories-sidebar';
import { Button } from '@/components/ui/button';

type Props = {
    disable?:boolean;
    data:CustomCategory[];
}


const SearchInput = ({disable,data}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className='flex items-center gap-2 w-full'>
        <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
        <div className='relative w-full'>
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500 "/>
            <Input className='p-8' placeholder='Seach products' disabled={disable}/>
        </div>

        <Button className='size-12 shrink-0 flex lg:hidden'>
            <ListFilterIcon />
        </Button>
    </div>
  )
}

export default SearchInput