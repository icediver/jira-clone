import { AlertTriangle } from 'lucide-react';

interface IPageError {
	message?: string;
}

export function PageError({ message = 'Something went wrong' }: IPageError) {
	return (
		<div className="flex h-full flex-col items-center justify-center">
			<AlertTriangle className="size-6 mb-2 text-muted-foreground" />
			<p className="text-sm font-medium text-muted-foreground">{message}</p>
		</div>
	);
}
