import Box from "@/components/ui/Container";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="music-loader">
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
            </div>
        </Box>
    )
}

export default Loading;