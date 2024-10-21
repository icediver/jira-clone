'use client';

import { usePathname } from 'next/navigation';

import { UserButton } from '@/components/ui/user-button/UserButton';

import { MobileSidebar } from './MobileSidebar';

const pathnameMap = {
	tasks: {
		title: 'My Tasks',
		description: 'View all of your tasks here',
	},
	projects: {
		title: 'My Projects',
		description: 'View tasks of your projects here',
	},
};

const defaultMap = {
	title: 'Home',
	description: 'Monitor all of your projects and tasks here',
};

export function Navbar() {
	const pathname = usePathname();
	const pathnameParts = pathname.split('/');
	const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

	const { title, description } = pathnameMap[pathnameKey] || defaultMap;

	return (
		<nav className="flex items-center justify-between px-6 pt-4">
			<div className="hidden flex-col lg:flex">
				<h1 className="text-2xl font-semibold">{title}</h1>
				<p className="text-muted-foreground">{description}</p>
			</div>
			<MobileSidebar />
			<UserButton />
		</nav>
	);
}
