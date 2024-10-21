import { redirect } from 'next/navigation';

import { ProjectIdSettingsClient } from './client';
import { getCurrent } from '@/features/auth/queries';

export default async function WorkspaceSettingsPage() {
	const user = await getCurrent();

	if (!user) redirect('/sign-in');

	return <ProjectIdSettingsClient />;
}
