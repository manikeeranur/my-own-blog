import { createContext, useContext, useState, useEffect } from "react";
import { getHtmlBlog } from "../services/HtmlBlogServices";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getHtmlBlog();
        setBlogData(data);
      } catch (error) {
        setError("Error fetching blog: " + error.message);
        console.error("Error fetching blog:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  return (
    <BlogContext.Provider value={{ blogData, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  return useContext(BlogContext);
};
