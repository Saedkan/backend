import { Schema, model } from 'mongoose';
const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    status: {
        type: String,
        enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'],
        default: 'BACKLOG'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'MEDIUM'
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return !value || value > new Date();
            },
            message: 'Due date must be in the future'
        }
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Task must belong to a project']
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Индексы для оптимизации запросов
taskSchema.index({ project: 1 });
taskSchema.index({ assignee: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ isDeleted: 1 });
// Виртуальное поле для проверки просроченности
taskSchema.virtual('isOverdue').get(function () {
    if (!this.dueDate)
        return false;
    return this.dueDate < new Date() && this.status !== 'DONE';
});
export const Task = model('Task', taskSchema);
