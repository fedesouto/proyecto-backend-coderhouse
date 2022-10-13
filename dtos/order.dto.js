const orderDto = {}

orderDto.create = (userId, cart) => {
    const products = cart.products.map(p => {
        return {
            name: p.product.name,
            image: p.product.image,
            price: p.product.price,
            quantity: p.quantity,
            subtotal: p.product.price * p.quantity
        }
    })
    return {
        user: userId,
        products: products,
        total: products.reduce((a, b) => a += b.subtotal, 0)
    }
}

module.exports = orderDto;