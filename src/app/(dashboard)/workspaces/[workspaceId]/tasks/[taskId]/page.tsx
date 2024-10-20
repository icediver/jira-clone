import { redirect } from 'next/navigation';

import { TaskIdClient } from './client';
import { getCurrent } from '@/features/auth/queries';

export default async function TaskIdPage() {
	const user = await getCurrent();
	if (!user) redirect('/sign-in');

	return <TaskIdClient />;
}
