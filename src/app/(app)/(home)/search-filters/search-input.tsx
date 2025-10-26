import { Input } from '@/components/ui/input';
import React from 'react'
import {SearchIcon } from 'lucide-react';

type Props = {
    disable?:boolean;
}

const SearchInput = ({disable}: Props) => {
  return (
    <div className='flex items-center gap-2 w-full'>
        <div className='relative w-full'>
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500 "/>
            <Input className='p-8' placeholder='Seach products' disabled={disable}/>

        </div>
    </div>
  )
}

export default SearchInput