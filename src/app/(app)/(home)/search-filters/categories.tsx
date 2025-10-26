"use client"
import React, { useRef, useState, useEffect } from "react";
import CategoryDropdown from "./category-dropdown";
import { CustomCategory } from "../type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CategoriesSidebar from "./categories-sidebar";

type Props = {
  data: CustomCategory[];
};

const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";
  const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);
  const isActiveCategory = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;
      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = (item as HTMLElement).getBoundingClientRect().width;
        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }

      setVisibleCount(visible);
    };

    calculateVisible();

    const resizeObserver = new ResizeObserver(calculateVisible);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* ✅ 主显示区域 */}
      <div ref={containerRef} className="flex flex-nowrap items-center">
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHoverd={false}
            />
          </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:border-primary text-black"
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
          </Button>
        </div>
      </div>

      {/* ✅ 隐藏测量用容器 */}
      <div
        ref={measureRef}
        className="absolute invisible flex flex-nowrap top-0 left-0 opacity-0 pointer-events-none"
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHoverd={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
