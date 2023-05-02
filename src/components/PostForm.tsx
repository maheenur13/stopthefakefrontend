import { Formik } from "formik";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import FormItem from "./FormItem";
import * as Yup from "yup";
import { ImageWrapper } from "containers/PageUploadItem";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import axios from "../axios";

const PostForm = ({ formHandler, data, type = "add" }: any) => {
  const { token } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>(data?.images || []);

  return (
    <div>
      <Formik
        initialValues={{
          title: data?.title || "",
          description: data?.description || "",
        }}
        enableReinitialize
        validationSchema={Yup.object({
          title: Yup.string().required("This field is required."),
          description: Yup.string().required("This field is required."),
        })}
        onSubmit={(values: any) => {
          if (uploadedFiles.length > 0) {
            let modValues;
            if (type === "add") {
              const slug =
                values.title.replace(/ /g, "-") + "-" + new Date().getTime();
              modValues = {
                files: uploadedFiles,
                slug: slug.toLocaleLowerCase(),
                ...values,
              };
            } else {
              modValues = {
                files: uploadedFiles,
                ...values,
              };
            }
            formHandler(modValues);
          } else {
            toast.error("Upload atleast one image.");
          }
        }}
      >
        {({ errors, getFieldProps, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormItem label="Title" className="mb-5">
              <Input
                type="text"
                placeholder="Title"
                {...getFieldProps("title")}
              />
              {errors.title && (
                <small className="text-red-700">
                  <>&times; {errors.title}</>
                </small>
              )}
            </FormItem>
            <FormItem label="Description" className="mb-5">
              <Textarea
                rows={6}
                className="mt-1.5"
                placeholder="..."
                {...getFieldProps("description")}
              />
              {errors.description && (
                <small className="text-red-700">
                  <>&times; {errors.description}</>
                </small>
              )}
            </FormItem>

            <div className="mb-5">
              <h3 className="text-lg sm:text-2xl font-semibold">
                Upload your Images
              </h3>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                {/* File types supported: JPG, PNG, GIF, SVG . Max size: 100 MB */}
                File types supported: JPG, PNG, GIF, JPEG
              </span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={async (e) => {
                            if (e.target.files) {
                              const formData = new FormData();
                              for (
                                let index = 0;
                                index < e.target.files.length;
                                index++
                              ) {
                                const file = e.target.files[index];
                                formData.append("product_images", file);
                              }
                              await axios
                                .post("/products/upload", formData, {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                    token: `Bearer ${token}`,
                                  },
                                })
                                .then((resp: any) => {
                                  setUploadedFiles((prev) => [
                                    ...prev,
                                    ...resp.data,
                                  ]);
                                  (document.getElementById(
                                    "file-upload"
                                  ) as HTMLInputElement)!.value = "";
                                })
                                .catch((err: any) => {
                                  if (err.status === 500) {
                                    toast.error(
                                      "You are only allowed to upload image files."
                                    );
                                  } else {
                                    toast.error(err.message);
                                  }
                                });
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, JPEG or GIF format supported
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap items-center justify-center">
              {uploadedFiles.map((file, index) => {
                return (
                  <ImageWrapper
                    key={index}
                    file={file}
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                  />
                );
              })}
            </div>

            <ButtonPrimary type="submit" loading={false}>
              Submit
            </ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
