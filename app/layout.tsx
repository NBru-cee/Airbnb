import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import LoginModal from "@/app/components/modals/LoginModal";
import ClientOnly from "@/app/components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "@/app/components/modals/SearchModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Airbnb",
    description: "Airbnb clone",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={nunito.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <RegisterModal />
                    <LoginModal />
                    <RentModal />
                    <SearchModal/>
                    <Navbar currentUser={currentUser} />
                </ClientOnly>

                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
