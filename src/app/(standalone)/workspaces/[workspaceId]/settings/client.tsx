'use client';

import { PageError } from '@/components/ui/page-error/PageError';
import { PageLoader } from '@/components/ui/page-loader/PageLoader';
import { EditWorkspaceForm } from '@/components/workspaces/edit-workspace-form/EditWorkspaceForm';

import { useGetWorkspace } from '@/features/workspaces/api/useGetWorkspace';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

export function ProjectIdSettingsClient() {
	const workspaceId = useWorkspaceId();
	const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

	if (isLoading) return <PageLoader />;
	if (!initialValues) return <PageError message="Project not found" />;

	return (
		<div className="w-full lg:max-w-xl">
			<EditWorkspaceForm initialValues={initialValues} />
		</div>
	);
}
