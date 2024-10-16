'use client';

import { ArrowLeftIcon, MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useConfirm } from '@/hooks/useConfirm';

import { DottedSeparator } from '../ui/dotted-separator/DottedSeparator';
import { Button } from '../ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/shadcn/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/shadcn/dropdown-menu';
import { Separator } from '../ui/shadcn/separator';

import { MemberAvatar } from './MemberAvatar';
import { useDeleteMember } from '@/features/members/api/useDeleteMember';
import { useGetMembers } from '@/features/members/api/useGetMembers';
import { useUpdateMember } from '@/features/members/api/useUpdateMember';
import { MemberRole } from '@/features/members/members.types';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

export function MembersList() {
	const workspaceId = useWorkspaceId();
	const [ConfirmDialog, confirm] = useConfirm(
		'Remove member',
		'This member will be removed from the workspace',
		'destructive'
	);

	const { data } = useGetMembers({ workspaceId });
	const { mutate: deleteMember, isPending: isDeletingMember } =
		useDeleteMember();
	const { mutate: updateMember, isPending: isUpdatingMember } =
		useUpdateMember();

	function handleUpdateMember(memberId: string, role: MemberRole) {
		updateMember({ json: { role }, param: { memberId } });
	}

	async function handleDeleteMember(memberId: string) {
		const ok = await confirm();
		if (!ok) return;

		deleteMember(
			{ param: { memberId } },
			{
				onSuccess: () => {
					window.location.reload();
				},
			}
		);
	}

	return (
		<Card className="h-full w-full border-none shadow-none">
			<ConfirmDialog />
			<CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
				<Button
					variant={'secondary'}
					size="sm"
					asChild
				>
					<Link href={`/workspaces/${workspaceId}`}>
						<ArrowLeftIcon className="size-4 mr-2" />
						Back
					</Link>
				</Button>
				<CardTitle className="text-xl font-bold">Members list</CardTitle>
			</CardHeader>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				{data?.documents.map((member, index) => (
					<React.Fragment key={member.$id}>
						<div className="flex items-center gap-2">
							<MemberAvatar
								name={member.name}
								className="size-10"
								fallbackClassName="text-lg"
							/>
							<div className="flex flex-col">
								<p className="text-sm font-medium">{member.name}</p>
								<p className="text-xs text-muted-foreground">{member.email}</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="ml-auto "
										variant={'secondary'}
										size="sm"
									>
										<MoreVerticalIcon className="size-4 text-muted-foreground" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side="bottom"
									align="end"
								>
									<DropdownMenuItem
										className="font-medium "
										onClick={() =>
											handleUpdateMember(member.$id, MemberRole.ADMIN)
										}
										disabled={isUpdatingMember}
									>
										Set as Administrator
									</DropdownMenuItem>
									<DropdownMenuItem
										className="font-medium "
										onClick={() =>
											handleUpdateMember(member.$id, MemberRole.MEMBER)
										}
										disabled={isUpdatingMember}
									>
										Set as Member
									</DropdownMenuItem>
									<DropdownMenuItem
										className="font-medium text-amber-700"
										onClick={() => handleDeleteMember(member.$id)}
										disabled={isDeletingMember}
									>
										Remove {member.name}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						{index < data.documents.length - 1 && (
							<Separator className="my-2.5 " />
						)}
					</React.Fragment>
				))}
			</CardContent>
		</Card>
	);
}
