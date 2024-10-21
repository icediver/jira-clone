import { PencilIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { DottedSeparator } from '@/components/ui/dotted-separator/DottedSeparator';
import { Button } from '@/components/ui/shadcn/button';
import { Textarea } from '@/components/ui/shadcn/textarea';

import { useUpdateTask } from '@/features/tasks/api/useUpdateTask';
import { TaskType } from '@/features/tasks/task.types';

interface ITaskDescription {
	task: TaskType;
}

export function TaskDescription({ task }: ITaskDescription) {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(task.description);
	const { mutate: updateTask, isPending } = useUpdateTask();

	function handleSave() {
		updateTask(
			{ json: { description: value }, param: { taskId: task.$id } },
			{ onSuccess: () => setIsEditing(false) }
		);
	}

	return (
		<div className="rounded-lg border p-4">
			<div className="flex items-center justify-between">
				<p className="text-lg font-semibold">Overview</p>
				<Button
					onClick={() => setIsEditing((prev) => !prev)}
					size={'sm'}
					variant="secondary">
					{isEditing ? (
						<XIcon className="size-4 mr-2" />
					) : (
						<PencilIcon className="size-4 mr-2" />
					)}
					{isEditing ? 'Cancel' : 'Edit'}
				</Button>
			</div>
			<DottedSeparator className="my-4" />
			{isEditing ? (
				<div className="flex flex-col gap-y-4">
					<Textarea
						placeholder="Add a description..."
						value={value}
						rows={4}
						onChange={(e) => setValue(e.target.value)}
						disabled={isPending}
					/>
					<Button
						size={'sm'}
						onClick={handleSave}
						disabled={isPending}
						className="ml-auto w-fit">
						{isPending ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			) : (
				<div>
					{task.description || (
						<span className="text-muted-foreground">No description</span>
					)}
				</div>
			)}
		</div>
	);
}
