const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
      match: [/^[a-zA-Z]+$/g, 'First name have only alpha beats!'],
    },
    lname: {
      type: String,
      required: [true, 'Please provide your last name!'],
      match: [/^[a-zA-Z]+$/g, 'Last name have only alpha beats!'],
    },
    //   phone: {string, mandatory, unique},
    phone: {
      type: String,
      required: [true, 'Please provide phone number!'],
      match: [/^[6-9]\d{9}$/i, 'Please enter a valid phone number!'],
      unique: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    //   email: {string, mandatory, valid email, unique},
    email: {
      type: String,
      required: [true, 'Please provide a email'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email id!'],
      unique: true,
    },
    //   password: {string, mandatory, minLen 8, maxLen 15},
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
      match: [
        /^.{7,15}$/,
        'password should be min length is 8 and max length is 15',
      ],
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide a confirmPassword'],
      validate: (el) => {
        return el !== this.password;
      },
      message: 'Confirm password dose not match!',
    },
    roll: {
      type: String,
      default: 'User',
      validate: (el) => {
        el === 'admin' ? false : true;
      },
      message: 'You can not register as admin!',
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

UserSchema.methods.comparePass = async function (userPass, dbPass) {
  return await bcrypt.compare(userPass, dbPass);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
