'use strict';

const jsonp = require('jsonp-body');
const fs = require('fs');
const Koa = require('koa');
const koaRouter = require('koa-router');
const rq = require('request-promise');
const jd = require('../');

let app = new Koa();
let router = new koaRouter();

@jd.jsontest
class jsonTest {
	constructor(){
		this.val = {
			test:true,
			name:'xtx',
			params:{
				sex:'male',
				age:25
			}
		}
	}
}

@jd.jsondirtest
class jsonDirTest {
	constructor(){
		this.val = {
			dir:true,
			dirname:'json',
			params:{
				sex:22,
				age:25
			}
		}
	}
}

router.get('/jsontest',async (ctx,next) => {
	ctx.set('Content-Type','application/json');
	let jsonT = new jsonTest();
	let json = jsonT.getVal();
	ctx.body = jsonp(json);
});
router.get('/jsonDirTest',async (ctx,next) => {
	ctx.set('Content-Type','application/json');
	let jsonT = new jsonDirTest();
	let json = jsonT.getVal();
	ctx.body = jsonp(json);
});
app.use(router.routes());
let server = app.listen('7077');
console.log('Server is listening at 7077');

describe('Request test for jsonSchema decorator', () =>{
	it('if server 7077 is start',async () => {
		expect.assertions(2);
		let dataSuccessTest = await rq({
			uri:'http://localhost:7077/jsontest'
		});
		dataSuccessTest = JSON.parse(dataSuccessTest);
		expect(dataSuccessTest.test).toEqual(true);

		let dataFailureTest = await rq({
			uri:'http://localhost:7077/jsonDirTest'
		});
		dataFailureTest = JSON.parse(dataFailureTest);
		expect(dataFailureTest.schemaId).toEqual('jsondirtest');

		server.close(error => {
			test('Could not stop server',() => {
				expect(error).toBe('')
			});
		});

	});
});

