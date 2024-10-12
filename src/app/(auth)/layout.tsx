'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/shadcn/button';

type Props = { children: React.ReactNode };

export default function AuthLayout({ children }: Props) {
	const pathname = usePathname();
	const isSignIn = pathname === '/sign-in';

	return (
		<main className="min-h-screen bg-neutral-100">
			<div className="mx-auto max-w-screen-2xl p-4">
				<nav className="flex items-center justify-between">
					<Link href="/">
						<Image
							src="/images/logo.svg"
							alt="logo"
							width={152}
							height={56}
						/>
					</Link>
					<Button
						asChild
						variant={'secondary'}
					>
						<Link href={isSignIn ? '/sign-up' : '/sign-in'}>
							{isSignIn ? 'Sign Up' : 'Login'}
						</Link>
					</Button>
				</nav>
				<div className="flex flex-col items-center justify-center pt-4 md:pt-14">
					{children}
				</div>
			</div>
		</main>
	);
}
