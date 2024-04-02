import { expect } from '@playwright/test'
import Ajv from 'ajv';

const ajv = new Ajv({ strictTuples: false });

const helper = {

    checkSchema(schema,responseBody){
        const validSchema = ajv.validate(require(`${schema}`),responseBody)
        //if Error output
        if (!validSchema){
            console.error(ajv.errorsText())
        }
        //if JSON is valid
        expect(validSchema).toBe(true)

    }
}

export default helper