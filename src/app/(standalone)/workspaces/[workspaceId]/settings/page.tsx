import { redirect } from 'next/navigation';

import { EditWorkspaceForm } from '@/components/workspaces/edit-workspace-form/EditWorkspaceForm';

import { getCurrent } from '@/features/auth/queries';
import { getWorkspace } from '@/features/workspaces/queries';

interface Props {
	params: {
		workspaceId: string;
	};
}

export default async function WorkspaceSettingsPage({ params }: Props) {
	const user = await getCurrent();

	if (!user) redirect('/sign-in');

	const initialValues = await getWorkspace({ workspaceId: params.workspaceId });
	return (
		<div className="w-full lg:max-w-xl">
			<EditWorkspaceForm initialValues={initialValues} />
		</div>
	);
}
