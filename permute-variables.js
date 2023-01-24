import {match} from './match.js'
let json = await Deno.readTextFile("typology.json")
let data = JSON.parse(json).variables

function permuteVariables(input) {
  const keys = Object.keys(input)
  const permutations = []

  function permute(array, index) {
    if (index === keys.length) {
      permutations.push(Object.assign({}, array));
    } else {
      const key = keys[index];
      for (const value of input[key]) {
        array[key] = value;
        permute(array, index + 1);
      }
    }
  }
  permute({}, 0);
  return permutations;
}

let scenarios = permuteVariables(data)

scenarios = scenarios.map(features => ({
  metadata: {
    name: ""
  },
  features
}))

let impossibles = [
  {areWorkingSimultaneously:false, bothLookAtInterface:true }
]

scenarios = scenarios
  .filter(scenario => impossibles
    .every(impossible => !match(impossible, scenario.features)
  )
)

console.table(scenarios.map(({features}) => features))

