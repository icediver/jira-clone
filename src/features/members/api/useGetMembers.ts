import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc.utils';

interface UseGetMembersProps {
	workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
	const query = useQuery({
		queryKey: ['members', workspaceId],
		queryFn: async () => {
			const response = await client.api.members.$get({
				query: { workspaceId },
			});

			if (!response.ok) {
				throw new Error('Failed to fetch members');
			}
			console.log(response);

			const { data } = await response.json();

			return data;
		},
	});
	return query;
};
