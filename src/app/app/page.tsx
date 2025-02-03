import { auth } from '@/auth';

export default async function app() {
  const session = await auth();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
