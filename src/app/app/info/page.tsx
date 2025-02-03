import { auth } from '@/auth';

export default async function app() {
  const session = await auth();
  return (
    <div>
      <h2 className="mb-2 mt-5 text-center text-lg text-red-500">[開発用ページ]</h2>
      <div className="mx-auto w-fit">
        <h3>セッション情報</h3>
        <pre className="w-fit rounded-b-md bg-gray-100 px-10 py-5 text-left">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
