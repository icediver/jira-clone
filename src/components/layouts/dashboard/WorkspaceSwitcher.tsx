'use client';

import { useRouter } from 'next/navigation';
import { RiAddCircleFill } from 'react-icons/ri';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/shadcn/select';
import { WorkspaceAvatar } from '@/components/workspaces/WorkspaceAvatar';

import { useGetWorkspaces } from '@/features/workspaces/api/useGetWorkspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/hooks/useCreateWorkspaceModal';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

export function WorkspaceSwitcher() {
	const workspacesId = useWorkspaceId();
	const router = useRouter();
	const { data: workspaces } = useGetWorkspaces();
	const { open } = useCreateWorkspaceModal();

	function onSelect(id: string) {
		router.push(`/workspaces/${id}`);
	}

	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between">
				<p className="text-xs uppercase text-neutral-500">Workspaces</p>
				<RiAddCircleFill
					onClick={open}
					className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
				/>
			</div>
			<Select
				onValueChange={onSelect}
				value={workspacesId}
			>
				<SelectTrigger className="w-full bg-neutral-200 p-1 font-medium">
					<SelectValue placeholder="No workspace selected" />
				</SelectTrigger>
				<SelectContent>
					{workspaces?.documents.map((workspace) => (
						<SelectItem
							key={workspace.$id}
							value={workspace.$id}
						>
							<div className="flex items-center justify-start gap-3 font-medium">
								<WorkspaceAvatar
									image={workspace.imageUrl}
									name={workspace.name}
								/>
								<span className="truncate">{workspace.name}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
