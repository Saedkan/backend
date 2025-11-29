import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        trim: true,
        minlength: [1, 'Comment cannot be empty'],
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Comment must have an author']
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, 'Comment must belong to a task']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Индексы для оптимизации запросов
commentSchema.index({ task: 1 });
commentSchema.index({ author: 1 });
commentSchema.index({ isDeleted: 1 });
export const Comment = model('Comment', commentSchema);
