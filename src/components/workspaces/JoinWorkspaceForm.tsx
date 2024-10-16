'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DottedSeparator } from '../ui/dotted-separator/DottedSeparator';
import { Button } from '../ui/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/shadcn/card';

import { useJoinWorkspace } from '@/features/workspaces/api/useJoinWorkspace';
import { useInviteCode } from '@/features/workspaces/hooks/useInviteCode';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

interface Props {
	initialValues: {
		name: string;
	};
}

export function JoinWorkspaceForm({ initialValues }: Props) {
	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const inviteCode = useInviteCode();
	const { mutate, isPending } = useJoinWorkspace();

	const onSubmit = () => {
		mutate(
			{
				param: { workspaceId: workspaceId },
				json: { code: inviteCode },
			},
			{
				onSuccess: ({ data }) => {
					router.push(`/workspaces/${data.$id}`);
				},
			}
		);
	};

	return (
		<Card className="h-full w-full border-none shadow-none">
			<CardHeader className="p-7">
				<CardTitle className="text-xl font-bold ">Join workspace</CardTitle>
				<CardDescription>
					You&apos;ve been invited to join <strong>{initialValues.name}</strong>{' '}
					workspace
				</CardDescription>
			</CardHeader>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
					<Button
						variant={'secondary'}
						type="button"
						asChild
						className="w-full lg:w-fit"
						size="lg"
						disabled={isPending}
					>
						<Link href={'/'}>Cancel</Link>
					</Button>
					<Button
						size="lg"
						type="button"
						className="w-full lg:w-fit"
						onClick={onSubmit}
						disabled={isPending}
					>
						Join Workspace
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
