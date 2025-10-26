'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'
import React from 'react'
import { useDropdownPosition } from './use-dropdown-position'
import SubcategoryMenu from './subcategory-menu'
import { CustomCategory } from '../type'

type Props = {
  category: CustomCategory;
  isActive: boolean;
  isNavigationHoverd?: boolean;
}

const CategoryDropdown = ({ category, isActive, isNavigationHoverd }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getDropdownPosition } = useDropdownPosition(dropdownRef)

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true)
    }
  }

  const onMouseLeave = () => {
    setIsOpen(false)
  }

  const downPosition  = getDropdownPosition()

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="ghost"
          className={cn(
            'h-11 px-4 hover:border-primary hover:border text-black rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1))]',
            isActive && !isNavigationHoverd && 'bg-white border-primary border',
            isOpen && 'bg-white border-primary'
          )}
        >
          
          {category.name}
        </Button>

     
        {category.subcategories && category.subcategories.length   > 0 && (
          <div
            className={cn(
                'opacity-0 absolute -bottom-3 w-0 h-0 border-b-[10px] border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2 z-50 transition-opacity duration-300',
                isOpen && 'opacity-100'
            )}
          ></div>
        )}
      </div>

      <SubcategoryMenu 
        category={category}
        isOpen={isOpen}
        position={downPosition}
      />
    </div>
  )
}

export default CategoryDropdown
