const connection = require('../database/connection');

module.exports = {
  async indexSpec(request, response) {
    const ref_ong = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ref_ong', ref_ong)
      .select('*')

    return response.json(incidents);
  }
}