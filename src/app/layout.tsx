import NavBar from "@/app/components/NavBar";
import "./globals.css";
import Footer from "@/app/components/Footer";
import localFonts from "next/font/local";

const spaceGrotest = localFonts({
    src: "../../public/fonts/SpaceGrotesk-VariableFont_wght.ttf",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={spaceGrotest.className}>
                <NavBar />

                {children}

                <Footer />
            </body>
        </html>
    );
}
