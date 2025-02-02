import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postHtmlBlog, putHtmlBlog } from "../../services/HtmlBlogServices";
import { useBlog } from "../../context/BlogContext";

const quillFormats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code-block",
  "color",
  "background",
  "list",
  "bullet",
  "ordered",
  "header",
  "align",
  "link",
  "blockquote",
];

const quillModules = {
  toolbar: [
    [{ header: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    ["code-block"],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
  ],
  clipboard: { matchVisual: false },
};

const validationSchema = Yup.object().shape({
  menuName: Yup.string().required("Side Menu Name is required"),
  heading: Yup.string().required("Heading is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  example: Yup.string().required("Example is required"),
});

const HtmlBlogForm = ({ selectedObject, handleClose }) => {
  const { fetchBlog } = useBlog();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { menuName: "", heading: "", content: "", example: "" },
  });

  const onSubmit = async (data) => {
    try {
      if (selectedObject) {
        await putHtmlBlog(selectedObject._id, data);
      } else {
        await postHtmlBlog(data);
      }

      setValue("menuName", "");
      setValue("heading", "");
      setValue("content", "");
      setValue("example", "");
    } catch (error) {
      console.error("Error submitting data", error);
    } finally {
      handleClose();
      fetchBlog();
    }
  };

  useEffect(() => {
    if (selectedObject) {
      setValue("menuName", selectedObject.menuName);
      setValue("heading", selectedObject.heading);
      setValue("content", selectedObject.content);
      setValue("example", selectedObject.example);
    }
  }, [selectedObject]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Side Menu Name Field */}
        <div className="mb-3">
          <label>Side Menu Name:</label>
          <Controller
            name="menuName"
            control={control}
            render={({ field }) => (
              <input type="text" className="form-control" {...field} />
            )}
          />
          {errors.menuName && (
            <p className="text-danger">{errors.menuName.message}</p>
          )}
        </div>

        {/* Heading Field */}
        <div className="mb-3">
          <label>Heading:</label>
          <Controller
            name="heading"
            control={control}
            render={({ field }) => (
              <input type="text" className="form-control" {...field} />
            )}
          />
          {errors.heading && (
            <p className="text-danger">{errors.heading.message}</p>
          )}
        </div>

        {/* Content Field */}
        <div className="mb-3">
          <label>Content:</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                formats={quillFormats}
                modules={quillModules}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.content && (
            <p className="text-danger">{errors.content.message}</p>
          )}
        </div>

        {/* Example Field */}
        <div className="mb-3">
          <label>Example:</label>
          <Controller
            name="example"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                formats={quillFormats}
                modules={quillModules}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.example && (
            <p className="text-danger">{errors.example.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-sm btn-primary">
          {selectedObject ? "Update" : "Add"}
        </button>
      </form>
    </>
  );
};

export default HtmlBlogForm;
