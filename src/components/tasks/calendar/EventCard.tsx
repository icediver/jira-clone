import { useRouter } from 'next/navigation';

import { MemberAvatar } from '@/components/members/MemberAvatar';
import { ProjectAvatar } from '@/components/projects/ProjectAvatar';

import { MemberType } from '@/features/members/members.types';
import { ProjectType } from '@/features/projects/server/project.types';
import { TaskStatus } from '@/features/tasks/task.types';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';
import { cn } from '@/lib/utils';

interface IEventCard {
	id: string;
	title: string;
	assignee: MemberType;
	project: ProjectType;
	status: TaskStatus;
}

const statusColorMap: Record<TaskStatus, string> = {
	[TaskStatus.BACKLOG]: 'border-l-pink-500',
	[TaskStatus.TODO]: 'border-l-red-500',
	[TaskStatus.IN_PROGRESS]: 'border-l-yellow-500',
	[TaskStatus.IN_REVIEW]: 'border-l-blue-500',
	[TaskStatus.DONE]: 'border-l-emerald-500',
};

export function EventCard({
	id,
	title,
	assignee,
	project,
	status,
}: IEventCard) {
	const workspaceId = useWorkspaceId();
	const router = useRouter();

	function onClick(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		router.push(`/workspaces/${workspaceId}/tasks/${id}`);
	}

	return (
		<div className="px-2">
			<div
				onClick={onClick}
				className={cn(
					'flex cursor-pointer flex-col gap-y-1.5 rounded-md border border-l-4 bg-white p-1.5 text-xs text-primary transition hover:opacity-75',
					statusColorMap[status]
				)}>
				<p>{title}</p>
				<div className="flex items-center gap-x-1 ">
					<MemberAvatar name={assignee.name} />
					<div className="size-1 rounded-full bg-neutral-300" />
					<ProjectAvatar
						name={project?.name}
						image={project?.imageUrl}
						className="size-5"
					/>
				</div>
			</div>
		</div>
	);
}
