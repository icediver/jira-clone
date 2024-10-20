'use client';

import { TaskBreadcrumbs } from '@/components/tasks/breadcrumbs/TaskBreadcrumbs';
import { TaskDescription } from '@/components/tasks/task-description/TaskDescription';
import { TaskOverview } from '@/components/tasks/task-overview/TaskOverview';
import { DottedSeparator } from '@/components/ui/dotted-separator/DottedSeparator';
import { PageError } from '@/components/ui/page-error/PageError';
import { PageLoader } from '@/components/ui/page-loader/PageLoader';

import { useGetTask } from '@/features/tasks/api/useGetTask';
import { useTaskId } from '@/features/tasks/hooks/useTaskId';

export function TaskIdClient() {
	const taskId = useTaskId();
	const { data, isLoading } = useGetTask({ taskId });
	if (isLoading) return <PageLoader />;

	if (!data) return <PageError message="Task not found" />;
	return (
		<div className="flex flex-col">
			<TaskBreadcrumbs
				project={data.project}
				task={data}
			/>
			<DottedSeparator className="my-6 " />
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<TaskOverview task={data} />
				<TaskDescription task={data} />
			</div>
		</div>
	);
}
