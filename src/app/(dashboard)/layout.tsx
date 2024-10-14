import { Navbar } from '@/components/layouts/dashboard/Navbar';
import { Sidebar } from '@/components/layouts/dashboard/Sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen">
			<div className="flex h-full w-full">
				<div className="fixed left-0 top-0 hidden h-full overflow-auto lg:block lg:w-[264px]">
					<Sidebar />
				</div>
				<div className=" ww-full lg:pl-[264px]">
					<div className="mx-auto h-full max-w-screen-2xl">
						<Navbar />
						<main className="flex h-full flex-col px-6 py-8">
							{children}
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
