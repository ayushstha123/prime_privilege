const mongoose =require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",

        },
        category: {
            type: String,
            default: "uncategorized",
        },
        address: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ['pending', 'posted'],
            default: 'pending',
        },
        socialMedia: {
            type: [String],
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        likes: [{ type: ObjectId, ref: "User" }],
        views: [{ type: ObjectId, ref: "User" }],
    }, { timestamps: true }
)
const Post = mongoose.model('Post', postSchema);
module.exports= Post;