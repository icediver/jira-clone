'use client';

import { ResponsiveModal } from '../ui/modals/ResponsiveModal';

import { CreateProjectForm } from './CreateProjectForm';
import { useCreateProjectModal } from '@/features/projects/hooks/useCreateProjectModal';

export function CreateProjectModal() {
	const { isOpen, setIsOpen, close } = useCreateProjectModal();
	return (
		<ResponsiveModal
			isOpen={isOpen}
			onOpenChange={setIsOpen}
		>
			<CreateProjectForm onCancel={close} />
		</ResponsiveModal>
	);
}
