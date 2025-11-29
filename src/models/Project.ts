import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  status: 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
  lead: Types.ObjectId;
  members: Types.ObjectId[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ON_HOLD', 'COMPLETED'],
      default: 'ACTIVE'
    },
    lead: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project lead is required']
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
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
projectSchema.index({ lead: 1 });
projectSchema.index({ members: 1 });
projectSchema.index({ isDeleted: 1 });

export const Project = model<IProject>('Project', projectSchema);