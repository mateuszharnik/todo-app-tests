const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 1,
      maxlength: 512,
      required: true,
    },
    purify_title: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 10000,
    },
    purify_description: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

TaskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

module.exports = model('Task', TaskSchema);
