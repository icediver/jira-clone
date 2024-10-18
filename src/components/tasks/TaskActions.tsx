import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/shadcn/dropdown-menu';

interface ITaskActions {
	id: string;
	projectId: string;
	children?: React.ReactNode;
}

export function TaskActions({ id, projectId, children }: ITaskActions) {
	return (
		<div className="flex justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-48"
				>
					<DropdownMenuItem
						onClick={() => {}}
						disabled={false}
						className="p-[10px] font-medium"
					>
						<ExternalLinkIcon className="size-4 mr-2 stroke-2" />
						Task Details
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {}}
						disabled={false}
						className="p-[10px] font-medium"
					>
						<ExternalLinkIcon className="size-4 mr-2 stroke-2" />
						Open Project{' '}
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => {}}
						disabled={false}
						className="p-[10px] font-medium"
					>
						<PencilIcon className="size-4 mr-2 stroke-2" />
						Edit Task
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {}}
						disabled={false}
						className="p-[10px] font-medium text-amber-700 focus:text-amber-700"
					>
						<TrashIcon className="size-4 mr-2 stroke-2" />
						Delete Task{' '}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
