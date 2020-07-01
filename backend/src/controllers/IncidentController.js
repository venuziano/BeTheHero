const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
      const { page = 1 } = request.query;
      const [count] = await connection('incidents').count('*');

      const lisIncidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ref_ong')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
  
      response.header('X-Total-Count', count['count(*)']);
      
      return response.json(lisIncidents);
    },
    
    async create(request, response) {
      const { title, description, value} = request.body;
      const ref_ong = request.headers.authorization;

      const [ id ] = await connection('incidents').insert({
          title,
          description,
          value,
          ref_ong
      })
      
      return response.json({ id });
    },

    async delete(request, response) {
      const { id } = request.params;
      const ref_ong = request.headers.authorization;

      const incident = await connection('incidents')
        .where('id', id)
        .select('ref_ong')
        .first();

      if (incident.ref_ong != ref_ong) {
        return response.status(401).json({ error: 'Operation not permitted!'})
      }

      await connection('incidents').where('id', id).delete();

      return response.status(201).send();
    }
};