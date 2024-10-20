import { PencilIcon } from 'lucide-react';

import { MemberAvatar } from '@/components/members/MemberAvatar';
import { DottedSeparator } from '@/components/ui/dotted-separator/DottedSeparator';
import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';

import { TaskDate } from '../table/TaskDate';

import { OverviewProperty } from './OverviewProperty';
import { useEditTaskModal } from '@/features/tasks/hooks/useEditTaskModal';
import { TaskType } from '@/features/tasks/task.types';
import { snakeCaseToTitleCase } from '@/lib/utils';

interface ITaskOverview {
	task: TaskType;
}

export function TaskOverview({ task }: ITaskOverview) {
	const { open } = useEditTaskModal();
	return (
		<div className="col-span-1 flex flex-col gap-y-4">
			<div className="rounded-lg bg-muted p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">Overview</p>
					<Button
						onClick={() => open(task.$id)}
						size={'sm'}
						variant="secondary">
						<PencilIcon className="size-4 mr-2" />
						Edit
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<div className="flex flex-col gap-y-4">
					<OverviewProperty label="Assignee">
						<MemberAvatar
							name={task.assignee?.name}
							className="size-6"
						/>
						<p className="text-sm font-medium">{task.assignee?.name}</p>
					</OverviewProperty>
					<OverviewProperty label="Due Date">
						<TaskDate
							value={task.dueDate}
							className="text-sm font-medium"
						/>
					</OverviewProperty>
					<OverviewProperty label="Status">
						<Badge variant={task.status}>
							{snakeCaseToTitleCase(task.status)}
						</Badge>
					</OverviewProperty>
				</div>
			</div>
		</div>
	);
}
