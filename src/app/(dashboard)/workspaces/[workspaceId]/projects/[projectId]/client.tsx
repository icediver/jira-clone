'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { Analytics } from '@/components/projects/Analytics';
import { ProjectAvatar } from '@/components/projects/ProjectAvatar';
import { TaskViewSwitcher } from '@/components/tasks/TaskViewSwitcher';
import { PageError } from '@/components/ui/page-error/PageError';
import { PageLoader } from '@/components/ui/page-loader/PageLoader';
import { Button } from '@/components/ui/shadcn/button';

import { useGetProject } from '@/features/projects/api/useGetProject';
import { useGetProjectAnalitics } from '@/features/projects/api/useGetProjectAnalitics';
import { useProjectId } from '@/features/projects/hooks/useProjectId';

export function ProjectIdClient() {
	const projectId = useProjectId();
	const { data: project, isLoading: isLoadingProject } = useGetProject({
		projectId,
	});
	const { data: analytics, isLoading: isLoadingAnalytics } =
		useGetProjectAnalitics({ projectId });

	console.log(analytics);

	const isLoading = isLoadingProject || isLoadingAnalytics;

	if (isLoading) return <PageLoader />;

	if (!project) return <PageError message="Project not found" />;

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<ProjectAvatar
						image={project?.imageUrl}
						name={project?.name}
						className="h-10 w-10"
					/>
					<p className="text-lg font-semibold">{project?.name}</p>
				</div>
				<Button
					variant={'secondary'}
					size={'sm'}
					asChild>
					<Link
						href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
						<PencilIcon className="size-4 mr-2" />
						Edit Project
					</Link>
				</Button>
			</div>
			{analytics ? <Analytics data={analytics} /> : null}
			<TaskViewSwitcher />
		</div>
	);
}
