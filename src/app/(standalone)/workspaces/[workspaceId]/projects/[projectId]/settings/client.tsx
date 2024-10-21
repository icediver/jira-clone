'use client';

import { EditProjectForm } from '@/components/projects/EditProjectForm';
import { PageError } from '@/components/ui/page-error/PageError';
import { PageLoader } from '@/components/ui/page-loader/PageLoader';

import { useGetProject } from '@/features/projects/api/useGetProject';
import { useProjectId } from '@/features/projects/hooks/useProjectId';

export function ProjectIdSettingsClient() {
	const projectId = useProjectId();
	const { data: initialValues, isLoading } = useGetProject({ projectId });

	if (isLoading) return <PageLoader />;
	if (!initialValues) return <PageError message="Project not found" />;

	return (
		<div className="w-full lg:max-w-xl">
			<EditProjectForm initialValues={initialValues} />
		</div>
	);
}
