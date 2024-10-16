import { redirect } from 'next/navigation';

import { EditProjectForm } from '@/components/projects/EditProjectForm';

import { getCurrent } from '@/features/auth/queries';
import { getProject } from '@/features/projects/project.queries';

interface Props {
	params: {
		workspaceId: string;
		projectId: string;
	};
}

export default async function ProjectIdSettingsPage({ params }: Props) {
	const user = await getCurrent();
	if (!user) redirect('/sign-in');

	const initialValues = await getProject({
		projectId: params.projectId,
	});

	return (
		<div className="w-full lg:max-w-xl">
			<EditProjectForm initialValues={initialValues} />
		</div>
	);
}
