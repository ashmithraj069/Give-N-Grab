import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import itemService from "../../appwrite/ItemService";
import {Button} from '../index'
function ShareItem({ card }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    if (card) {
      // update and delete Logic
      try {
        let file = null;

        if (data.featuredImage?.[0]) {
          file = await itemService.uploadImage(data.featuredImage[0]);
          if (file && card.featuredImage) {
            await itemService.deleteImage(card.featuredImage);
          }
        }

        const dbPost = await itemService.updatePost(card.$id, {
          title: data.title,
          description: data.description,
          category: data.category,
          quantity: data.quantity,
          featuredImage: file ? file.$id : card.featuredImage,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } catch (err) {
        console.error("Error updating post:", err.message);
      }
    } else {
    // create Logic
      try {
        let file = null;
        if (data.featuredImage?.[0]) {
          file = await itemService.uploadImage(data.featuredImage[0]);
        }

        const dbPost = await itemService.createPost({
          ...data,
          featuredImage: file ? file.$id : null,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } catch (err) {
        console.error("Error creating post:", err.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white shadow-md rounded-2xl pt-6 p-6 space-y-4 max-w-md mx-auto border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {card ? "Update Item" : "Share Item"}
      </h2>

      {/* Title */}
      <div>
        <label className="block text-gray-700 mb-1">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          defaultValue={card?.title}
          placeholder="Item Title"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          {...register("description")}
          defaultValue={card?.description}
          placeholder="Description"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700 mb-1">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          defaultValue={card?.category || ""}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>          
          <option value="Stationery">Stationery</option>
          <option value="Drinks">Drinks</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Others">Others</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Grab Limit */}
      <div>
        <label className="block text-gray-700 mb-1">Grab Limit</label>
        <input
          type="number"
          {...register("quantity", { valueAsNumber: true, min: 1 })}
          defaultValue={card?.quantity || 1}
          placeholder="Grab Limit"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Featured Image */}
      <div>
        <label className="block text-gray-700 mb-1">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("featuredImage")}
          className="w-full text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
      >
        {card ? "Update Item" : "Share Item"}
      </Button>
    </form>
  );
}

export default ShareItem;
