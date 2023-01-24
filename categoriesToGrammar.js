const convert = categories => 
  categories.reduce((features, {name,values}) => 
    features.concat(values.map(value => ({ [name]: value }))
  ), [])