import { useMedia } from 'react-use';

import { Dialog, DialogContent } from '../shadcn/dialog';
import { Drawer, DrawerContent } from '../shadcn/drawer';

interface IResponsiveModal {
	children: React.ReactNode;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}
export function ResponsiveModal({
	children,
	isOpen,
	onOpenChange,
}: IResponsiveModal) {
	const isDesktop = useMedia('(min-width: 1024px)', true);

	if (isDesktop) {
		return (
			<Dialog
				open={isOpen}
				onOpenChange={onOpenChange}
			>
				<DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
					{children}
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Drawer
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DrawerContent>
				<div className="hide-scrollbar max-h-[85vh] overflow-y-auto">
					{children}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
