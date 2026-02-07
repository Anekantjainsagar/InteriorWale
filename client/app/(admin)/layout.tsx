import "../globals.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../Context/AuthContext";
import { AdminProvider } from "../Context/AdminContext";
import { ConfirmProvider } from "./Components/Utils/ConfirmProvier";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex items-start overflow-y-hidden bg-gray-50">
      <AuthProvider>
        <AdminProvider>
          <ConfirmProvider>
            <Toaster />
            <Sidebar />
            <div className="w-[85vw] h-[100vh] overflow-y-auto">
              <Navbar />
              <div className="p-4">{children}</div>
            </div>
          </ConfirmProvider>
        </AdminProvider>
      </AuthProvider>
    </div>
  );
}
