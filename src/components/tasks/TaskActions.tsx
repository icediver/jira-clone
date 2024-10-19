import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useConfirm } from '@/hooks/useConfirm';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/shadcn/dropdown-menu';

import { useDeleteTask } from '@/features/tasks/api/useDeleteTask';
import { useEditTaskModal } from '@/features/tasks/hooks/useEditTaskModal';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

interface ITaskActions {
	id: string;
	projectId: string;
	children?: React.ReactNode;
}

export function TaskActions({ id, projectId, children }: ITaskActions) {
	const workspaceId = useWorkspaceId();
	const router = useRouter();

	const { open } = useEditTaskModal();

	const [ConfirmDialog, confirm] = useConfirm(
		'Delete task',
		'This action cannot be undone',
		'destructive'
	);

	const { mutate: deleteTask, isPending: isPendingDelete } = useDeleteTask();

	async function onDelete() {
		const ok = await confirm();
		if (!ok) return;
		deleteTask({ param: { taskId: id } });
	}

	function onOpenTask() {
		router.push(`/workspaces/${workspaceId}/tasks/${id}`);
	}

	function onOpenProject() {
		router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
	}

	return (
		<div className="flex justify-end">
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-48">
					<DropdownMenuItem
						onClick={onOpenTask}
						className="p-[10px] font-medium">
						<ExternalLinkIcon className="size-4 mr-2 stroke-2" />
						Task Details
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={onOpenProject}
						className="p-[10px] font-medium">
						<ExternalLinkIcon className="size-4 mr-2 stroke-2" />
						Open Project
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => open(id)}
						className="p-[10px] font-medium">
						<PencilIcon className="size-4 mr-2 stroke-2" />
						Edit Task
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={onDelete}
						disabled={isPendingDelete}
						className="p-[10px] font-medium text-amber-700 focus:text-amber-700">
						<TrashIcon className="size-4 mr-2 stroke-2" />
						Delete Task
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
