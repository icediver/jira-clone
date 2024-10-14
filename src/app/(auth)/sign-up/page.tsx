import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/actions';
import { SignUpCard } from '@/features/auth/sign-up-card/SignUpCard';

export default async function SignupPage() {
	const user = await getCurrent();

	if (user) redirect('/');

	return <SignUpCard />;
}
