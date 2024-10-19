import { Loader } from 'lucide-react';

import { Card, CardContent } from '../ui/shadcn/card';

import { EditTaskForm } from './EditTaskForm';
import { useGetMembers } from '@/features/members/api/useGetMembers';
import { useGetProjects } from '@/features/projects/api/useGetProjects';
import { useGetTask } from '@/features/tasks/api/useGetTask';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

interface IEditTaskFormWrapper {
	onCancel: () => void;
	id: string;
}

export function EditTaskFormWrapper({ onCancel, id }: IEditTaskFormWrapper) {
	const workspaceId = useWorkspaceId();

	const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
		taskId: id,
	});

	const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
		workspaceId,
	});

	const { data: members, isLoading: isLoadingMembers } = useGetMembers({
		workspaceId,
	});

	const projectOptions = projects?.documents.map((project) => ({
		id: project.$id,
		name: project.name,
		imageUrl: project.imageUrl,
	}));

	const memberOptions = members?.documents.map((project) => ({
		id: project.$id,
		name: project.name,
	}));

	const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

	if (isLoading) {
		return (
			<Card className="h-[714px] w-full border-none shadow-none">
				<CardContent className="flex h-full items-center justify-center">
					<Loader className="size-5 animate-spin text-muted-foreground" />
				</CardContent>
			</Card>
		);
	}

	if (!initialValues) {
		return null;
	}

	return (
		<EditTaskForm
			onCancel={onCancel}
			projectOptions={projectOptions ?? []}
			memberOptions={memberOptions ?? []}
			initialValues={initialValues}
		/>
	);
}
