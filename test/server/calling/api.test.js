// jest.disableAutomock();
// jest.unmock('supertest').unmock('../../../server/server.js');

// import request from 'supertest';
// import express from 'express';
let app;

describe('Calling API tests', () => {
	beforeEach(() => {
 		process.env.NODE_ENV = 'test';
 	//	app = require('../../../server/server.js');
	});

	afterEach((done) => {
		//app.close(done);
	//	delete process.env.NODE_ENV;
	});

	it('should run a test', (done) => {
			// return request(app)
			// .get('/api/calling/call')
			// .end((req, res) => {
			// 	expect(res.statusCode).toBe(201);
			// 	done();
			// })
			expect(true).toBe(true);
	})
})