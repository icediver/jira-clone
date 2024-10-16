import { Avatar, AvatarFallback } from '../ui/shadcn/avatar';

import { cn } from '@/lib/utils';

interface IMemberAvatar {
	name: string;
	className?: string;
	fallbackClassName?: string;
}

export function MemberAvatar({
	name,
	className,
	fallbackClassName,
}: IMemberAvatar) {
	return (
		<Avatar
			className={cn(
				'size-5 rounded-full border border-neutral-300  transition',
				className
			)}
		>
			<AvatarFallback
				className={cn(
					'flex items-center justify-center bg-neutral-200 font-medium text-neutral-500',
					fallbackClassName
				)}
			>
				{name.charAt(0).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
}
