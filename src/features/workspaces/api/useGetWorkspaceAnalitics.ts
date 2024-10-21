import { useQuery } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

import { client } from '@/lib/rpc.utils';

interface IUseGetWorkspaceAnalitics {
	workspaceId: string;
}

export type WorkspaceAnaliticsResponseType = InferResponseType<
	(typeof client.api.workspaces)[':workspaceId']['analytics']['$get'],
	200
>;

export const useGetWorkspaceAnalitics = ({
	workspaceId,
}: IUseGetWorkspaceAnalitics) => {
	const query = useQuery({
		queryKey: ['workspace-analytics', workspaceId],
		queryFn: async () => {
			const response = await client.api.workspaces[':workspaceId'][
				'analytics'
			].$get({
				param: {
					workspaceId,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch workspace analytics');
			}

			const { data } = await response.json();

			return data;
		},
	});
	return query;
};
