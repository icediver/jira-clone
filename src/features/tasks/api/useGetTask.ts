import { useQuery } from '@tanstack/react-query';

import { TaskStatus } from '../task.types';

import { client } from '@/lib/rpc.utils';

interface IUseGetTask {
	taskId: string;
}

export const useGetTask = ({ taskId }: IUseGetTask) => {
	const query = useQuery({
		queryKey: ['task', taskId],
		queryFn: async () => {
			const response = await client.api.tasks[':taskId'].$get({
				param: { taskId },
			});

			if (!response.ok) {
				throw new Error('Failed to fetch task');
			}

			const { data } = await response.json();

			return data;
		},
	});
	return query;
};
