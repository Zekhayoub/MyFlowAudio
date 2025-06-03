"use client";

import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="relative flex items-center">
      <BiSearch
        size={20}
        className="absolute left-4 text-secondary"
      />
      <FormInput
        placeholder="What do you want to listen to?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-12"
      />
    </div>
  );
};

export default SearchBar;
