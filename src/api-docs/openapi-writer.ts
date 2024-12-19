import fs from 'node:fs'
import path from 'node:path'
import {stringify} from 'yaml'
import { openApiDoc } from './openapi-generator'

const scriptDir = path.resolve(__dirname)

/* Convert to YAML */
const yamlDoc = stringify(openApiDoc)
fs.writeFileSync(`${scriptDir}/openapi.yaml`, yamlDoc)
console.log('OpenAPI spec generated in YAML format')

/* Convert to JSON */
const jsonDoc = JSON.stringify(openApiDoc, null, 2)
fs.writeFileSync(`${scriptDir}/openapi.json`, jsonDoc)
console.log('OpenAPI spec generated in JSON format')