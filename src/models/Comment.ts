import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: Types.ObjectId;
  task: Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
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
  },
  {
    timestamps: true
  }
);

// Индексы для оптимизации запросов
commentSchema.index({ task: 1 });
commentSchema.index({ author: 1 });
commentSchema.index({ isDeleted: 1 });

export const Comment = model<IComment>('Comment', commentSchema);