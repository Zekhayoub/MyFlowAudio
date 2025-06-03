"use client";

import colors from "@/colors";
import Box from "@/components/ui/Container";
import { BounceLoader } from "react-spinners";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <BounceLoader color={colors.gradient1} size={40} />
        </Box>
    )
}

export default Loading;