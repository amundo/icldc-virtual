let plaintext

plaintext = await Deno.readTextFile('pt-dictionary.txt')

let abecedary = plaintext
  .trim()
  .split('\n')
  .map(l => l.trim())
  .map(line => {
    let letter = line.split(' - ')[0].trim()
    let formGloss = line.split(' - ')[1].trim()
    let [form, gloss] = formGloss.split('(').map(x => x.trim())
    gloss = gloss.slice(0,-1)
    return { letter, form, gloss}
  })

  
await Deno.writeTextFile("portuguese-abecedary.json", JSON.stringify(abecedary, null, 2))
