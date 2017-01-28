export default function() {

    this.urlPrefix='http://localhost:8181';
    this.namespace='/v1';

    this.passthrough('/hives');
    this.passthrough('/hives/:hive_id');
    this.passthrough('/bees');
    this.passthrough('/bees/:bee_id');
    this.passthrough('/chains');
    this.passthrough('/chains/:chain_id');
    this.passthrough('/actions');
    this.passthrough('/actions/:action_id');
    this.passthrough('/events');
    this.passthrough('/events/:event_id');
    this.passthrough('/filters');
    this.passthrough('/filters/:filter_id');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
