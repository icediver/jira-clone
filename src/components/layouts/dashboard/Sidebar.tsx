import Image from 'next/image';
import Link from 'next/link';

import { DottedSeparator } from '@/components/ui/dotted-separator/DottedSeparator';

import { Navigation } from './Navigation';

export function Sidebar() {
	return (
		<aside className="h-full w-full bg-neutral-100 p-4">
			<Link href="/">
				<Image
					src="/images/logo.svg"
					alt="logo"
					width={164}
					height={48}
				/>
			</Link>
			<DottedSeparator className="my-4" />
			<Navigation />
		</aside>
	);
}
