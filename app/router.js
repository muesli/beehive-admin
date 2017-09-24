import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
  this.route('hives', function() {
      this.route('all');
      this.route('show', {
          path: '/:hive_id'
      }, function() {
          this.route('summary');
          this.route('event', {
              path: 'events/:event_id'
          });
          this.route('action', {
              path: 'actions/:action_id'
          });
      });
  });

  this.route('admin');
  this.route('login');
  this.route('about');

  this.route('bees', function() {
      this.route('show', {
          path: '/:bee_id'
      });
      this.route('new', {
          path: 'new/:hive_id'
      });
      this.route('all');
  });

  this.route('chains', function() {
      this.route('all');
      this.route('show', {
          path: '/:chain_id'
      }, function() {
          this.route('summary');
      });

      this.route('new', function() {
          this.route('pickbee');
          this.route('pickevent', {
              path: 'pickevent/:beeevent'
          });
          this.route('pickbeeaction', {
              path: 'pickbeeaction/:beeevent/:event'
          });
          this.route('pickaction', {
              path: 'pickaction/:beeevent/:event/:beeaction'
          });
      });
  });

  this.route('logs', function() {
    this.route('all');
  });
});

export default Router;
