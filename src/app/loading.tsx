import { Loader } from 'lucide-react';

export default function LoadingPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<Loader
				size={26}
				className="animate-spin text-muted-foreground"
			/>
		</div>
	);
}
