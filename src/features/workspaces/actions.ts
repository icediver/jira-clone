'use server';

import { cookies } from 'next/headers';
import { Account, Client, Databases, Query } from 'node-appwrite';

import { getMember } from '../members/member.utils';

import { WorkspaceType } from './types/workspace.type';
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from '@/config/db.config';
import { AUTH_COOKIE_NAME } from '@/features/auth/constants';

export const getWorkspaces = async () => {
	try {
		const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

		const session = cookies().get(AUTH_COOKIE_NAME);

		if (!session) return { documents: [], total: 0 };

		client.setSession(session.value);

		const databases = new Databases(client);
		const account = new Account(client);
		const user = await account.get();

		const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
			Query.equal('userId', user.$id),
		]);

		if (members.total === 0) {
			return { documents: [], total: 0 };
		}

		const workspaceId = members.documents.map((member) => member.workspaceId);

		const workspaces = await databases.listDocuments(
			DATABASE_ID,
			WORKSPACE_ID,
			[Query.orderDesc('$createdAt'), Query.contains('$id', workspaceId)]
		);

		return workspaces;
	} catch {
		return { documents: [], total: 0 };
	}
};
export const getWorkspace = async ({
	workspaceId,
}: {
	workspaceId: string;
}) => {
	try {
		const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

		const session = cookies().get(AUTH_COOKIE_NAME);

		if (!session) return null;

		client.setSession(session.value);

		const databases = new Databases(client);
		const account = new Account(client);
		const user = await account.get();

		const member = await getMember({
			databases,
			workspaceId,
			userId: user.$id,
		});

		if (!member) return null;

		const workspace = await databases.getDocument<WorkspaceType>(
			DATABASE_ID,
			WORKSPACE_ID,
			workspaceId
		);

		return workspace;
	} catch {
		return null;
	}
};
