//
export default {
    name: 'product',
    title: 'Producto',
    type: 'document',
    fields: [
        {
            name: 'images',
            title: 'Imágenes',
            type: 'array',
            of: [{ type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Nombre',
            type: 'string'
        },
        {
            name: 'category',
            title: 'Categoría',
            type: 'string'
        },
        {
            name: 'details',
            title: 'Detalles',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLenght: 90
            }
        },
        {
            name: 'price',
            title: 'Precio',
            type: 'number',
            validation: Rule => [
                Rule.positive().error('El precio debe ser mayor de 0'),
                Rule.precision(2).error('El precio debe tener 2 decimales como máximo')
            ]
        }
    ]
}