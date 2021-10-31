const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 32,
      required: true,
    },
    display_username: {
      type: String,
      minlength: 3,
      maxlength: 32,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
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

module.exports = model('User', UserSchema);
