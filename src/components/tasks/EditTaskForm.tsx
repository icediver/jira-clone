'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DottedSeparator } from '@/components/ui/dotted-separator/DottedSeparator';
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

import { MemberAvatar } from '../members/MemberAvatar';
import { ProjectAvatar } from '../projects/ProjectAvatar';
import { DatePicker } from '../ui/date-picker/DatePicker';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/shadcn/select';

import { useUpdateTask } from '@/features/tasks/api/useUpdateTask';
import { createTaskSchema } from '@/features/tasks/task.schema';
import { TaskStatus, TaskType } from '@/features/tasks/task.types';
import { cn } from '@/lib/utils';

interface IEditTaskForm {
	onCancel?: () => void;
	projectOptions: { id: string; name: string; imageUrl: string }[];
	memberOptions: { id: string; name: string }[];
	initialValues: TaskType;
}

export function EditTaskForm({
	onCancel,
	projectOptions,
	memberOptions,
	initialValues,
}: IEditTaskForm) {
	const { mutate, isPending } = useUpdateTask();

	const form = useForm<z.infer<typeof createTaskSchema>>({
		resolver: zodResolver(
			createTaskSchema.omit({ workspaceId: true, description: true })
		),
		defaultValues: {
			...initialValues,
			dueDate: initialValues.dueDate
				? new Date(initialValues.dueDate)
				: undefined,
		},
	});

	function onSubmit(values: z.infer<typeof createTaskSchema>) {
		mutate(
			{ json: values, param: { taskId: initialValues.$id } },
			{
				onSuccess: () => {
					form.reset();
					onCancel?.();
				},
			}
		);
	}

	return (
		<Card className="h-full w-full border-none shadow-none">
			<CardHeader className="flex p-7">
				<CardTitle className="text-xl font-bold">Edit a task</CardTitle>
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
										<FormLabel>Task Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter task name"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dueDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Due Date</FormLabel>
										<FormControl>
											<DatePicker {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="assigneeId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Assignee</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select assignee" />
												</SelectTrigger>
											</FormControl>
											<FormMessage />
											<SelectContent>
												{memberOptions?.map((member) => (
													<SelectItem
														key={member.id}
														value={member.id}>
														<div className="flex items-center gap-x-2">
															<MemberAvatar
																className="size-6"
																name={member.name}
															/>
															{member.name}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<FormMessage />
											<SelectContent>
												<SelectItem value={TaskStatus.BACKLOG}>
													Backog
												</SelectItem>
												<SelectItem value={TaskStatus.IN_PROGRESS}>
													In Progress
												</SelectItem>
												<SelectItem value={TaskStatus.IN_REVIEW}>
													In Review
												</SelectItem>
												<SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
												<SelectItem value={TaskStatus.DONE}>Done</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="projectId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select project" />
												</SelectTrigger>
											</FormControl>
											<FormMessage />
											<SelectContent>
												{projectOptions?.map((project) => (
													<SelectItem
														key={project.id}
														value={project.id}>
														<div className="flex items-center gap-x-2">
															<ProjectAvatar
																className="size-6"
																name={project.name}
																image={project.imageUrl}
															/>
															{project.name}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
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
								Edit Changes
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
