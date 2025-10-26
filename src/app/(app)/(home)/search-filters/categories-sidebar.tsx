import React, { useState } from 'react'
import { CustomCategory } from '../type';
import { Sheet,SheetContent,SheetHeader,SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ro } from 'date-fns/locale';

type Props = {
    open:boolean;    
    onOpenChange: (open:boolean)=>void;
    data:CustomCategory[];
}

const CategoriesSidebar = ({open,onOpenChange,data}: Props) => {
  const [parentCategories,setParentCategories] = useState<CustomCategory[] | null>(null);
  const [selectedCategory,setSelectedCategory] = useState<CustomCategory | null>(null);
  const router = useRouter();

  const ccurrentCategories = parentCategories ?? data ?? [];
  const handleOpenChange = (open:boolean)=>{
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  }

  const handleCategoryClick = (category:CustomCategory)=>{
    if(category.subcategories && category.subcategories.length > 0){
        setParentCategories(category.subcategories as CustomCategory[]);
        setSelectedCategory(category);
    }else{
        if(parentCategories && selectedCategory){
            router.push(`/${selectedCategory.slug}/${category.slug}`);
        }else{
            if(category.slug === 'all'){
                router.push('/');
            }else{
                router.push(`/${category.slug}`);
            }
        }

        handleOpenChange(false);
    }
  }
  
  const backgroundColor =  selectedCategory?.color ||  'white';
  const handleBackClick = () =>{
    if(parentCategories){
        setParentCategories(null);
        setSelectedCategory(null);
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
            side='left'
            className='p-0 transition-none'
            style={{backgroundColor}}
        >
            <SheetHeader className='p-4 border-b'>
                <SheetTitle>Categories</SheetTitle>
            </SheetHeader>

            <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'> 
                {parentCategories && (
                    <button
                        onClick={handleBackClick}
                        className='w-full cursor-pointer text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
                    >
                        <ChevronLeft className='size-4 mr-2'/>
                        Back
                    </button>
                )}
                {ccurrentCategories.map((category)=>(
                    <button
                        key={category.slug}
                        className='w-full cursor-pointer text-left p-4 hover:bg-black hover:text-white flex items-center justify-between text-base font-medium'
                        onClick={()=>handleCategoryClick(category)}
                    >   
                        {category.name}
                        {category.subcategories && category.subcategories.length > 0 && (
                            <ChevronRightIcon className='size-4'/>
                        )
                        }
                      
                    </button>
                ))}
            </ScrollArea>

        </SheetContent>
    </Sheet>
  )
}

export default CategoriesSidebar