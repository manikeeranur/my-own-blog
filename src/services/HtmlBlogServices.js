import axios from "axios";

export const getHtmlBlog = async () => {
  try {
    const response = await axios.get("http://localhost:3001/htmlBlog");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    return null;
  }
};
