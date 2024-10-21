'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, CopyIcon, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { DottedSeparator } from '@/components/ui/dotted-separator/DottedSeparator';
import { Avatar, AvatarFallback } from '@/components/ui/shadcn/avatar';
import { Button } from '@/components/ui/shadcn/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/shadcn/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/shadcn/form';
import { Input } from '@/components/ui/shadcn/input';

import { useConfirm } from '@/hooks/useConfirm';

import { useDeleteWorkspace } from '@/features/workspaces/api/useDeleteWorkspace';
import { useResetInviteCode } from '@/features/workspaces/api/useResetInviteCode';
import { useUpdateWorkspace } from '@/features/workspaces/api/useUpdateWorkspace';
import { editWorkspaceSchema } from '@/features/workspaces/schemas';
import { WorkspaceType } from '@/features/workspaces/types/workspace.type';
import { cn } from '@/lib/utils';

interface IEditWorkspaceForm {
	onCancel?: () => void;
	initialValues: WorkspaceType;
}

export function EditWorkspaceForm({
	onCancel,
	initialValues,
}: IEditWorkspaceForm) {
	const router = useRouter();
	const { mutate, isPending } = useUpdateWorkspace();
	const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
		useDeleteWorkspace();
	const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
		useResetInviteCode();

	const [DeleteDialog, confirmDelete] = useConfirm(
		'Delete Workspace',
		'This action cannot be undone',
		'destructive'
	);

	const [ResetDialog, confirmReset] = useConfirm(
		'Reset Invite Code',
		'This will invalidate the current invite link',
		'destructive'
	);

	const inputRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof editWorkspaceSchema>>({
		resolver: zodResolver(editWorkspaceSchema),
		defaultValues: {
			...initialValues,
			image: initialValues.imageUrl ?? '',
		},
	});

	async function handleDelete() {
		const ok = await confirmDelete();
		if (!ok) return;

		deleteWorkspace(
			{
				param: { workspaceId: initialValues.$id },
			},
			{
				onSuccess: () => {
					//router.push('/');
					window.location.href = '/';
				},
			}
		);
	}

	async function handleResetInviteCode() {
		const ok = await confirmReset();
		if (!ok) return;

		resetInviteCode({
			param: { workspaceId: initialValues.$id },
		});
	}

	function onSubmit(values: z.infer<typeof editWorkspaceSchema>) {
		const finalValues = {
			...values,
			image: values.image instanceof File ? values.image : '',
		};

		mutate({ form: finalValues, param: { workspaceId: initialValues.$id } });
	}

	function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			form.setValue('image', file);
		}
	}

	const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

	function handleCopyInviteLink() {
		navigator.clipboard
			.writeText(fullInviteLink)
			.then(() => toast.success('Invite link copied to clipboard'));
	}

	return (
		<div className="flex flex-col gap-y-4">
			<DeleteDialog />
			<ResetDialog />
			<Card className="h-full w-full border-none shadow-none">
				<CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
					<Button
						size="sm"
						variant="secondary"
						onClick={
							onCancel
								? onCancel
								: () => router.push(`/workspaces/${initialValues.$id}`)
						}>
						<ArrowLeftIcon className="size-4 mr-2" />
						Back
					</Button>
					<CardTitle className="text-xl font-bold">
						{initialValues.name}
					</CardTitle>
				</CardHeader>
				<div className="px-7">
					<DottedSeparator />
				</div>
				<CardContent className="p-7">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Workspace Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter workspace name"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="image"
									render={({ field }) => (
										<div className="flex flex-col gap-y-2">
											<div className="flex items-center gap-x-5">
												{field.value ? (
													<div className="size-[72px] relative overflow-hidden rounded-md">
														<Image
															src={
																field.value instanceof File
																	? URL.createObjectURL(field.value)
																	: field.value
															}
															alt="Logo"
															fill
															className="object-cover"
														/>
													</div>
												) : (
													<Avatar className="size-[72px]">
														<AvatarFallback>
															<ImageIcon className="size-[36px] text-neutral-400" />
														</AvatarFallback>
													</Avatar>
												)}
												<div className="flex flex-col">
													<p className="text-sm">Workspace Icon</p>
													<p className="text-sm text-muted-foreground">
														JPG, PNG, SVG or JPEG, max 1mb
													</p>
													<input
														type="file"
														className="hidden"
														accept=".jpg,.png,.jpeg,.svg"
														ref={inputRef}
														disabled={isPending}
														onChange={handleImageChange}
													/>
													{!field.value ? (
														<Button
															type="button"
															disabled={isPending}
															variant="tertiary"
															size="xs"
															className="mt-2 w-fit"
															onClick={() => inputRef.current?.click()}>
															Upload Image
														</Button>
													) : (
														<Button
															type="button"
															disabled={isPending}
															variant="destructive"
															size="xs"
															className="mt-2 w-fit"
															onClick={() => {
																field.onChange(null);
																if (inputRef.current) {
																	inputRef.current.value = '';
																}
															}}>
															Remove Image
														</Button>
													)}
												</div>
											</div>
										</div>
									)}
								/>
							</div>
							<DottedSeparator className="py-7" />
							<div className="flex items-center justify-between">
								<Button
									type="button"
									onClick={onCancel}
									variant="secondary"
									size={'lg'}
									disabled={isPending}
									className={cn(!onCancel && 'invisible')}>
									Cancel
								</Button>
								<Button
									type="submit"
									size={'lg'}
									disabled={isPending}>
									Save Changes
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card className="h-full w-full border-none shadow-none">
				<CardContent className="p-7">
					<div className="flex flex-col">
						<h3 className="font-bold">Invite Members</h3>
						<p className="text-sm text-muted-foreground">
							Use the invite link to add members to your workspace
						</p>
						<div className="mt-4">
							<div className="flex items-center gap-x-2">
								<Input
									disabled
									value={fullInviteLink}
								/>
								<Button
									onClick={handleCopyInviteLink}
									variant={'secondary'}
									className="size-12">
									<CopyIcon className="size-5" />
								</Button>
							</div>
						</div>
						<DottedSeparator className="py-7" />
						<Button
							variant={'destructive'}
							onClick={handleResetInviteCode}
							className="ml-auto mt-6 w-fit"
							size={'sm'}
							type="button"
							disabled={isPending || isResettingInviteCode}>
							Reset invite link
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card className="h-full w-full border-none shadow-none">
				<CardContent className="p-7">
					<div className="flex flex-col">
						<h3 className="font-bold">Danger Zone</h3>
						<p className="text-sm text-muted-foreground">
							Deleting a workspace is a irreversible and will remove all
							associated data.
						</p>
						<DottedSeparator className="py-7" />
						<Button
							variant={'destructive'}
							onClick={handleDelete}
							className="ml-auto mt-6 w-fit"
							size={'sm'}
							type="button"
							disabled={isPending || isDeletingWorkspace}>
							Delete Work
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
