import { redirect } from 'next/navigation';

import { MembersList } from '@/components/members/MembersList';

import { getCurrent } from '@/features/auth/queries';

export default async function WorkspaceIdMembersPage() {
	const user = await getCurrent();
	if (!user) redirect('/sign-in');

	return (
		<div className="w-full lg:max-w-xl">
			<MembersList />
		</div>
	);
}
