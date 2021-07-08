const { Schema, model } = require('mongoose');

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 1,
      maxlength: 512,
      required: true,
    },
    description: {
      type: String,
      maxlength: 10000,
    },
    user_id: {
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

BoardSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

module.exports = model('Board', BoardSchema);
