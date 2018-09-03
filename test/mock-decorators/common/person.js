let jsonTestParamSchema = {
  'id': '/jsonTestParam',
  'type': 'object',
  'properties': {
    'sex': {
      'type': 'string',
      'required': 'true'
    },
    'age': {
      'type': 'number',
      'required': 'true'
    }
  }
}
v.addSchema(jsonTestParamSchema, '/jsonTestParam')
