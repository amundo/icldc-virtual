import {RecordAudio} from './record-audio/RecordAudio.js'

addEventListener('load', () => {
  console.log(`loaded…`)
  dispatchEvent(new Event('hashchange'))
})

addEventListener('hashchange', e => {
  let n = parseInt(document.location.hash.slice(1))
  show(n)
})


let slides = document.querySelectorAll("header#title-block-header, section.level2")

let show = n => {
  document.location.hash = `#${n}`
  slides.forEach((section, index) => {
    if (index === n) {
      section.setAttribute("data-current", "true")
    } else {
      section.removeAttribute("data-current")
    }
  })
}

document.addEventListener("keydown", event => {
  let currentIndex = Array.from(slides).findIndex(
    section => section.getAttribute("data-current") === "true"
  )
  if (event.key === "ArrowLeft") {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1
    show(currentIndex)
  } else if (event.key === "ArrowRight" || event.key == " ") {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0
    show(currentIndex)
  }
})


if(!document.location.hash){
  show(0)
}


// add audio recorder to each page

document.querySelectorAll('body > header, body > section.level2')
  .forEach(slide => {
    let recordAudio = new RecordAudio()
    slide.append(recordAudio)
  })



// randomizing slide colors below

let hues = [ "red", "pink", "grape", "violet", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange", "grey" ]

let coolHues = [ "violet", "indigo", "blue",  "teal", "green" ]
hues = coolHues

let choice = s => s[Math.floor(Math.random() * s.length)]


document.querySelectorAll('body > header, body > section.level2')
  .forEach(el => {
    el.style.setProperty('--dark-color', `var(--${choice(hues)}-8)` );
    el.style.setProperty('--light-color', `var(--${choice(hues)}-2)` );

    let backgroundImage = `
      radial-gradient(ellipse at ${choice(["bottom"])} ${choice(["left", "center", "right"])}, var(--light-color) 2%, var(--dark-color)),
      radial-gradient(ellipse at ${choice(["top"])} ${choice(["left", "center", "right"])}, var(--light-color) 5%, var(--dark-color))
    `

    el.style.setProperty('background-image', backgroundImage)    
  })
 
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
      document.documentElement.requestFullscreen()
  }
})
