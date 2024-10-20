import { ChevronRightIcon } from '@radix-ui/react-icons';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ProjectAvatar } from '@/components/projects/ProjectAvatar';
import { Button } from '@/components/ui/shadcn/button';

import { useConfirm } from '@/hooks/useConfirm';

import { ProjectType } from '@/features/projects/server/project.types';
import { useDeleteTask } from '@/features/tasks/api/useDeleteTask';
import { TaskType } from '@/features/tasks/task.types';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

interface ITaskBreadcrumbs {
	project: ProjectType;
	task: TaskType;
}

export function TaskBreadcrumbs({ project, task }: ITaskBreadcrumbs) {
	const router = useRouter();
	const workspaceId = useWorkspaceId();

	const { mutate, isPending } = useDeleteTask();
	const [ConfirmDialog, confirm] = useConfirm(
		'Delete Task?',
		'This action cannot be undone.',
		'destructive'
	);

	async function handleDeleteTask() {
		const ok = await confirm();
		if (!ok) return;

		mutate(
			{ param: { taskId: task.$id } },
			{
				onSuccess: () => {
					router.push(`/workspaces/${workspaceId}/tasks`);
				},
			}
		);
	}

	return (
		<div className="flex items-center gap-x-2">
			<ConfirmDialog />
			<ProjectAvatar
				name={project.name}
				image={project.imageUrl}
				className="size-6 lg:size-8"
			/>
			<Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
				<p className="text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
					{project.name}
				</p>
			</Link>
			<ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
			<p className="text-sm font-semibold lg:text-lg">{task.name}</p>
			<Button
				onClick={handleDeleteTask}
				disabled={isPending}
				variant="destructive"
				size="sm"
				className="ml-auto">
				<TrashIcon className="size-4 lg:mr-2" />
				<span className="hidden lg:block">Delete Task</span>
			</Button>
		</div>
	);
}
