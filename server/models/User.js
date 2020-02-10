const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: 'userName already exists',
            trim: true,
            required: 'userName is required'
        },
        hashPassword: {
            type: String,
            required: 'Password is required'
        },
        representPaswword: String,
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            match: [
                /.+@.+..+/u,
                'Please fill a valid email address'
            ],
            required: 'Email is required'
        },
        phone: {
            type: String,
            unique: 'Phone already exists',
            trim: true,
            required: 'Phone is required'
        },
        fullname: {
            type: String,
            trim: true
        },
        permission: {
            type: String,
            trim: true,
            required: [
                true,
                "can't be blank"
            ]
        },

        _joinShops: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Shop'
            }
        ],
        isActive: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date
        },
        updateAt: {
            type: Date
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

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.representPaswword = this.makeRepresentPaswword();
        this.hashPassword = this.encryptPassword(password);
    })
    .get(() => {
        return this._password;
    });

UserSchema.path('hashPassword').validate(function () {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

UserSchema.methods = {
    authenticate (pass) {
        return this.encryptPassword(pass) === this.hashPassword;
    },

    encryptPassword (password) {
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.representPaswword)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeRepresentPaswword () {
        return String(Math.round(new Date().valueOf() * Math.random()));
    }
};

module.exports = mongoose.model('User', UserSchema);
