import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('hives', function() {
    this.route('all');
    this.route('show', { path: '/:hive_id' });
  });
  this.route('admin');
  this.route('login');
  this.route('about');

  this.route('bees', function() {
    this.route('show', { path: '/:bee_id' });
  });
});

export default Router;
