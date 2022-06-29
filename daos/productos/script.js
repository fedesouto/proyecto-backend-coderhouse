const Knex = require('knex').default
const knex = Knex({
    client: "sqlite3",
    connection: {
      filename: "ecommerce.sqlite",
    },
    useNullAsDefault: true,
  })

  const createTables = async () => {
/*     await knex.schema.dropTableIfExists('productos') */
    await knex.schema.dropTableIfExists('carritos')
/*     await knex.schema.createTable('productos', table => {
        table.string('id').primary()
        table.integer('timestamp').notNullable()
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.integer('code').notNullable()
        table.string('image').notNullable()
        table.float('price').notNullable()
        table.integer('stock').notNullable()
    }) */
    await knex.schema.createTable('carritos', table => {
        table.string('id').primary()
        table.integer('timestamp').notNullable()
        table.json('productos')
    })
    
  }

  const write = async () => {
    await knex.table('productos').insert({
        timestamp: Date.now(),
        name: 'producto sql prueba',
        description: 'producto de prueba sql',
        code: 12348,
        image: "https://thumbs.dreamstime.com/b/new-product-stamp-round-grunge-sign-label-181920855.jpg",
        price: 1235.52,
        stock: 80

    })

  }

  const writecart = async () => {
    await knex.table('carritos').insert({
      timestamp: Date.now(),
      productos: JSON.stringify([{producto: 'soy un producto'}])
    })
  }
  const read = async () => {
    console.log(await knex.from('carritos').select('*'))
  }

read()