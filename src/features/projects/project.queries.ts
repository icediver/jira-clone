import { getMember } from '../members/member.utils';

import { ProjectType } from './server/project.types';
import { DATABASE_ID, PROJECTS_ID } from '@/config/db.config';
import { createSessionClient } from '@/lib/appwrite';

export const getProject = async ({ projectId }: { projectId: string }) => {
	const { databases, account } = await createSessionClient();
	const user = await account.get();

	const project = await databases.getDocument<ProjectType>(
		DATABASE_ID,
		PROJECTS_ID,
		projectId
	);

	const member = await getMember({
		databases,
		workspaceId: project.workspaceId,
		userId: user.$id,
	});

	if (!member) throw new Error('Unauthorized');

	return project;
};
