import React, { useState } from "react";
import { useBlog } from "../../context/BlogContext";
import { Element } from "react-scroll";
import CustomModalResponsive from "../CustomModalResponsive";
import HtmlBlogForm from "./HtmlBlogForm";
import { deleteHtmlBlog } from "../../services/HtmlBlogServices";

const HtmlBlog = () => {
  const [open, setOpen] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const { blogData, loading, error, fetchBlog } = useBlog();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleClose = () => {
    setOpen(false);
    setSelectedObject(null);
  };

  const handleDeleteClose = () => {
    setDeleteBlog(false);
    setSelectedObject(null);
  };

  return (
    <div id="html-blog" className="container">
      {/* Add Blog Button */}
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Add HTML Blog
      </button>

      {/* Blog List */}
      <div>
        {blogData?.map((item, index) => (
          <Element name={item.menuName.replace(/\s+/g, "-")} key={index}>
            <div>
              <h1 className="mb-3">
                {item.heading}
                {/* Edit Button */}
                <button
                  className="btn btn-primary btn-sm ms-3"
                  onClick={() => {
                    setOpen(true);
                    setSelectedObject(item);
                  }}
                >
                  <em className="bi bi-pencil"></em>
                </button>
                {/* Delete Button */}
                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => {
                    setDeleteBlog(true);
                    setSelectedObject(item);
                  }}
                >
                  <em className="bi bi-trash"></em>
                </button>
              </h1>
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

      <CustomModalResponsive
        open={open}
        setOpen={setOpen}
        handleClose={handleClose} // ✅ Fixed function reference
        headerComponent={
          <div className="modal-header">
            <div>{selectedObject ? "Edit" : "Add"} HTML Blog</div>
            <em className="bi bi-x-lg" onClick={handleClose}></em>
          </div>
        }
      >
        <div className="modal-body p-3">
          <HtmlBlogForm
            selectedObject={selectedObject}
            handleClose={handleClose}
          />
        </div>
      </CustomModalResponsive>

      <CustomModalResponsive
        open={deleteBlog}
        setOpen={setDeleteBlog}
        handleClose={handleDeleteClose} // ✅ Fixed function reference
        headerComponent={
          <div className="modal-header">
            <div>Delete Blog</div>
            <em className="bi bi-x-lg" onClick={handleDeleteClose}></em>
          </div>
        }
        footerComponent={
          <div className="modal-footer">
            <button
              className="btn btn-danger me-3"
              onClick={async () => {
                if (selectedObject) {
                  await deleteHtmlBlog(selectedObject._id);
                  handleDeleteClose();
                  fetchBlog();
                }
              }}
            >
              Yes, Delete
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleDeleteClose}
            >
              No, Cancel
            </button>
          </div>
        }
      >
        <div className="modal-body p-3">
          Are you sure you want to delete this blog?
        </div>
      </CustomModalResponsive>
    </div>
  );
};

export default HtmlBlog;
