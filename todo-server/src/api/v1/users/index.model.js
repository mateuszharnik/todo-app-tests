const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 32,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      maxlength: 1000,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
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

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

module.exports = model('User', UserSchema);
