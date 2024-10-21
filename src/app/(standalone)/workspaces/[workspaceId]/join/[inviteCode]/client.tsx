'use client';

import { PageError } from '@/components/ui/page-error/PageError';
import { PageLoader } from '@/components/ui/page-loader/PageLoader';
import { JoinWorkspaceForm } from '@/components/workspaces/JoinWorkspaceForm';

import { useGetWorkspaceInfo } from '@/features/workspaces/api/useGetWorkspaceInfo';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

export function WorkspaceIdJoinClient() {
	const workspaceId = useWorkspaceId();

	const { data: initialValues, isLoading } = useGetWorkspaceInfo({
		workspaceId,
	});

	if (isLoading) return <PageLoader />;
	if (!initialValues) return <PageError message="Workspace not found" />;

	return (
		<div className="w-full lg:max-w-xl">
			<JoinWorkspaceForm initialValues={initialValues} />
		</div>
	);
}
