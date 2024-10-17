'use client';

import { Loader, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { DottedSeparator } from '../ui/dotted-separator/DottedSeparator';
import { Button } from '../ui/shadcn/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/shadcn/tabs';

import { DataFilters } from './DataFilters';
import { useGetTasks } from '@/features/tasks/api/useGetTasks';
import { useCreateTaskModal } from '@/features/tasks/hooks/useCreateTaskModal';
import { useTaskFilters } from '@/features/tasks/hooks/useTaskFilters';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

export function TaskViewSwitcher() {
	const [{ status, assigneeId, projectId, dueDate, search }] = useTaskFilters();

	const [view, setView] = useQueryState('task-view', {
		defaultValue: 'table',
	});
	const workspaceId = useWorkspaceId();

	const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
		workspaceId,
		projectId,
		assigneeId,
		status,
		dueDate,
		search,
	});
	const { open } = useCreateTaskModal();
	return (
		<Tabs
			className="w-full flex-1 rounded-lg border"
			defaultValue={view}
			onValueChange={setView}
		>
			<div className="flex h-full flex-col overflow-auto p-4">
				<div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
					<TabsList className="w-full lg:w-auto">
						<TabsTrigger
							className="h-8 w-full lg:w-auto"
							value="table"
						>
							Table
						</TabsTrigger>
						<TabsTrigger
							className="h-8 w-full lg:w-auto"
							value="kanban"
						>
							Kanban
						</TabsTrigger>
						<TabsTrigger
							className="h-8 w-full lg:w-auto"
							value="calendar"
						>
							Calendar
						</TabsTrigger>
					</TabsList>
					<Button
						size="sm"
						className="w-full lg:w-auto"
						onClick={open}
					>
						<PlusIcon className="size-4 mr-2" />
						New
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<DataFilters />
				<DottedSeparator className="my-4" />
				{isLoadingTasks ? (
					<div className="h-[200px justify-center] flex w-full flex-col items-center rounded-lg border">
						<Loader className="size-5 animate-spin text-muted-foreground" />
					</div>
				) : (
					<>
						<TabsContent
							className="mt-0"
							value="table"
						>
							{JSON.stringify(tasks)}
						</TabsContent>
						<TabsContent
							className="mt-0"
							value="kanban"
						>
							{JSON.stringify(tasks)}
						</TabsContent>
						<TabsContent
							className="mt-0"
							value="calendar"
						>
							{JSON.stringify(tasks)}
						</TabsContent>
					</>
				)}
			</div>
		</Tabs>
	);
}
