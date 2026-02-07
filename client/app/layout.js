import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "InteriorWale",
  description: "Interior design and decoration services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
