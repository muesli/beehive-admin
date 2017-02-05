import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, DS.EmbeddedRecordsMixin, {
	authenticator: 'authenticator:custom',
	authorizer: 'authorizer:custom',
	host: config.APP.API,
	namespace: 'v1',

	headers: {
		"Content-Type": "application/json; charset=utf-8"
	}
});
