import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';
import { siteConfig } from '@/config/site.metadata';
import { cn } from '@/lib/utils';
import { QueryProvider } from '@/providers/query-provider/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: '/images/favicon.svg',
			href: '/images/favicon.svg',
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'min-h-screen antialiased')}>
				<QueryProvider>
					<Toaster richColors />
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
