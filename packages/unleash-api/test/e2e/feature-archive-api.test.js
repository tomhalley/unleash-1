'use strict';

const assert     = require('assert');
const specHelper = require('./test-helper');
const request    = specHelper.request;
const stringify  = function (o) {
    return JSON.stringify(o, null, ' ');
};

describe('The archive features api', () => {
    beforeEach(done => {
        specHelper.db.resetAndSetup()
            .then(done.bind(null, null))
            .catch(done);
    });

    it('returns three archived toggles', done => {
        request
            .get('/api/archive/features')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert(res.body.features.length === 3, `expected 3 features, got ${stringify(res.body)}`);
                done();
            });
    });

    it('revives a feature by name', done => {
        request
            .post('/api/archive/revive')
            .send({ name: 'featureArchivedX' })
            .set('Content-Type', 'application/json')
            .expect(200, done);
    });

    it('must set name when reviving toggle', done => {
        request
            .post('/api/archive/revive')
            .send({ name: '' })
            .expect(400, done);
    });
});
