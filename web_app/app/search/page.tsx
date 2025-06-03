import getSongsWithDeezer from "@/actions/getAudioByAPI";
import Header from "@/components/features/Header";
import SearchBar from "@/components/ui/SearchBar";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: {
        title: string;
    }
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsWithDeezer(searchParams.title);

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
            <div className="mb-2 pt-6 flex flex-col gap-y-6">
                <h1 className="text-primary text-3xl font-semibold">
                    Search
                </h1>
                <SearchBar />
            </div>
            <SearchContent songs={songs} />
        </div>
    )
};

export default Search;