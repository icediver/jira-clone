import { useState } from 'react';

import { ResponsiveModal } from '@/components/ui/modals/ResponsiveModal';
import { Button, type ButtonProps } from '@/components/ui/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/shadcn/card';

export function useConfirm(
	title: string,
	message: string,
	variant: ButtonProps['variant'] = 'primary'
): [() => JSX.Element, () => Promise<unknown>] {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void;
	} | null>(null);

	const confirm = async () => {
		return new Promise((resolve) => {
			setPromise({ resolve });
		});
	};

	const handleClose = () => {
		setPromise(null);
	};

	const handleConfirm = () => {
		promise?.resolve(true);
		handleClose();
	};

	const handleCancel = () => {
		promise?.resolve(false);
		handleClose();
	};

	const ConfirmationDialog = () => {
		return (
			<ResponsiveModal
				isOpen={promise !== null}
				onOpenChange={handleClose}
			>
				<Card className="h-full w-full border-none shadow-none">
					<CardContent className="pt-8">
						<CardHeader>
							<CardTitle>{title}</CardTitle>
							<CardDescription>{message}</CardDescription>
						</CardHeader>
						<div className="flex w-full flex-col items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row">
							<Button
								variant="outline"
								onClick={handleCancel}
								className="w-full lg:w-auto"
							>
								Cancel
							</Button>
							<Button
								variant={variant}
								onClick={handleConfirm}
								className="w-full lg:w-auto"
							>
								Confirm
							</Button>
						</div>
					</CardContent>
				</Card>
			</ResponsiveModal>
		);
	};
	return [ConfirmationDialog, confirm];
}
