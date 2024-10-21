'use client';

import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

import { MemberAvatar } from '@/components/members/MemberAvatar';
import { Analytics } from '@/components/projects/Analytics';
import { ProjectAvatar } from '@/components/projects/ProjectAvatar';
import { DottedSeparator } from '@/components/ui/dotted-separator/DottedSeparator';
import { PageError } from '@/components/ui/page-error/PageError';
import { PageLoader } from '@/components/ui/page-loader/PageLoader';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';

import { useGetMembers } from '@/features/members/api/useGetMembers';
import { MemberType } from '@/features/members/members.types';
import { useGetProjects } from '@/features/projects/api/useGetProjects';
import { useCreateProjectModal } from '@/features/projects/hooks/useCreateProjectModal';
import { ProjectType } from '@/features/projects/server/project.types';
import { useGetTasks } from '@/features/tasks/api/useGetTasks';
import { useCreateTaskModal } from '@/features/tasks/hooks/useCreateTaskModal';
import { TaskType } from '@/features/tasks/task.types';
import { useGetWorkspaceAnalitics } from '@/features/workspaces/api/useGetWorkspaceAnalitics';
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId';

export function WorkspaceIdClient() {
	const workspaceId = useWorkspaceId();
	const { data: analytics, isLoading: isLoadingAnalytics } =
		useGetWorkspaceAnalitics({
			workspaceId,
		});
	const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
		workspaceId,
	});
	const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
		workspaceId,
	});
	const { data: members, isLoading: isLoadingMembers } = useGetMembers({
		workspaceId,
	});

	const isLoading =
		isLoadingAnalytics ||
		isLoadingTasks ||
		isLoadingProjects ||
		isLoadingMembers;

	if (isLoading) return <PageLoader />;
	if (!analytics || !tasks || !projects || !members)
		return <PageError message="Failed to load workspace" />;
	return (
		<div className="flex h-full flex-col space-y-4">
			<Analytics data={analytics} />
			<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
				<TaskList
					data={tasks.documents}
					total={tasks.total}
				/>
				<ProjectList
					data={projects.documents}
					total={projects.total}
				/>
				<MemberList
					data={members.documents}
					total={members.total}
				/>
			</div>
		</div>
	);
}

interface ITaskList {
	data: TaskType[];
	total: number;
}

export function TaskList({ data, total }: ITaskList) {
	const workspaceId = useWorkspaceId();
	const { open: createTask } = useCreateTaskModal();
	return (
		<div className="col-span-1 flex flex-col gap-y-4">
			<div className="rounded-lg bg-muted p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">Tasks ({total})</p>
					<Button
						variant={'muted'}
						size={'icon'}
						onClick={createTask}>
						<PlusIcon className="size-4 text-neutral-400" />
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<ul className="flex flex-col gap-y-4">
					{data.map((task) => (
						<li key={task.id}>
							<Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
								<Card className="rounded-lg shadow-none transition hover:opacity-75">
									<CardContent className="p-4">
										<p className="truncate text-lg font-medium">{task.name}</p>
										<div className="flex items-center gap-x-2">
											<p>{task.project?.name}</p>
											<div className="size-1 rounded-full bg-neutral-300" />
											<div className="flex items-center text-sm text-muted-foreground">
												<CalendarIcon className="size-3 mr-1" />
												<span className="truncate">
													{formatDistanceToNow(new Date(task.dueDate))}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						</li>
					))}
					<li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
						No tasks found
					</li>
				</ul>
				<Button
					asChild
					variant="muted"
					className="mt-4 w-full">
					<Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
				</Button>
			</div>
		</div>
	);
}

interface IProjectList {
	data: ProjectType[];
	total: number;
}

export function ProjectList({ data, total }: IProjectList) {
	const workspaceId = useWorkspaceId();
	const { open: createProject } = useCreateProjectModal();
	return (
		<div className="col-span-1 flex flex-col gap-y-4">
			<div className="rounded-lg border bg-white p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">Projects ({total})</p>
					<Button
						variant={'secondary'}
						size={'icon'}
						onClick={createProject}>
						<PlusIcon className="size-4 text-neutral-400" />
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{data.map((project) => (
						<li key={project.id}>
							<Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
								<Card className="rounded-lg shadow-none transition hover:opacity-75">
									<CardContent className="flex items-center gap-x-2.5 p-4">
										<ProjectAvatar
											image={project.imageUrl}
											name={project.name}
											className="size-12"
											fallbackClassName="text-lg"
										/>
										<p className="truncate text-lg font-medium">
											{project.name}
										</p>
									</CardContent>
								</Card>
							</Link>
						</li>
					))}
					<li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
						No projects found
					</li>
				</ul>
			</div>
		</div>
	);
}

interface IMemberList {
	data: MemberType[];
	total: number;
}

export function MemberList({ data, total }: IMemberList) {
	const workspaceId = useWorkspaceId();
	return (
		<div className="col-span-1 flex flex-col gap-y-4">
			<div className="rounded-lg border bg-white p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">Members ({total})</p>
					<Button
						asChild
						variant={'secondary'}
						size={'icon'}>
						<Link href={`/workspaces/${workspaceId}/members`}>
							<SettingsIcon className="size-4 text-neutral-400" />
						</Link>
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.map((member) => (
						<li key={member.id}>
							<Card className="overflow-hidden rounded-lg shadow-none">
								<CardContent className="flex flex-col items-center gap-x-2 p-3">
									<MemberAvatar
										name={member.name}
										className="size-12"
									/>
									<div className="flex flex-col items-center overflow-hidden">
										<p className="line-clamp-1 text-lg font-medium">
											{member.name}
										</p>

										<p className="line-clamp-1 text-sm text-muted-foreground">
											{member.email}
										</p>
									</div>
								</CardContent>
							</Card>
						</li>
					))}
					<li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
						No members found
					</li>
				</ul>
			</div>
		</div>
	);
}
