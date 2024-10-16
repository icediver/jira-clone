import Image from 'next/image';

import { Avatar, AvatarFallback } from '../ui/shadcn/avatar';

import { cn } from '@/lib/utils';

interface IProjectAvatar {
	image?: string;
	name: string;
	className?: string;
	fallbackClassName?: string;
}

export function ProjectAvatar({
	image,
	name,
	className,
	fallbackClassName,
}: IProjectAvatar) {
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
		<Avatar className={cn('size-5 rounded-md', className)}>
			<AvatarFallback
				className={cn(
					'font-simbold rounded-md bg-blue-600 text-sm uppercase text-white',
					fallbackClassName
				)}
			>
				{name[0]}
			</AvatarFallback>
		</Avatar>
	);
}
