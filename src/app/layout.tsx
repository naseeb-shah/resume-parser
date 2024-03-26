import { Providers } from "./providers";
import "./globals.css";
import Navbar from "./navbar";
export const metadata = {
  title: "RESUME PARSER",
  description: "Made with Heart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
        <footer style={{ textAlign: "center" }}>
          Made with ❤️ &copy; {new Date().getFullYear()} Deen Shah Scion All
          Rights Reserved.
        </footer>
      </body>
    </html>
  );
}
