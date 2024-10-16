'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/shadcn/button';

export default function ErrorPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-y-4">
			<AlertTriangle className="text-muted-foreground size-7" />
			<p className="text-sm text-muted-foreground">Something went wrong</p>
			<Button
				variant="secondary"
				size="sm"
				asChild
			>
				<Link href="/">Back to home</Link>
			</Button>
		</div>
	);
}
