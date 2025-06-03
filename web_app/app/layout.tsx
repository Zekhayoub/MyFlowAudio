import { Figtree } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/features/SideBar";
import Header from "@/components/features/Header";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getAudioByUser from "@/actions/getAudioByUser";
import AudioPlayer from "@/components/features/AudioPlayer";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "MY AUDIO",
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getAudioByUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <div className="relative h-full">
              <Header />
              <div className="h-full pt-16 md:pt-20">
                <SideBar songs={userSongs}>
                  {children}
                </SideBar>
              </div>
              <AudioPlayer />
            </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}