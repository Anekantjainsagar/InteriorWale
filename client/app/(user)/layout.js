import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { AdminProvider } from "../Context/AdminContext";
import { AuthProvider } from "../Context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <Header />
        {children}
        <Footer />
      </AdminProvider>
    </AuthProvider>
  );
}
