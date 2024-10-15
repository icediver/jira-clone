import { redirect } from 'next/navigation';

import { SignInCard } from '@/components/auth/sign-in-card/SignInCard';

import { getCurrent } from '@/features/auth/queries';

export default async function SignInPage() {
	const user = await getCurrent();

	if (user) redirect('/');

	return <SignInCard />;
}
