const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//! ALL VALIDATION IS PENDING
const UserSchema = mongoose.Schema(
  {
    //   title: {string, mandatory, enum[Mr, Mrs, Miss]},
    title: {
      type: String,
      require: [true, 'Please provide title for your name!'],
      enum: {
        values: ['Mr', 'Mrs', 'Miss'],
        message: 'Title should be in Mr, Mrs, Miss',
      },
    },
    //   name: {string, mandatory},
    fname: {
      type: String,
      required: [true, 'Please provide your first name!'],
    },
    lname: {
      type: String,
      required: [true, 'Please provide your last name!'],
    },
    //   phone: {string, mandatory, unique},
    phone: {
      type: String,
      required: [true, 'Please provide phone number!'],
      unique: true,
    },
    //   email: {string, mandatory, valid email, unique},
    email: {
      type: String,
      required: [true, 'Please provide a email'],
      unique: true,
    },
    //   password: {string, mandatory, minLen 8, maxLen 15},
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide a confirmPassword'],
    },
    roll: {
      type: String,
      default: 'User',
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
