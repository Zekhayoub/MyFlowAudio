import getAudio from "@/actions/getAudio";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getAudio();
  
  return (
    <div
      className="
      bg-background
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
      px-6
    "
    >
      <div className="mt-2 mb-7">
        <div className="flex justify-between items-center">
          <h1 className="text-primary text-2xl font-semibold">For your ears</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}