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
  gallery: "/api/v1/admin/gallery/all",
  contact: "/api/v1/admin/contact/all",
  subscribers: "/api/v1/subscribe",
  queries: "/api/v1/contact",
  blogs: "/api/v1/admin/blogs/all",
  maps: "/api/v1/admin/map-charger/all",
  support: "/api/v1/admin/support-logo/all",
  productCategories: "/api/v1/admin/products/categories/all",
  product: "/api/v1/admin/products/all",
};

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [maps, setMaps] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [queries, setQueries] = useState([]);
  const [contact, setContact] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [supportLogos, setSupportLogos] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update your fetchData function
  const fetchData = async (endpoint, setData) => {
    const token = getCookie("token");
    if (token) {
      try {
        const res = await axios.get(`${BASE_URI}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Handle successful response
        if (res.data?.data) {
          setData(res.data.data); // Standard {success, data} format
        } else if (Array.isArray(res.data)) {
          setData(res.data); // Direct array response
        } else {
          console.error("Unexpected response format:", res.data);
          setData([]); // Fallback to empty array
        }
      } catch (e) {
        console.error(`Error fetching ${endpoint}:`, e);

        // Properly handle the error without leaking error objects
        const errorMessage =
          e.response?.data?.message ||
          e.message ||
          `Failed to load ${endpoint.split("/").pop()}`;
        toast.error(errorMessage);
        setData([]); // Ensure we always set an array
      }
    }
  };

  // Initialize all data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const results = await Promise.allSettled([
          // fetchData(API_ENDPOINTS.maps, setMaps),
          fetchData(API_ENDPOINTS.blogs, setBlogs),
          // fetchData(API_ENDPOINTS.gallery, setGallery),
          // fetchData(API_ENDPOINTS.queries, setQueries),
          // fetchData(API_ENDPOINTS.contact, setContact),
          // fetchData(API_ENDPOINTS.support, setSupportLogos),
          // fetchData(API_ENDPOINTS.subscribers, setSubscribers),
          // fetchData(API_ENDPOINTS.product, setProducts),
          // fetchData(API_ENDPOINTS.productCategories, setProductsCategory),
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

  // Refresh functions that return promises
  const refreshGallery = () => fetchData(API_ENDPOINTS.gallery, setGallery);
  const refreshContact = () => fetchData(API_ENDPOINTS.contact, setContact);
  const refreshQueries = () => fetchData(API_ENDPOINTS.queries, setQueries);
  const refreshSubscribers = () =>
    fetchData(API_ENDPOINTS.subscribers, setSubscribers);
  const refreshBlogs = () => fetchData(API_ENDPOINTS.blogs, setBlogs);
  const refreshMaps = () => fetchData(API_ENDPOINTS.maps, setMaps);
  const refreshProducts = () => fetchData(API_ENDPOINTS.product, setProducts);
  const refreshProductsCategory = () =>
    fetchData(API_ENDPOINTS.productCategories, setProductsCategory);
  const refreshSupportLogos = () =>
    fetchData(API_ENDPOINTS.support, setSupportLogos);

  return (
    <AdminContext.Provider
      value={{
        loading,
        gallery,
        setGallery,
        refreshGallery,
        contact,
        setContact,
        refreshContact,
        queries,
        setQueries,
        refreshQueries,
        subscribers,
        setSubscribers,
        refreshSubscribers,
        blogs,
        setBlogs,
        refreshBlogs,
        maps,
        setMaps,
        refreshMaps,
        supportLogos,
        setSupportLogos,
        refreshSupportLogos,
        products,
        setProducts,
        refreshProducts,
        productsCategory,
        setProductsCategory,
        refreshProductsCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
