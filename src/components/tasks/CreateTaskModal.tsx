'use client';

import { ResponsiveModal } from '../ui/modals/ResponsiveModal';

import { CreateTaskFormWrapper } from './CreateTaskFormWrapper';
import { useCreateTaskModal } from '@/features/tasks/hooks/useCreateTaskModal';

export function CreateTaskModal() {
	const { isOpen, setIsOpen } = useCreateTaskModal();

	return (
		<ResponsiveModal
			isOpen={isOpen}
			onOpenChange={setIsOpen}
		>
			<CreateTaskFormWrapper onCancel={() => setIsOpen(false)} />
		</ResponsiveModal>
	);
}
