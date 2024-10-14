import { SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import {
	GoCheckCircle,
	GoCheckCircleFill,
	GoHome,
	GoHomeFill,
} from 'react-icons/go';

import { cn } from '@/lib/utils';

const routes = [
	{
		label: 'Home',
		href: '/',
		icon: GoHome,
		activeIcon: GoHomeFill,
	},
	{
		label: 'My Tasks',
		href: '/tasks',
		icon: GoCheckCircle,
		activeIcon: GoCheckCircleFill,
	},
	{
		label: 'Settings',
		href: '/settings',
		icon: SettingsIcon,
		activeIcon: SettingsIcon,
	},
	{
		label: 'Members',
		href: '/members',
		icon: UserIcon,
		activeIcon: UserIcon,
	},
];

export function Navigation() {
	return (
		<ul className="flex flex-col">
			{routes.map((route) => {
				const isActive = route.href === '/';
				const Icon = isActive
					? route.activeIcon
					: route.icon;
				return (
					<Link
						key={route.href}
						href={route.href}
					>
						<div
							className={cn(
								'flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-primary',
								isActive &&
									'bg-white text-primary shadow-sm hover:opacity-100'
							)}
						>
							<Icon className="size-5 text-neutral-500" />
							{route.label}
						</div>
					</Link>
				);
			})}
		</ul>
	);
}
