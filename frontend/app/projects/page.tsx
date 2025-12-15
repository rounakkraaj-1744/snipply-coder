'use client';

import { useState } from 'react';
import { MOCK_PROJECTS } from '@/lib/mock-data';
import { LayoutGrid, List as ListIcon, Plus, FolderOpen, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { Project } from '@/lib/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleDeleteClick = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your AI-generated system blueprints.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-secondary p-1 rounded-md flex items-center gap-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-1.5 rounded-sm transition-all cursor-pointer",
                                viewMode === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                            )}
                            title="List view"
                        >
                            <ListIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-1.5 rounded-sm transition-all cursor-pointer",
                                viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                            )}
                            title="Grid view"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                    </div>
                    <Button onClick={() => setIsNewProjectModalOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        New Project
                    </Button>
                </div>
            </div>

            {/* Content */}
            {MOCK_PROJECTS.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-xl bg-card/10 text-center">
                    <h3 className="text-lg font-medium text-foreground">No projects yet</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-6">Create your first system blueprint.</p>
                    <Button onClick={() => setIsNewProjectModalOpen(true)}>
                        Create Project
                    </Button>
                </div>
            ) : viewMode === 'list' ? (
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="divide-y divide-border">
                        <div className="grid grid-cols-12 gap-4 p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-secondary/30">
                            <div className="col-span-12 sm:col-span-5 pl-2">Project Name</div>
                            <div className="hidden sm:block sm:col-span-2">Status</div>
                            <div className="hidden sm:block sm:col-span-3">Last Updated</div>
                            <div className="hidden sm:block sm:col-span-2 text-right pr-2">Actions</div>
                        </div>
                        {MOCK_PROJECTS.map((project) => (
                            <ProjectRow
                                key={project.id}
                                project={project}
                                onDelete={() => handleDeleteClick(project)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_PROJECTS.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onDelete={() => handleDeleteClick(project)}
                        />
                    ))}
                </div>
            )}

            {/* New Project Modal */}
            <Modal
                isOpen={isNewProjectModalOpen}
                onClose={() => setIsNewProjectModalOpen(false)}
                title="Create New Project"
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="projectName" className="text-sm font-medium">Project Name</label>
                        <input
                            id="projectName"
                            placeholder="e.g. E-commerce Platform"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="projectDesc" className="text-sm font-medium">Description</label>
                        <textarea
                            id="projectDesc"
                            placeholder="Brief description of the project..."
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setIsNewProjectModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button>Create Project</Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Project"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-destructive bg-destructive/5 p-3 rounded-lg border border-destructive/10">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">This action cannot be undone.</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete <span className="font-semibold text-foreground">{selectedProject?.title}</span>?
                    </p>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive">Delete Project</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function ProjectRow({ project, onDelete }: { project: Project, onDelete: () => void }) {
    return (
        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/20 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-primary">
            <div className="col-span-12 sm:col-span-5 flex items-center gap-3 pl-2">
                <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0">
                        {project.description}
                    </p>
                </div>
            </div>
            <div className="hidden sm:flex sm:col-span-2 items-center">
                <StatusBadge status={project.status} />
            </div>
            <div className="hidden sm:flex sm:col-span-3 items-center text-sm text-muted-foreground font-mono text-xs">
                {new Date(project.updatedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            </div>
            <div className="hidden sm:flex sm:col-span-2 justify-end pr-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ActionButtons onDelete={onDelete} />
            </div>
        </div>
    );
}

function ProjectCard({ project, onDelete }: { project: Project, onDelete: () => void }) {
    return (
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-primary/5 rounded-md text-primary group-hover:bg-primary/10 transition-colors">
                    <FolderOpen className="w-6 h-6" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={onDelete}
                        className="text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-destructive/10 transition-colors cursor-pointer"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {project.title}
            </h3>
            <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                <StatusBadge status={project.status} />
                <span className="text-xs text-muted-foreground font-mono opacity-60">
                    {new Date(project.updatedAt).toLocaleDateString()}
                </span>
            </div>
            
             {/* Progressive Disclosure: Description slides up on hover */}
            <div className="absolute inset-x-0 bottom-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                 <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                </p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: Project['status'] }) {
    const styles = {
        draft: 'bg-secondary text-secondary-foreground border-border',
        completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    };

    return (
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border", styles[status])}>
            {status}
        </span>
    );
}

function ActionButtons({ onDelete }: { onDelete: () => void }) {
    return (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer" title="Open">
                <Edit2 className="w-4 h-4" />
            </button>
            <button
                onClick={onDelete}
                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors cursor-pointer"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}