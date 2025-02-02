import React from "react";
import { useBlog } from "../../context/BlogContext";
import { Element } from "react-scroll";

const HtmlBlog = () => {
  const { blogData, loading, error } = useBlog();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id="html-blog" className="container">
      <div className="col-md-6">
        {blogData?.map((item, index) => (
          <Element name={item.menuName.replace(/\s+/g, "-")} key={index}>
            <div>
              <h1 className="mb-3">{item.heading}</h1>
              <div
                className="mb-3 content"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
              <div
                className="mb-5 example"
                dangerouslySetInnerHTML={{ __html: item.example }}
              ></div>
            </div>
          </Element>
        ))}
      </div>
    </div>
  );
};

export default HtmlBlog;
