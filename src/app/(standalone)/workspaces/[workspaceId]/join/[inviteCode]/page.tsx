import { redirect } from 'next/navigation';

import { JoinWorkspaceForm } from '@/components/workspaces/JoinWorkspaceForm';

import { getCurrent } from '@/features/auth/queries';
import { getWorkspaceInfo } from '@/features/workspaces/queries';

interface Props {
	params: {
		workspaceId: string;
	};
}

export default async function WorkspaceIdJoinPage({ params }: Props) {
	const user = await getCurrent();
	if (!user) redirect('/sign-in');

	const initialValues = await getWorkspaceInfo({
		workspaceId: params.workspaceId,
	});
	if (!initialValues) redirect('/');

	return (
		<div className="w-full lg:max-w-xl">
			<JoinWorkspaceForm initialValues={initialValues} />
		</div>
	);
}
