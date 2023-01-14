addEventListener('keyup', e => {
  if(e.key == 'ArrowRight'){
    document.body.lastElementChild.after(document.body.firstElementChild)
  }
	if(e.key == 'ArrowLeft'){
    document.body.firstChild.before(document.body.lastElementChild)
  }
})

let hues = [ "red", "pink", "grape", "violet", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange", "grey" ]

let coolHues = [ "violet", "indigo", "blue",  "teal", "green" ]
hues = coolHues

let choice = s => s[Math.floor(Math.random() * s.length)]


document.querySelectorAll('body > header, body > section.level2')
  .forEach(el => {
    el.style.setProperty('--dark-color', `var(--${choice(hues)}-8)` );
    el.style.setProperty('--light-color', `var(--${choice(hues)}-2)` );

    let backgroundImage = `
      radial-gradient(ellipse at ${choice(["bottom"])} ${choice(["left", "center", "right"])}, var(--light-color) 5%, var(--dark-color)),
      radial-gradient(ellipse at ${choice(["top"])} ${choice(["left", "center", "right"])}, var(--light-color) 5%, var(--dark-color))
    `

    el.style.setProperty('background-image', backgroundImage)    
  })
 