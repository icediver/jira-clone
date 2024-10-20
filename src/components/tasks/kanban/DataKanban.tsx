import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd';
import { useCallback, useEffect, useState } from 'react';

import { KanbanCard } from './KanbanCard';
import { KanbanColumnHeader } from './KanbanColumnHeader';
import { TaskStatus, TaskType } from '@/features/tasks/task.types';

const boards: TaskStatus[] = [
	TaskStatus.BACKLOG,
	TaskStatus.TODO,
	TaskStatus.IN_PROGRESS,
	TaskStatus.IN_REVIEW,
	TaskStatus.DONE,
];

type TaskStateType = {
	[key in TaskStatus]: TaskType[];
};

interface IDataKanban {
	data: TaskType[];
	onChange: (
		tasks: {
			$id: string;
			status: TaskStatus;
			position: number;
		}[]
	) => void;
}

export function DataKanban({ data, onChange }: IDataKanban) {
	const [tasks, setTasks] = useState<TaskStateType>(() => {
		const initialTasks: TaskStateType = {
			[TaskStatus.BACKLOG]: [],
			[TaskStatus.TODO]: [],
			[TaskStatus.IN_PROGRESS]: [],
			[TaskStatus.IN_REVIEW]: [],
			[TaskStatus.DONE]: [],
		};
		data.forEach((task) => {
			initialTasks[task.status].push(task);
		});
		Object.keys(initialTasks).forEach((status) => {
			initialTasks[status as TaskStatus].sort(
				(a, b) => a.position - b.position
			);
		});
		return initialTasks;
	});

	useEffect(() => {
		const newTasks: TaskStateType = {
			[TaskStatus.BACKLOG]: [],
			[TaskStatus.TODO]: [],
			[TaskStatus.IN_PROGRESS]: [],
			[TaskStatus.IN_REVIEW]: [],
			[TaskStatus.DONE]: [],
		};
		data.forEach((task) => {
			newTasks[task.status].push(task);
		});
		Object.keys(newTasks).forEach((status) => {
			newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
		});
		setTasks(newTasks);
	}, [data]);

	const onDragEnd = useCallback(
		(result: DropResult) => {
			if (!result.destination) return;
			const { source, destination } = result;

			const sourceStatus = source.droppableId as TaskStatus;
			const destinationStatus = destination.droppableId as TaskStatus;

			let updatesPayload: {
				$id: string;
				status: TaskStatus;
				position: number;
			}[] = [];

			setTasks((prevTasks) => {
				const newTasks = { ...prevTasks };

				//Safely remove the task from the source column

				const sourceColumn = [...newTasks[sourceStatus]];
				const [movedTask] = sourceColumn.splice(source.index, 1);

				//If there's no moved task, (shouldn't happen, but just in case), return the previous state

				if (!movedTask) {
					console.error('No task found at the source index');
					return prevTasks;
				}

				//Create a new task object with potentially updated status

				const updatedMovedTask =
					sourceStatus !== destinationStatus
						? { ...movedTask, status: destinationStatus }
						: movedTask;
				//Update the source column
				newTasks[sourceStatus] = sourceColumn;

				//Add the task to the destination column
				const destinationColumn = [...newTasks[destinationStatus]];
				destinationColumn.splice(destination.index, 0, updatedMovedTask);
				newTasks[destinationStatus] = destinationColumn;

				//Prepare minimal updates payloads
				updatesPayload = [];

				//Always update the moved task
				updatesPayload.push({
					$id: updatedMovedTask.$id,
					status: destinationStatus,
					position: Math.min((destination.index + 1) * 1000, 1_000_000),
				});
				//Update position for affected tasks in the destination column

				newTasks[destinationStatus].forEach((task, index) => {
					if (task && task.$id !== updatedMovedTask.$id) {
						const newPosition = Math.min((index + 1) * 1000, 1_000_000);
						if (task.position !== newPosition) {
							updatesPayload.push({
								$id: task.$id,
								status: destinationStatus,
								position: newPosition,
							});
						}
					}
				});
				return newTasks;
			});
			onChange(updatesPayload);
		},
		[onChange]
	);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex overflow-x-auto">
				{boards.map((board) => {
					return (
						<div
							key={board}
							className="mx-2 min-w-[200px] flex-1 rounded-md bg-muted p-1.5 ">
							<KanbanColumnHeader
								board={board}
								taskCount={tasks[board].length}
							/>
							<Droppable droppableId={board}>
								{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className="min-h-[200px] py-1.5">
										{tasks[board].map((task, index) => (
											<Draggable
												key={task.$id}
												index={index}
												draggableId={task.$id}>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}>
														<KanbanCard task={task} />
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					);
				})}
			</div>
		</DragDropContext>
	);
}
