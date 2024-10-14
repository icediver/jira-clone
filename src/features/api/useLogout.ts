import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { client } from '@/lib/rpc.utils';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export function useLogout() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const mutation = useMutation<ResponseType, Error>({
		mutationFn: async () => {
			const response = await client.api.auth.logout['$post']();

			if (!response.ok) throw new Error('Failed to logout');

			return response.json();
		},
		onSuccess: () => {
			toast.success('Logged out');
			router.refresh();
			queryClient.invalidateQueries({
				queryKey: ['current'],
			});
		},
		onError: () => {
			toast.error('Failed to logout');
		},
	});
	return mutation;
}
