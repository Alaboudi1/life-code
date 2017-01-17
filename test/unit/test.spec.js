import { Test } from '../../src/services/test';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Schema } from '../../src/resources/schema';
import { code } from '../../test/unit/mockModule.spec';


describe('the behavior of test module ', () => {
  describe('regarding creating test cases', () => {
    let event;
    let test;
    let schema;
    let functionObject;

    beforeEach(() => {
      event = new EventAggregator();
      test = new Test(event);
      schema = new Schema();
      functionObject = schema.getFunctionObject();
      functionObject.code = code;
      functionObject.name = 'helloWorld';
      functionObject.testCases.push(schema.getTestCaseObject());
      functionObject.params.push(schema.getParamObject());
      test.subscribe();
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is 
      Array of String #1`, done => {
      functionObject.params[0] = { name: 'message', selectedType: 'Array of Strings' };
      event.subscribe('onExpectedResultRequest', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
          // expect(localObj.testCases[0].expectedResult).toContain(jasmine.any(String));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is 
      Array of Numbers #2`, done => {
      functionObject.params[0] = { name: 'message', selectedType: 'Array of Numbers' };
      event.subscribe('onExpectedResultRequest', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
          // expect(localObj.testCases[0].expectedResult).toContain(jasmine.any(Number));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is 
      Array of Boolean #3`, done => {
      functionObject.params[0] = { name: 'message', selectedType: 'Array of Booleans' };
      event.subscribe('onExpectedResultRequest', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
          // expect(localObj.testCases[0].expectedResult).toContain(jasmine.any(Boolean));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is 
      String #4`, done => {
      functionObject.params[0] = { name: 'message', selectedType: 'String' };
      event.subscribe('onExpectedResultRequest', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
          // expect(localObj.testCases[0].expectedResult).toEqual(jasmine.any(String));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    });


    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is 
      Number #5`, done => {
      functionObject.params[0] = { name: 'message', selectedType: 'Number' };
      event.subscribe('onExpectedResultRequest', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
          // expect(localObj.testCases[0].expectedResult).toEqual(jasmine.any(Number));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is 
      Boolean #6`, done => {
      functionObject.params[0] = { name: 'message', selectedType: 'Boolean' };
      event.subscribe('onExpectedResultRequest', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
          // expect(localObj.testCases[0].expectedResult).toEqual(jasmine.any(Boolean));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    });
  });
  /////////////////////////////////
  describe('regarding executing test cases ', () => {
    let event;
    let test;
    let mainMap;
    let schema;
    let functionObject;

    beforeEach(() => {
      event = new EventAggregator();
      test = new Test(event);
      schema = new Schema();
      mainMap = schema.getMainMap();
      functionObject = schema.getFunctionObject();
      functionObject.code = code;
      functionObject.testCases.push(schema.getTestCaseObject());
      functionObject.status = 'tracked';
      mainMap.set('helloWorld', functionObject);
      test.subscribe();
    });
    it('should execute the test and passes it if the expectedResult === actualResult and the type is primitive #1', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld("this is a test");', expectedResult: 'this is a test' };
      event.subscribe('onTestEnsureEnds', map => {
        expect(map.get('helloWorld').testCases[0].pass).toBe(true);
        done();
      });
      event.publish('onTraverseEnds', mainMap);
    });

    it('should execute the test and passes it if the expectedResult === actualResult and the type is array #2', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld([1,2,3]);', expectedResult: [1, 2, 3] };
      event.subscribe('onTestEnsureEnds', map => {
        expect(map.get('helloWorld').testCases[0].pass).toBe(true);
        done();
      });
      event.publish('onTraverseEnds', mainMap);
    });

    it('should execute the test and faills it if the expectedResult != actualResult when type is primitive #3', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld("this is not a test");', expectedResult: 'this is a test' };
      event.subscribe('onTestEnsureEnds', map => {
        expect(map.get('helloWorld').testCases[0].pass).toBe(false);
        done();
      });
      event.publish('onTraverseEnds', mainMap);
    }, );
    it('should execute the test and faills it if the expectedResult != actualResult when type is array #4', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld([1,3,2]);', expectedResult: [1, 2, 3] };
      event.subscribe('onTestEnsureEnds', map => {
        expect(map.get('helloWorld').testCases[0].pass).toBe(false);
        done();
      });
      event.publish('onTraverseEnds', mainMap);
    });
  });
});
