import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/queries';

export default async function WorkspaceIdPage({
	params,
}: {
	params: { workspaceId: string };
}) {
	const user = await getCurrent();

	if (!user) redirect('/sign-in');

	return <div>Page WorkspaceId {params.workspaceId}</div>;
}
