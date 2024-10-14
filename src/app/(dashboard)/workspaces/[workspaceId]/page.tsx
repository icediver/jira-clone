export default function WorkspaceIdPage({
	params,
}: {
	params: { workspaceId: string };
}) {
	return <div>Page WorkspaceId {params.workspaceId}</div>;
}
