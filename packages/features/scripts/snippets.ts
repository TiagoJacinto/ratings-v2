import { generateCodeFromFeature } from "../src/utils"

const path = process.argv[2]

const code = generateCodeFromFeature(path, {
  type: "snippets"
})

console.log(code);