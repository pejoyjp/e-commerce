import React from 'react'
import SearchInput from './search-input'
import Categories from './categories'
import { CustomCategory } from '../type'

type Props = {
    data:CustomCategory[];
}

const SeachFilters = ({data}: Props) => {
  return (
    <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'>
        <SearchInput/>
        <Categories data={data}/>
    </div>
  )
}

export default SeachFilters