const Joi = require("@hapi/joi");
const config = require("../config/config");

class ValidationUtils {
    static signupValidation(data) {
        const schema = Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            fatherName: Joi.string(),
            phone: Joi.string(),
            email: Joi.string().min(6).required().email().messages({
                "string.empty": `You must fill in "E-mail"`,
                "string.email": `"E-mail" is incorrect`,
                "string.min": `"E-mail" is incorrect`,
                "any.required": `You must fill in "E-mail"`,
            }),
            password: Joi.required().messages({
                "any.required": `You must fill in the "Password"`,
            }),
            // password: Joi.string().min(6).required()
            //     .messages({
            //         'string.empty': `You must fill in the "Password""`,
            //         'string.min': `"Password" must have at least 6 characters`,
            //         'any.required': `You must fill in the "Password"`
            //     }),
            passwordRepeat: Joi.required().messages({
                "any.required": `You must fill out "Repeat Password"`,
            }),

            // passwordRepeat: Joi.any().equal(Joi.ref('password'))
            //     .required()
            //     .messages({
            //         'string.empty': `You must fill out "Repeat Password"`,
            //         'string.min': `"Repeat password" must be at least 6 characters long`,
            //         'any.required': `You must fill out "Repeat Password"`,
            //         'any.only': 'Password mismatch'
            //     })
        });
        return schema.validate(data);
    }

    static loginValidation(data) {
        const schema = Joi.object({
            email: Joi.string().min(6).required().email().messages({
                "string.empty": `You must fill in "E-mail"`,
                "string.email": `"E-mail" is incorrect`,
                "string.min": `"E-mail" is incorrect`,
                "any.required": `You must fill in "E-mail"`,
            }),
            password: Joi.string().min(6).required().messages({
                "string.empty": `You must fill in the "Password"`,
                "string.min": `"Password" must have at least 6 characters`,
                "any.required": `You must fill in the "Password"`,
            }),
            rememberMe: Joi.boolean().default(false),
        });
        return schema.validate(data);
    }

    static refreshTokenValidation(data) {
        const schema = Joi.object({
            refreshToken: Joi.string().required().messages({
                "string.empty": `You must fill in the "Token"`,
                "any.required": `You must fill in the "Token"`,
            }),
        });
        return schema.validate(data);
    }

    static updateCartValidation(data) {
        const schema = Joi.object({
            quantity: Joi.number().required().integer().messages({
                "number.base": `"Quantity" must be a number`,
                "number.integer": `"Quantity" must be an integer`,
                "any.required": `"Quantity" must be filled in`,
            }),
            productId: Joi.string().required().messages({
                "string.empty": `You must fill in "Product ID"`,
                "any.required": `You must fill in "Product ID"`,
            }),
        });
        return schema.validate(data);
    }

    static addFavoriteValidation(data) {
        const schema = Joi.object({
            productId: Joi.string().required().messages({
                "string.empty": `You must fill in "Product ID"`,
                "any.required": `You must fill in "Product ID"`,
            }),
        });
        return schema.validate(data);
    }

    static removeFavoriteValidation(data) {
        const schema = Joi.object({
            productId: Joi.string().required().messages({
                "string.empty": `You must fill in "Product ID"`,
                "any.required": `You must fill in "Product ID"`,
            }),
        });
        return schema.validate(data);
    }

    static createOrderValidation(data) {
        const schema = Joi.object({
            deliveryType: Joi.string()
                .required()
                .valid(...Object.values(config.deliveryTypes))
                .messages({
                    "string.empty": `You must fill in "Delivery type"`,
                    "any.only":
                        `Тип доставки может быть только: ` +
                        Object.values(config.deliveryTypes).join(","),
                    "any.required": `You must fill in "Delivery type"`,
                }),
            firstName: Joi.string().required().messages({
                "string.empty": `"Name" must be filled in`,
                "any.required": `"Name" must be filled in`,
            }),
            lastName: Joi.string().required().messages({
                "string.empty": `You must fill in "Surname"`,
                "any.required": `You must fill in "Surname"`,
            }),
            phone: Joi.string().required().messages({
                "string.base": `Telephone" must be a string`,
                "string.empty": `You must fill in "Telephone"`,
                "any.required": `You must fill in "Telephone"`,
            }),
            paymentType: Joi.string()
                .required()
                .valid(...Object.values(config.paymentTypes))
                .messages({
                    "string.empty": `You must fill out "Payment Method"`,
                    "any.only":
                        `Способ оплаты может быть только: ` +
                        Object.values(config.paymentTypes).join(","),
                    "any.required": `You must fill out "Payment Method"`,
                }),
            email: Joi.string().min(6).required().email().messages({
                "string.empty": `You must fill in "E-mail"`,
                "string.email": `"E-mail" is incorrect`,
                "string.min": `"E-mail" is incorrect`,
                "any.required": `You must fill in "E-mail"`,
            }),
            street: Joi.when("deliveryType", {
                is: config.deliveryTypes.delivery,
                then: Joi.string().required(),
                otherwise: Joi.string(),
            }).messages({
                "string.base": `"Street" must be a string`,
                "string.empty": `You must fill in "Street"`,
                "any.required": `You must fill in "Street"`,
            }),
            house: Joi.when("deliveryType", {
                is: config.deliveryTypes.delivery,
                then: Joi.string().required(),
                otherwise: Joi.string(),
            }).messages({
                "string.base": `"Home" must be a string`,
                "string.empty": `"Home" must be filled in`,
                "any.required": `"Home" must be filled in`,
            }),
            entrance: Joi.string().messages({
                "string.base": `"City" must be a string`,
            }),
            apartment: Joi.string().messages({
                "string.base": `"Apartment" must be a string`,
            }),
            comment: Joi.string().messages({
                "string.base": `"Comment" must be a string`,
            }),
            fatherName: Joi.string().messages({
                "string.base": `"Surname" must be a string`,
            }),
        });
        return schema.validate(data);
    }

    static updateUserValidation(data) {
        const schema = Joi.object({
            deliveryType: Joi.string()
                .valid(...Object.values(config.deliveryTypes))
                .messages({
                    "string.base": `"Shipping Type" must be a string`,
                    "any.only":
                        `Delivery type can only be: ` +
                        Object.values(config.deliveryTypes).join(","),
                }),
            firstName: Joi.string().messages({
                "string.base": `"Name" must be a string`,
            }),
            lastName: Joi.string().messages({
                "string.base": `"Surname" must be a string`,
            }),
            phone: Joi.string().messages({
                "string.base": `Telephone" must be a string`,
            }),
            paymentType: Joi.string()
                .valid(...Object.values(config.paymentTypes))
                .messages({
                    "string.base": `"Payment method" must be a string`,
                    "any.only":
                        `The payment method can only be: ` +
                        Object.values(config.paymentTypes).join(","),
                }),
            email: Joi.string().min(6).email().messages({
                "string.base": `"E-mail" must be a string`,
                "string.email": `"E-mail" is incorrect`,
                "string.min": `"E-mail" is incorrect`,
            }),
            street: Joi.string().messages({
                "string.base": `"Street" must be a string`,
            }),
            house: Joi.string().messages({
                "string.base": `"House" must be a string`,
            }),
            entrance: Joi.string().messages({
                "string.base": `"City" must be a string`,
            }),
            apartment: Joi.string().messages({
                "string.base": `"Apartment" must be a string`,
            }),
            fatherName: Joi.string().messages({
                "string.base": `"Father name" must be a string`,
            }),
        });
        return schema.validate(data);
    }
}

module.exports = ValidationUtils;
