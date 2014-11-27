/**
 * Created by preeti.bala on 11/11/14.
 */

    /* Sample file for testing

     */
var assert = require("assert");

describe('Array', function(){
    describe('#indexOf()',function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1,[1,2,3].indexOf(4));
        });
    });
});

describe('JSON',function(){
    describe('.parse()', function(){
        it('Should detect malformed JSON string', function(){
        });
    });
});