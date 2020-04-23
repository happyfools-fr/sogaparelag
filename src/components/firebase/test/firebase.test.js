import Firebase from "../firebase"
import { v1 as uuidv1 } from 'uuid';

const fb = new Firebase();
const assert = require('assert');

describe('Firebase', function() {

    const collectionName = "test";

    it('synchronously sets and gets a doc from a collection', async () => {
        const fakeObj = { _id: uuidv1() };
        expect.assertions(1);
        //Write object first
        let res = await fb.setDocSync(collectionName, fakeObj);
        assert(res);
        //Get object
        return fb.getDocSync(collectionName, fakeObj)
        .then(data => expect(data)
        .toEqual({...fakeObj}));
    });

    it('cannot get a random doc', () => {
        const fakeObj = { _id: uuidv1() };
        expect.assertions(1);
        return fb.getDocSync(collectionName, fakeObj)
        .then(data => expect(data).toBeNull());
    });




})