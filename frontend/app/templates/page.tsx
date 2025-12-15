'use client';

import { useState, useMemo } from 'react';
import { MOCK_TEMPLATES } from '@/lib/mock-data';
import { Search, Sparkles, Filter, Tag } from 'lucide-react';
import { Template } from '@/lib/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CATEGORIES: { label: string; value: Template['category'] | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'System Design', value: 'system design' },
    { label: 'Backend', value: 'backend' },
    { label: 'Infrastructure', value: 'infra' },
    { label: 'AI', value: 'AI' },
];

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Template['category'] | 'all'>('all');
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [isUseTemplateModalOpen, setIsUseTemplateModalOpen] = useState(false);

    const filteredTemplates = useMemo(() => {
        return MOCK_TEMPLATES.filter((template) => {
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            const matchesSearch =
                template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    const handleUseTemplate = (template: Template) => {
        setSelectedTemplate(template);
        setIsUseTemplateModalOpen(true);
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Templates</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Jumpstart your project with production-ready blueprints.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer",
                                selectedCategory === cat.value
                                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                    : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-card border border-input rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all"
                    />
                </div>
            </div>

            {/* Grid */}
            {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            onUse={() => handleUseTemplate(template)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                        <Filter className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No templates found</h3>
                    <p className="text-muted-foreground mt-1">
                        Try adjusting your search or filters.
                    </p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                        className="mt-4 text-sm text-primary hover:underline font-medium cursor-pointer"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {/* Use Template Modal */}
            <Modal
                isOpen={isUseTemplateModalOpen}
                onClose={() => setIsUseTemplateModalOpen(false)}
                title="Use Template"
            >
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Create a new project using <span className="font-semibold text-foreground">{selectedTemplate?.name}</span> as a starting point.
                    </p>
                    <div className="space-y-2">
                        <label htmlFor="projectName" className="text-sm font-medium">Project Name</label>
                        <input
                            id="projectName"
                            defaultValue={`${selectedTemplate?.name} Project`}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setIsUseTemplateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button>Create Project</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function TemplateCard({ template, onUse }: { template: Template, onUse: () => void }) {
    return (
        <div
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group flex flex-col h-full relative overflow-hidden cursor-pointer"
            onClick={onUse}
        >
            {/* Decorative gradient blob */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="p-2.5 bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 rounded-lg text-primary transition-colors group-hover:bg-primary/20">
                    <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground border border-border px-2 py-0.5 rounded-full bg-secondary/30">
                    {template.category}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {template.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
                {template.description}
            </p>

            {/* Progressive disclosure: Tags fade in slightly or shift */}
            <div className="flex flex-wrap gap-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                {template.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md border border-transparent group-hover:border-border/50 transition-colors">
                        <Tag className="w-3 h-3 mr-1 opacity-50" />
                        {tag}
                    </span>
                ))}
            </div>

            <Button variant="outline" className="w-full mt-auto group-hover:border-primary/50 group-hover:text-primary transition-all">
                Use Template
            </Button>
        </div>
    );
}
