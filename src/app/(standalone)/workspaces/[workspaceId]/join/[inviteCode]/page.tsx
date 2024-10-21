import { redirect } from 'next/navigation';

import { WorkspaceIdJoinClient } from './client';
import { getCurrent } from '@/features/auth/queries';

export default async function WorkspaceIdJoinPage() {
	const user = await getCurrent();
	if (!user) redirect('/sign-in');

	return <WorkspaceIdJoinClient />;
}
