'use client';

import { ResponsiveModal } from '../ui/modals/ResponsiveModal';

import { EditTaskFormWrapper } from './EditTaskFormWrapper';
import { useEditTaskModal } from '@/features/tasks/hooks/useEditTaskModal';

export function EditTaskModal() {
	const { taskId, close } = useEditTaskModal();

	return (
		<ResponsiveModal
			isOpen={!!taskId}
			onOpenChange={close}>
			{taskId && (
				<EditTaskFormWrapper
					id={taskId}
					onCancel={close}
				/>
			)}
		</ResponsiveModal>
	);
}
