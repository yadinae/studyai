"use client";

import { useState } from "react";
import { BookOpen, Clock, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sampleTutorials } from "@/content/tutorials/sample-tutorials";
import Link from "next/link";

const categories = [
  { id: "all", name: "全部教程" },
  { id: "basics", name: "入门基础" },
  { id: "advanced", name: "进阶技巧" },
  { id: "scenarios", name: "实战应用" },
];

export default function TutorialsPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = sampleTutorials.filter((tutorial) => {
    const matchesCategory =
      activeCategory === "all" || tutorial.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-purple-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              教程中心
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              系统化的提示词学习教程，从入门到精通。
              <br />
              涵盖基础概念、进阶技巧、实战应用。
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="搜索教程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTutorials.map((tutorial) => (
              <article
                key={tutorial.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-1 p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      {tutorial.category === "basics" && "入门基础"}
                      {tutorial.category === "advanced" && "进阶技巧"}
                      {tutorial.category === "scenarios" && "实战应用"}
                    </span>
                    <span className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="mr-1 h-3 w-3" />
                      {tutorial.readTime}分钟
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tutorial.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-slate-600 dark:text-slate-300 line-clamp-3">
                    {tutorial.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tutorial.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 dark:border-slate-800 p-6">
                  <Link href={`/tutorials/${tutorial.id}`}>
                    <Button variant="ghost" className="w-full group/btn">
                      <BookOpen className="mr-2 h-4 w-4" />
                      开始学习
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredTutorials.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
                未找到相关教程
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                尝试调整搜索关键词或筛选条件
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
