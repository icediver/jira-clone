import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc.utils';

interface IUseGetProjects {
	workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: IUseGetProjects) => {
	const query = useQuery({
		queryKey: ['projects', workspaceId],
		queryFn: async () => {
			const response = await client.api.projects.$get({
				query: {
					workspaceId,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}

			const { data } = await response.json();

			return data;
		},
	});
	return query;
};
