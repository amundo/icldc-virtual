import 'https://cdn.jsdelivr.net/npm/recorder-js@1.0.0/dist/recorder.js'

let stream = navigator.mediaDevices.getUserMedia({ audio: true })

let recorder = new Recorder(stream)
recorder.record()

    
const stopRecording = () => {
    recorder.stop()
    recorder.exportWAV((blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = url
        a.download = 'output.wav'
        a.click()
        window.URL.revokeObjectURL(url)
    })
}
