'use client';

import { CreateWorkspaceForm } from '@/components/workspaces/create-workspace-form/CreateWorkspaceForm';

import { ResponsiveModal } from './ResponsiveModal';
import { useCreateWorkspaceModal } from '@/features/workspaces/hooks/useCreateWorkspaceModal';

export function CreateWorkspaceModal() {
	const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
	return (
		<ResponsiveModal
			isOpen={isOpen}
			onOpenChange={setIsOpen}
		>
			<CreateWorkspaceForm onCancel={close} />
		</ResponsiveModal>
	);
}
