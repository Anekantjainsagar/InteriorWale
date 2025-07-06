import "./globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Next.js with Tailwind CSS",
  description: "A boilerplate project with Next.js 15 and Tailwind CSS 3.4.17",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children} <Footer />
        <script
          type="module"
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fanekants3701back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.5"
        ></script>
      </body>
    </html>
  );
}
