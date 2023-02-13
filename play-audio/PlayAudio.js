export class PlayAudio extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = `
      <button id="play-button">Play</button>
      <button id="stop-button">Stop</button>
      <button id="loop-button">Loop</button>
      <input type="range" id="scrubber" min="0" max="100" value="0" step="1">
      <input type="checkbox" id="loop-checkbox">
    `

    this.audioContext = new AudioContext()
    this.source = this.audioContext.createBufferSource()
    this.source.loop = false
    this.scrubber = this.getElementById('scrubber')
    this.playButton = this.getElementById('play-button')
    this.stopButton = this.getElementById('stop-button')
    this.loopButton = this.getElementById('loop-button')
    this.loopCheckbox = this.getElementById('loop-checkbox')

    // Play button event listener
    this.playButton.addEventListener('click', () => {
      this.play()
    })

    // Stop button event listener
    this.stopButton.addEventListener('click', () => {
      this.stop()
    })

    // Loop button event listener
    this.loopButton.addEventListener('click', () => {
      this.source.loop = !this.source.loop
    })

    // Loop checkbox event listener
    this.loopCheckbox.addEventListener('change', (e) => {
      this.source.loop = e.target.checked
    })

    // Scrubber event listener
    this.scrubber.addEventListener('input', (e) => {
      const percent = e.target.value
      this.seekTo(percent)
    })
  }

  static get observedAttributes(){
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == 'src'){
      this.audioBuffer = newValue
    }
  }

  set buffer(audioBuffer) {
    if(typeof audioBuffer == 'string'){
      this.fetch(audioBuffer)
    }
    this.source.buffer = audioBuffer
  }

  play() {
    this.source.connect(this.audioContext.destination)
    this.source.start()
  }

  stop() {
    this.source.stop()
    this.scrubber.value = 0
  }

  seekTo(percent) {
    const duration = this.source.buffer.duration
    this.source.stop()
    this.source.start(0, duration * percent)
  }
}

customElements.define('play-audio', PlayAudio)
