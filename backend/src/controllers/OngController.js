const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const listOngs = await connection('ongs').select('*');

    return response.json(listOngs);
  },
  
  async create(request, response) {
    const { name, email, whatsapp, city, uf} = request.body;
    
    const id = generateUniqueId();

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })
    
    return response.json({ id });
    }
};