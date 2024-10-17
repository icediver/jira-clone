import { Loader } from 'lucide-react';

import { Card, CardContent } from '../ui/shadcn/card';

import { CreateTaskForm } from './CreateTaskForm';
import { useGetMembers } from '@/features/members/api/useGetMembers';
import { useGetProjects } from '@/features/projects/api/useGetProjects';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

interface ICreateTaskFormWrapper {
	onCancel: () => void;
}

export function CreateTaskFormWrapper({ onCancel }: ICreateTaskFormWrapper) {
	const workspaceId = useWorkspaceId();
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

	const isLoading = isLoadingProjects || isLoadingMembers;

	if (isLoading) {
		return (
			<Card className="h-[714px] w-full border-none shadow-none">
				<CardContent className="flex h-full items-center justify-center">
					<Loader className="size-5 animate-spin text-muted-foreground" />
				</CardContent>
			</Card>
		);
	}

	return (
		<CreateTaskForm
			onCancel={onCancel}
			projectOptions={projectOptions ?? []}
			memberOptions={memberOptions ?? []}
		/>
	);
}
