import { DottedSeparator } from '../ui/dotted-separator/DottedSeparator';
import { ScrollArea, ScrollBar } from '../ui/shadcn/scroll-area';

import { AnalyticsCard } from './AnalyticsCard';
import { ProjectAnaliticsResponseType } from '@/features/projects/api/useGetProjectAnalitics';

export function Analytics({ data }: ProjectAnaliticsResponseType) {
	if (!data) return null;
	return (
		<ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-lg border">
			<div className="flex w-full flex-row">
				<div className="flex flex-1 items-center">
					<AnalyticsCard
						title="Total Tasks"
						value={data.taskCount}
						variant={data.taskDifference > 0 ? 'up' : 'down'}
						increaseValue={data.taskDifference}
					/>
					<DottedSeparator direction="vertical" />
				</div>
				<div className="flex flex-1 items-center">
					<AnalyticsCard
						title="Assigned Tasks"
						value={data.assignedTaskCount}
						variant={data.assignedTaskDifference > 0 ? 'up' : 'down'}
						increaseValue={data.assignedTaskDifference}
					/>
					<DottedSeparator direction="vertical" />
				</div>
				<div className="flex flex-1 items-center">
					<AnalyticsCard
						title="Completed Tasks"
						value={data.completedTaskCount}
						variant={data.completedTaskDifference > 0 ? 'up' : 'down'}
						increaseValue={data.completedTaskDifference}
					/>
					<DottedSeparator direction="vertical" />
				</div>
				<div className="flex flex-1 items-center">
					<AnalyticsCard
						title="Overdue Tasks"
						value={data.overdueTaskCount}
						variant={data.overdueTaskDifference > 0 ? 'up' : 'down'}
						increaseValue={data.overdueTaskDifference}
					/>
					<DottedSeparator direction="vertical" />
				</div>
				<div className="flex flex-1 items-center">
					<AnalyticsCard
						title="Incomplete Tasks"
						value={data.incompleteTaskCount}
						variant={data.incompleteTaskDifference > 0 ? 'up' : 'down'}
						increaseValue={data.incompleteTaskDifference}
					/>
					<DottedSeparator direction="vertical" />
				</div>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
