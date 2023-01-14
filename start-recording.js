export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks = []
  
    mediaRecorder.addEventListener("dataavailable", event => audioChunks.push(event.data))
  
    mediaRecorder.start()
  
    const stopRecording = async () => mediaRecorder.stop() 
  
    const playRecording = () => {
      const audioBlob = new Blob(audioChunks)
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audio.play()
    }
  
    mediaRecorder.addEventListener("stop", () => {
      playRecording()
    })
  } catch (err) {
    console.error(err)
  }
}
