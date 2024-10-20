import { redirect } from 'next/navigation';

import { TaskViewSwitcher } from '@/components/tasks/TaskViewSwitcher';

import { getCurrent } from '@/features/auth/queries';

export default async function TasksPage() {
	const user = await getCurrent();
	if (!user) redirect('/sign-in');
	return (
		<div className="flex h-full flex-col">
			<TaskViewSwitcher hideProjectsFilter />
		</div>
	);
}
