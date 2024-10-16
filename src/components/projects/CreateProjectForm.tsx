'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
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

import { useCreateProject } from '@/features/projects/api/useCreateProject';
import { createProjectSchema } from '@/features/projects/projects.schema';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';
import { cn } from '@/lib/utils';

interface ICreateProjectForm {
	onCancel?: () => void;
}

export function CreateProjectForm({ onCancel }: ICreateProjectForm) {
	const workspaceId = useWorkspaceId();
	const router = useRouter();
	const { mutate, isPending } = useCreateProject();

	const inputRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof createProjectSchema>>({
		resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
		defaultValues: {
			name: '',
		},
	});

	function onSubmit(values: z.infer<typeof createProjectSchema>) {
		const finalValues = {
			...values,
			workspaceId,
			image: values.image instanceof File ? values.image : '',
		};

		mutate(
			{ form: finalValues },
			{
				onSuccess: () => {
					form.reset();
					/*TODO: redirect to project */
				},
			}
		);
	}

	function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			form.setValue('image', file);
		}
	}

	return (
		<Card className="h-full w-full border-none shadow-none">
			<CardHeader className="flex p-7">
				<CardTitle className="text-xl font-bold">
					Create a new project
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
										<FormLabel>Project Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter project name"
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
												<p className="text-sm">Project Icon</p>
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
														onClick={() => inputRef.current?.click()}
													>
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
														}}
													>
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
								className={cn(!onCancel && 'invisible')}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								size={'lg'}
								disabled={isPending}
							>
								Create Project
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
