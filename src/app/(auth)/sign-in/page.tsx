import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/actions';
import { SignInCard } from '@/features/auth/sign-in-card/SignInCard';

export default async function SignInPage() {
	const user = await getCurrent();

	console.log({ user });

	if (user) redirect('/');

	return <SignInCard />;
}
