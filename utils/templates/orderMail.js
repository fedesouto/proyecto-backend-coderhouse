const generateOrderMail = (id, user, productos, total) => {
    const list = productos.map(producto => {
        return `<li>${producto.quantity} x ${producto.name}</li>`
    })

    const html = `
    <h1>Nueva orden de ${user.name}</h1>
    <p>El total de la compra es $${total}</p>
    <ul>
        ${list.toString().replaceAll(',', '')}
    </ul>
    `


    return html
}

module.exports = generateOrderMail