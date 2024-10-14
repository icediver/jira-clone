import { redirect } from 'next/navigation';

import { CreateWorkspaceForm } from '@/components/ui/create-workspace-form/CreateWorkspaceForm';

import { getCurrent } from '@/features/auth/actions';

export default async function Home() {
	const user = await getCurrent();

	if (!user) redirect('/sign-in');

	return (
		<div className="h-full bg-neutral-500 p-4">
			<CreateWorkspaceForm />
		</div>
	);
}
