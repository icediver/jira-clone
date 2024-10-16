import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ProjectAvatar } from '@/components/projects/ProjectAvatar';
import { TaskViewSwitcher } from '@/components/tasks/TaskViewSwitcher';
import { Button } from '@/components/ui/shadcn/button';

import { getCurrent } from '@/features/auth/queries';
import { getProject } from '@/features/projects/project.queries';

interface Props {
	params: { projectId: string };
}

export default async function ProjectIdPage({ params }: Props) {
	const user = await getCurrent();
	if (!user) redirect('/sign-in');

	const initialValue = await getProject({
		projectId: params.projectId,
	});

	if (!initialValue) {
		throw new Error('Project not found');
	}

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<ProjectAvatar
						image={initialValue?.imageUrl}
						name={initialValue?.name}
						className="h-10 w-10"
					/>
					<p className="text-lg font-semibold">{initialValue?.name}</p>
				</div>
				<Button
					variant={'secondary'}
					size={'sm'}
					asChild
				>
					<Link
						href={`/workspaces/${initialValue.workspaceId}/projects/${initialValue.$id}/settings`}
					>
						<PencilIcon className="size-4 mr-2" />
						Edit Project
					</Link>
				</Button>
			</div>
			<TaskViewSwitcher />
		</div>
	);
}
