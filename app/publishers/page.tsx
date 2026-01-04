import { getAllPublishersAsync } from '@/lib/data';
import PublishersClient from '@/components/PublishersClient';

export default async function PublishersPage() {
  const publishers = await getAllPublishersAsync();

  return <PublishersClient initialPublishers={publishers} />;
}
