import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Navbar from "./components/Navbar";
import HtmlBlog from "./components/html-blog/HtmlBlog";
import HtmlBlogUpload from "./components/html-blog/HtmlBlogUpload";
function App() {
  return (
    <>
      <BlogProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HtmlBlog />} />
            <Route path="/htmlBlogUpload" element={<HtmlBlogUpload />} />
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </>
  );
}

export default App;
