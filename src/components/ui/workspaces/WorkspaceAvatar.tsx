import Image from 'next/image';

import { Avatar, AvatarFallback } from '../shadcn/avatar';

import { cn } from '@/lib/utils';

interface IWorkspaceAvatar {
	image?: string;
	name: string;
	className?: string;
}

export function WorkspaceAvatar({ image, name, className }: IWorkspaceAvatar) {
	if (image) {
		return (
			<div
				className={cn('size-10 relative overflow-hidden rounded-md', className)}
			>
				<Image
					src={image}
					alt={name}
					fill
					className={'object-cover'}
				/>
			</div>
		);
	}
	return (
		<Avatar className={cn('size-10 rounded-md', className)}>
			<AvatarFallback className="font-simbold rounded-md bg-blue-600 text-lg uppercase text-white">
				{name[0]}
			</AvatarFallback>
		</Avatar>
	);
}
