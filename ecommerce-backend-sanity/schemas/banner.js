export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Imágenes',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'buttonText',
            title: 'Texto botón',
            type: 'string',
        },
        {
            name: 'product',
            title: 'Producto',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Descripción',
            type: 'string',
        },
        {
            name: 'smallText',
            title: 'Texto pequeño',
            type: 'string',
        },
        {
            name: 'midText',
            title: 'Texto mediano',
            type: 'string',
        },
        {
            name: 'largeText1',
            title: 'Texto largo1',
            type: 'string',
        },
        {
            name: 'largeText2',
            title: 'Texto largo2',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Descuento',
            type: 'string',
        },
        {
            name: 'saleTime',
            title: 'Tiempo de venta',
            type: 'string',
        },
    ],
  };