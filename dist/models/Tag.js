import { Schema, model } from 'mongoose';
const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required'],
        trim: true,
        minlength: [2, 'Tag name must be at least 2 characters'],
        maxlength: [20, 'Tag name cannot exceed 20 characters']
    },
    color: {
        type: String,
        required: [true, 'Tag color is required'],
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Color must be a valid HEX code']
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Tag must belong to a project']
    }
}, {
    timestamps: true
});
// Уникальное сочетание имени и проекта
tagSchema.index({ name: 1, project: 1 }, { unique: true });
export const Tag = model('Tag', tagSchema);
