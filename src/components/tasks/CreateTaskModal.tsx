'use client';

import { ResponsiveModal } from '../ui/modals/ResponsiveModal';

import { CreateTaskFormWrapper } from './CreateTaskFormWrapper';
import { useCreateTaskModal } from '@/features/tasks/hooks/useCreateTaskModal';

export function CreateTaskModal() {
	const { isOpen, setIsOpen, close } = useCreateTaskModal();

	return (
		<ResponsiveModal
			isOpen={isOpen}
			onOpenChange={setIsOpen}>
			<CreateTaskFormWrapper onCancel={close} />
		</ResponsiveModal>
	);
}
