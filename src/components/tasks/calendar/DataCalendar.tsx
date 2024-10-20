import {
	addMonths,
	format,
	getDay,
	parse,
	startOfWeek,
	subMonths,
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Button } from '@/components/ui/shadcn/button';

import { EventCard } from './EventCard';
import './data-calendar.css';
import { TaskType } from '@/features/tasks/task.types';

const locales = {
	'en-US': enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

interface IDataCalendar {
	data: TaskType[];
}

interface ICustomToolbar {
	date: Date;
	onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
}

function CustomToolbar({ date, onNavigate }: ICustomToolbar) {
	return (
		<div className="mb-4 flex w-full items-center justify-center gap-x-2 lg:w-auto lg:justify-start">
			<Button
				variant="secondary"
				size="icon"
				onClick={() => onNavigate('PREV')}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<div className="flex h-8 w-full items-center justify-center gap-x-2 rounded-md border border-input px-3 py-2 lg:w-auto">
				<CalendarIcon className="size-4" />
				<p className="text-sm">{format(date, 'MMMM yyyy')}</p>
			</div>
			<Button
				variant="secondary"
				size="icon"
				onClick={() => onNavigate('NEXT')}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</div>
	);
}

export function DataCalendar({ data }: IDataCalendar) {
	const [value, setValue] = useState(
		data.length > 0 ? new Date(data[0].dueDate) : new Date()
	);
	const events = data.map((task) => ({
		start: new Date(task.dueDate),
		end: new Date(task.dueDate),
		title: task.name,
		project: task.project,
		assignee: task.assignee,
		status: task.status,
		id: task.$id,
	}));

	const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
		if (action === 'PREV') {
			setValue(subMonths(value, 1));
		} else if (action === 'NEXT') {
			setValue(addMonths(value, 1));
		} else if (action === 'TODAY') {
			setValue(new Date());
		}
	};
	return (
		<Calendar
			date={value}
			events={events}
			localizer={localizer}
			views={['month']}
			defaultView="month"
			toolbar
			showAllEvents
			className="h-full"
			max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
			formats={{
				weekdayFormat: (date, culture, localizer) =>
					localizer?.format(date, 'EEE', culture) ?? '',
			}}
			components={{
				eventWrapper: ({ event }) => {
					return (
						<EventCard
							id={event.id}
							title={event.title}
							assignee={event.assignee}
							project={event.project}
							status={event.status}
						/>
					);
				},
				toolbar: () => {
					return (
						<CustomToolbar
							date={value}
							onNavigate={handleNavigate}
						/>
					);
				},
			}}
		/>
	);
}
