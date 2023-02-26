let identifyType = x => { 
  let type = Object.prototype.toString.call(x)
    .toLowerCase()
    .split(' ')
    [1]
    .slice(0, -1)
  return type
}

export let match = (queries, comparand, fields=[]) => {
  if(!Array.isArray(queries)){
    let queryObject = queries
    queries = Object.entries(queryObject)
  }

  if(fields.length){
    queries = queries
      .filter(([key,value]) => fields.includes(key))
  }

  let comparandHasAllKeys =  queries
    .every(([key,value]) => comparand[key])
     
  if(!comparandHasAllKeys){ return false }

  let allValuesMatch = queries
    .every(([key,value]) => {
      if(typeof value == 'string'){
        return value == comparand[key]
      } else if(identifyType(value) == 'object'){
        return match(value, comparand[key])
      } else if(value instanceof RegExp){
        return value.test(comparand[key])  
      }
    })

  return allValuesMatch
}
