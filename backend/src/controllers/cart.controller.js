const CartService = require("../services/cart.service");
const CartNormalizer = require("../normalizers/cart.normalizer");
const ValidationUtils = require("../utils/validation.utils");
const mongoose = require("mongoose");
const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

class CartController {
    static async updateCart(req, res) {
        const {error} = ValidationUtils.updateCartValidation(req.body);
        if (error) {
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        const cartModel = await CartService.getCart(req.user, req.session.id);

        if (!cartModel) {
            return res.status(404)
                .json({error: true, message: "Cart not found"});
        }

        const quantity = Number.parseInt(req.body.quantity);
        const productId = req.body.productId;

        try {
            const product = await ProductModel.findOne({_id: productId});
            if (!product) {
                return res.status(404).json({error: true, message: 'Product not found'});
            }
        } catch (e) {
            return res.status(404).json({error: true, message: 'Product not found'});
        }

        if (!cartModel.items) {
            cartModel.items = [];
        }
        console.log(cartModel.items);
        const indexFound = cartModel.items.findIndex(item => item.product && item.product._id && (item.product._id.toString() === productId));
        if (indexFound > -1) {
            if (quantity <= 0) {
                cartModel.items.splice(indexFound, 1);
            } else {
                cartModel.items[indexFound].quantity = quantity;
            }
        } else if (indexFound === -1 && quantity > 0) {
            cartModel.items.push({
                product: new mongoose.Types.ObjectId(productId),
                quantity: quantity,
            })
        } else {
            return res.status(400)
                .json({error: true, message: "Check the data you are sending"});
        }

        await cartModel.save();
        await CartModel.populate(cartModel, {path: 'items.product'});
        res.json(CartNormalizer.normalize(cartModel));
    }

    static async getCart(req, res) {
        const cart = await CartService.getCart(req.user, req.session.id);

        if (!cart) {
            return res.status(404)
                .json({error: true, message: "Cart not found"});
        }

        res.json(CartNormalizer.normalize(cart));
    }

    static async getCartCount(req, res) {
        const cart = await CartService.getCart(req.user, req.session.id);

        if (!cart) {
            return res.status(404)
                .json({error: true, message: "Cart not found"});
        }

        let count = 0;
        cart.items.forEach(item => {
            count += item.quantity;
        })

        res.json({count: count});
    }

    static async clearCart(req, res) {
        const cart = await CartService.getCart(req.user, req.session.id);

        if (!cart) {
            return res.status(404)
                .json({error: true, message: "Cart not found"});
        }

        try {
            await CartService.clearCart(cart);
        } catch (e) {
            console.log(e);
            return res.status(500).json({error: true, message: 'Failed to empty trash'});
        }

        res.json({error: false, message: "Trash empty"});
    }
}

module.exports = CartController;