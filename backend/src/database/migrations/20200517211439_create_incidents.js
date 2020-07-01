exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table){
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ref_ong').notNullable();

    table.foreign('ref_ong').references('id').inTable('ongs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};