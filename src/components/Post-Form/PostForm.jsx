/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, getValues, setValue, control, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        status: post?.status || "active",
        content: post?.content || "",
        slug: post?.$id || "",
      },
    });
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(data.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Enter title"
          type="text"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug: "
          className="mb-4"
          onChange={(e) => {
            setValue("slug", slugTransform(e.currentValue.value), {
              shouldValidate: true,
            });
          }}
          {...register("slug", {
            required: true,
          })}
        />
        <RTE
          name="content"
          label="Content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          type="file"
          className="mb-4"
          label="Featured Image: "
          {...register("image", { required: !post })}
          accept="image/png, image/jpg, image/jpeg, image/gif"
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          label="Status: "
          className="w-full mb-4"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />
        <Button
          className="w-full"
          type="submit"
          bgColor={post ? "bg-green-600" : undefined}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}


