const connection = require('../database/connection');

module.exports = {
  async indexSpec(request, response) {
    const ref_ong = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ref_ong', ref_ong)
      .select('*')

    return response.json(incidents);
  },

  async incidentsListByOng(request, response) {
    const { page = 1 } = request.query;
    const ongID = request.headers.authorization;
    const [count] = await connection('incidents').count('*').where('ref_ong', ongID);

    const lisIncidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ref_ong')
    .where('incidents.ref_ong', ongID)
    .limit(5)
    .offset((page - 1) * 5)
    .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

    response.header('X-Total-Count', count['count(*)']);
    console.log('ongID: ' + ongID)
    console.log('lisIncidents1: ' + lisIncidents)
    return response.json(lisIncidents);
  }
}