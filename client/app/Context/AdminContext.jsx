"use client";
import axios from "axios";
import BASE_URI from "../../utils/urls";
import toast from "react-hot-toast";
import { getCookie } from "../../utils/cookies";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();

// Configuration for all endpoints
const API_ENDPOINTS = {
  queries: "/api/v1/contact",
  blogs: "/api/v1/admin/blogs/all",
  blogsPublic: "/api/v1/data/blogs/all",
  product: "/api/v1/admin/products/all",
  productPublic: "/api/v1/data/products",
};

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [queries, setQueries] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update your fetchData function
  const fetchData = async (endpoint, setData, requiresAuth = true) => {
    const token = getCookie("token");
    if (requiresAuth && !token) return;

    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const res = await axios.get(`${BASE_URI}${endpoint}`, config);

      if (res.data?.data) {
        setData(res.data.data);
      } else if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        console.error("Unexpected response format:", res.data);
        setData([]);
      }
    } catch (e) {
      console.error(`Error fetching ${endpoint}:`, e);
      const errorMessage =
        e.response?.data?.message ||
        e.message ||
        `Failed to load ${endpoint.split("/").pop()}`;
      toast.error(errorMessage);
      setData([]);
    }
  };

  // Initialize all data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const token = getCookie("token");
        const results = await Promise.allSettled([
          fetchData(
            token ? API_ENDPOINTS.blogs : API_ENDPOINTS.blogsPublic,
            setBlogs,
            false
          ),
          fetchData(API_ENDPOINTS.queries, setQueries),
          fetchData(
            token ? API_ENDPOINTS.product : API_ENDPOINTS.productPublic,
            setProducts,
            false
          ),
        ]);
        results.forEach((result) => {
          if (result.status === "rejected") {
            console.error("Fetch failed:", result.reason);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user]);

  const refreshQueries = () => fetchData(API_ENDPOINTS.queries, setQueries);
  const refreshBlogs = () => {
    const token = getCookie("token");
    return fetchData(
      token ? API_ENDPOINTS.blogs : API_ENDPOINTS.blogsPublic,
      setBlogs,
      false
    );
  };
  const refreshProducts = () => {
    const token = getCookie("token");
    return fetchData(
      token ? API_ENDPOINTS.product : API_ENDPOINTS.productPublic,
      setProducts,
      false
    );
  };

  return (
    <AdminContext.Provider
      value={{
        loading,
        queries,
        setQueries,
        refreshQueries,
        blogs,
        setBlogs,
        refreshBlogs,
        products,
        setProducts,
        refreshProducts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
