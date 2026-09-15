type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskDetail({ params }: Props) {
  const { id } = await params;

  return <h1>Task ID: {id}</h1>;
}
