import { PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '../shadcn/button';
import { Calendar } from '../shadcn/calendar';
import { Popover, PopoverContent } from '../shadcn/popover';

import { cn } from '@/lib/utils';

interface IDatePicker {
	value: Date | undefined;
	onChange: (date: Date) => void;
	className?: string;
	placeholder?: string;
}

export function DatePicker({
	value,
	onChange,
	className,
	placeholder = 'Select date',
}: IDatePicker) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					className={cn(
						'w-full justify-start px-3 text-left font-normal',
						!value && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? format(value, 'PPP') : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Calendar
					mode="single"
					selected={value}
					onSelect={(date) => onChange(date as Date)}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
