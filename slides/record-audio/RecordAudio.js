export class RecordAudio extends HTMLElement {
  constructor(){
    super()
    this.mediaRecorder = null
    this.innerHTML = `
    <button class=record-button>Record</button>
    <button class=play-button disabled>Play</button>
    <audio></audio>
    `
    this.audio = this.querySelector('audio')
    this.listen()
  }

  static get observedAttributes(){
    return ['audio-file-name']
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == 'audio-file-name'){
      this.mediaFileName = newValue
    }
  }

  connectedCallback(){
    this.innerHTML = `
      <button class=state-button>record</button>
      <a href=# download="recorded-audio.webm">download recording</a>
    `

    this.record()
  }

  async record(){
    this.blobs = []

    let stream = await navigator.mediaDevices.getUserMedia(this.options)
    this.mediaRecorder = await new MediaRecorder(stream)

    this.dispatchEvent(new Event('ready', { bubbles:true }))

    this.mediaRecorder.addEventListener('dataavailable', dataavailableEvent => {
      this.blobs.push(dataavailableEvent.data)
    })
  }

  get options(){
    return {audio: true}
  }
 
  render(){
    this.audio.controls = true
    this.audio.src = URL.createObjectURL(new Blob(this.blobs))
    this.audio.addEventListener('canplaythrough', e => {
      this.after(this.audio)
    })
  }

  listen(){
    this.addEventListener('click', e => {
      if(e.target.matches('.state-button')){
        if(this.mediaRecorder.state == 'inactive'){
          this.mediaRecorder.start()
          e.target.textContent = 'stop'
        } else if(this.mediaRecorder.state == 'recording'){
          this.mediaRecorder.stop()
          this.mediaRecorder.addEventListener('stop', e => this.render())

          e.target.textContent = 'done'
        }

        this.state == this.mediaRecorder.state
      }

      if(e.target.matches('[download]')){
        let link = e.target
        if(this.mediaFileName){
          link.setAttribute('download', this.mediaFileName)
        }
        link.href = URL.createObjectURL(new Blob(this.blobs))
        link.click()
      }
    })

    this.addEventListener('change', e => {
      if(e.target.matches('input[type=checkbox]')){
        this.record()
      }
    })
  }
}

customElements.define('record-audio', RecordAudio)

