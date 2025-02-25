const paths = {
  '/api/products/{sku}': {
    get: {
      tags: ['Products'],
      summary: 'Products',
      description: 'Get Products by Sku',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'sku',
          required: true,
          schema: {
            type: 'intenger',
          },
          description:
            'Enviar apenas o sku pelo parametro (http://localhost:3000/api/products/${SKU-AQUI}) para recuperar e e calcular o inventory.quantity',
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/CalculateQuantityPayload',
          },
        },
        404: {
          description: 'Produto não encontrado',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
        500: {
          description: 'Internal Server Error',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
      },
    },
    put: {
      tags: ['Products'],
      summary: 'Products',
      description: 'Update Products',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'sku',
          required: true,
          type: 'intenger',
          description:
            'enviar o sku do produto que deseja editar pelo parametro da requisição. Exemplo: (http://localhost:3000/api/products/${SKU-AQUI}) E o objeto no formato do exemplo abaixo com as propriedades que serão editadas e subistituídas pelas da requisição.',
        },
        {
          in: 'body',
          name: 'update',
          required: true,
          schema: {
            $ref: '#/definitions/Products',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/Products',
          },
        },
        404: {
          description: 'Produto não existe',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
        500: {
          description: 'Internal Server Error',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
      },
    },
    delete: {
      tags: ['Products'],
      summary: 'Products',
      description: 'Delete Products',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'sku',
          required: true,
          schema: {
            type: 'intenger',
          },
          description:
            'enviar o sku pelo parametro para deletar o referente produto. Exemplo: (http://localhost:3000/api/products/${SKU-AQUI})',
        },
      ],
      responses: {
        200: {
          description: 'OK',
        },
        404: {
          description: 'Produto nao encontrado',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
        500: {
          description: 'Internal Server Error',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
      },
    },
  },
  '/api/products': {
    post: {
      tags: ['Products'],
      summary: 'Products',
      description:
        'Criar produto, enviar o payload no formato do exemplo abaixo. As propriedades inventory.quantity e isMarketable podem ser enviadas como null.',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'body',
          name: 'Create product',
          required: true,
          schema: {
            $ref: '#/definitions/Products',
          },
        },
      ],
      responses: {
        201: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/Products',
          },
        },
        409: {
          description: 'Este produto já foi cadastrado',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
        500: {
          description: 'Internal Server Error',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
      },
    },
  },
};

const definitions = {
  Products: {
    type: 'object',
    properties: {
      sku: { type: 'number' },
      name: { type: 'string' },
      inventory: {
        type: 'object',
        properties: {
          quantity: { type: 'number' },
          wharehouses: {
            type: 'array',
            items: {
              $ref: '#definitions/Wharehouses',
            },
          },
        },
      },
      isMarketable: { type: 'boolean' },
    },
  },
  Wharehouses: {
    type: 'object',
    properties: {
      locality: { type: 'string' },
      quantity: { type: 'number' },
      type: { type: 'string' },
    },
  },
  CalculateQuantityPayload: {
    type: 'object',
    properties: {
      sku: { type: 'number' },
      name: { type: 'string' },
      inventory: { type: 'number' },
      isMarketable: { type: 'boolean' },
    },
  },
};

export default {
  paths,
  definitions,
};
