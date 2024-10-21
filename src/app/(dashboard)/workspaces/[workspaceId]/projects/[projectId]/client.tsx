'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { ProjectAvatar } from '@/components/projects/ProjectAvatar';
import { TaskViewSwitcher } from '@/components/tasks/TaskViewSwitcher';
import { PageError } from '@/components/ui/page-error/PageError';
import { PageLoader } from '@/components/ui/page-loader/PageLoader';
import { Button } from '@/components/ui/shadcn/button';

import { useGetProject } from '@/features/projects/api/useGetProject';
import { useProjectId } from '@/features/projects/hooks/useProjectId';

export function ProjectIdClient() {
	const projectId = useProjectId();
	const { data, isLoading } = useGetProject({ projectId });

	if (isLoading) return <PageLoader />;

	if (!data) return <PageError message="Project not found" />;

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<ProjectAvatar
						image={data?.imageUrl}
						name={data?.name}
						className="h-10 w-10"
					/>
					<p className="text-lg font-semibold">{data?.name}</p>
				</div>
				<Button
					variant={'secondary'}
					size={'sm'}
					asChild>
					<Link
						href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
						<PencilIcon className="size-4 mr-2" />
						Edit Project
					</Link>
				</Button>
			</div>
			<TaskViewSwitcher />
		</div>
	);
}
