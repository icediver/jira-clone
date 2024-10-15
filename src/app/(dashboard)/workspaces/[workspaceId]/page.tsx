import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/actions';

export default function WorkspaceIdPage({
	params,
}: {
	params: { workspaceId: string };
}) {
	const user = getCurrent();
	if (!user) redirect('/sign-in');

	return <div>Page WorkspaceId {params.workspaceId}</div>;
}
