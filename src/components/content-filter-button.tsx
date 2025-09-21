import { useEffect, useMemo, useState } from "react";
import { navigate } from "astro:transitions/client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tags, ListFilter } from "lucide-react";

type ContentFilterButtonProps = {
  categories: string[];
  tags: string[];
  selectedCategory?: string;
  selectedTags?: string[];
};

function uniqueSorted(list: string[]): string[] {
  return [...new Set(list.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

export default function ContentFilterButton(props: ContentFilterButtonProps) {
  const allCategories = useMemo(() => uniqueSorted(props.categories), [props.categories]);
  const allTags = useMemo(() => uniqueSorted(props.tags), [props.tags]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [category, setCategory] = useState<string | undefined>(props.selectedCategory);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(props.selectedTags || []));

  useEffect(() => {
    setCategory(props.selectedCategory);
  }, [props.selectedCategory]);
  useEffect(() => {
    setSelectedTags(new Set(props.selectedTags || []));
  }, [props.selectedTags]);

  function navigateWith(nextCategory: string | undefined, nextTags: Set<string>) {
    const url = new URL(window.location.href);
    const sp = url.searchParams;
    if (nextCategory) sp.set("category", nextCategory);
    else sp.delete("category");
    if (nextTags.size > 0) sp.set("tags", Array.from(nextTags).join(","));
    else sp.delete("tags");
    const search = sp.toString();
    navigate(url.pathname + (search ? `?${search}` : ""));
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      // apply immediately
      navigateWith(category, next);
      return next;
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <ListFilter className="mr-2 h-4 w-4" /> 分类
            {category && (
              <Badge variant="secondary" className="ml-2">1</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-1 rounded-sm" align="start">
          <Command className="rounded-none">
            <CommandList className="max-h-64">
              <CommandEmpty>没有匹配的分类</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="__all__"
                  onSelect={() => {
                    setCategory(undefined);
                    navigateWith(undefined, selectedTags);
                  }}
                  className={category ? "" : "bg-accent/60"}
                >
                  全部
                </CommandItem>
                {allCategories.map((c) => (
                  <CommandItem
                    key={c}
                    onSelect={() => {
                      setCategory(c);
                      navigateWith(c, selectedTags);
                    }}
                    className={category === c ? "bg-accent/60" : ""}
                  >
                    {c}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Tags className="mr-2 h-4 w-4" /> 标签
            {selectedTags.size > 0 && (
              <Badge variant="secondary" className="ml-2">{selectedTags.size}</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-1 rounded-sm" align="start">
          <Command className="rounded-none">
            <CommandList className="max-h-72">
              <CommandEmpty>没有匹配的标签</CommandEmpty>
              <CommandGroup>
                {allTags.map((t) => {
                  const checked = selectedTags.has(t);
                  return (
                    <CommandItem
                      key={t}
                      onSelect={() => toggleTag(t)}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleTag(t)}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <span>{t}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {(category || selectedTags.size > 0) && (
        <Button
          variant="ghost"
          size="sm"
          className="ml-1"
          onClick={() => {
            const next = new Set<string>();
            setCategory(undefined);
            setSelectedTags(next);
            navigateWith(undefined, next);
          }}
        >
          清空
        </Button>
      )}
    </div>
  );
}


