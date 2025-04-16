import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: 150,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    image: {
      type: String, // Will hold Cloudinary URL or base64
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved","rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
