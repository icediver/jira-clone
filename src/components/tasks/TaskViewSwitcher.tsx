'use client';

import { PlusIcon } from 'lucide-react';

import { DottedSeparator } from '../ui/dotted-separator/DottedSeparator';
import { Button } from '../ui/shadcn/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/shadcn/tabs';

import { useCreateTaskModal } from '@/features/tasks/hooks/useCreateTaskModal';

export function TaskViewSwitcher() {
	const { open } = useCreateTaskModal();
	return (
		<Tabs className="w-full flex-1 rounded-lg border">
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
				{/*TODO: Add filters*/}
				Data filters
				<DottedSeparator className="my-4" />
				<>
					<TabsContent
						className="mt-0"
						value="table"
					>
						Data table
					</TabsContent>
					<TabsContent
						className="mt-0"
						value="kanban"
					>
						Data kanban
					</TabsContent>
					<TabsContent
						className="mt-0"
						value="calendar"
					>
						Data calendar
					</TabsContent>
				</>
			</div>
		</Tabs>
	);
}
