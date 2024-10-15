import { redirect } from 'next/navigation';

import { SignUpCard } from '@/components/auth/sign-up-card/SignUpCard';

import { getCurrent } from '@/features/auth/queries';

export default async function SignupPage() {
	const user = await getCurrent();

	if (user) redirect('/');

	return <SignUpCard />;
}
