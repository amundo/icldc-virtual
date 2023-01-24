export class ScreenRecorder extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <button id="recordStart">Start Recording</button>
      <button id="recordPause">Pause Recording</button>
      <button id="recordStop">Stop Recording</button>
      <button id="recordPlay">Play Recording</button>
      <button id="recordSave">Save Recording</button>
      <div id="status"></div>
      <video controls></video>
    `;

    this._status = this.querySelector('#status');
    this._recorder;
    this._recordingData = [];
    this._recorderStream;

    this._playbackVideo = this.querySelector('video');


    this._startButton = this.querySelector('#recordStart');
    this._startButton.addEventListener('click', async () => {
      let gumStream, gdmStream;
      this._recordingData = [];

      try {
        gumStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        gdmStream = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "browser" }, audio: true });

      } catch (e) {
        console.error("capture failure", e);
        return
      }

      this._recorderStream = gumStream ? this.mixer(gumStream, gdmStream) : gdmStream;
      this._recorder = new MediaRecorder(this._recorderStream, { mimeType: 'video/webm' });

      this._recorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          this._recordingData.push(e.data);
        }
      };

      this._recorder.onStop = () => {
        this._recorderStream.getTracks().forEach(track => track.stop());
        gumStream.getTracks().forEach(track => track.stop());
        gdmStream.getTracks().forEach(track => track.stop());

      };

      this._recorderStream.addEventListener('inactive', () => {
        console.log('Capture stream inactive');
        this.stopCapture();
      });

      this._recorder.start();
      console.log("started recording");
      this._startButton.innerText = "Recording";

      this._startButton.disabled = true;
      this._pauseButton.disabled = false;
      this._stopButton.disabled = false;
      this._playButton.disabled = true;
      this._saveButton.disabled = true;
    });

    this._pauseButton = this.querySelector('#recordPause');
    this._pauseButton.addEventListener('click', () => {
      if (this._recorder.state === 'paused') {
        this._recorder.resume();
        this._pauseButton.innerText = "Pause"
      }
      else if (this._recorder.state === 'recording') {
        this._recorder.pause();
        this._pauseButton.innerText = "Resume"
      }
    });

    this._stopButton = this.querySelector('#recordStop');
    this._stopButton.addEventListener('click', () => {
      console.log("Stopping recording");
      this._recorder.stop();
      this._startButton.disabled = false;
      this._pauseButton.disabled = true;
      this._stopButton.disabled = true;
      this._playButton.disabled = false;
      this._saveButton.disabled = false;

      this._startButton.innerText = "Record";
      this._pauseButton.innerText = "Pause";
    });

    this._playButton = this.querySelector('#recordPlay');
    this._playButton.addEventListener('click', () => {

      this._playbackVideo.src = URL.createObjectURL(new Blob(this._recordingData, {type: 'video/webm'}))
      
      this._playbackVideo.play();
      
    });

    this._saveButton = this.querySelector('#recordSave');
    this._saveButton.addEventListener('click', () => {
      const blob = new Blob(this._recordingData);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = this.getFilename();
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    });

  }
  mixer(stream1, stream2) {
    const ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();
    if (stream1.getAudioTracks().length > 0)
      ctx.createMediaStreamSource(stream1).connect(dest);

    if (stream2.getAudioTracks().length > 0)
      ctx.createMediaStreamSource(stream2).connect(dest);

    let tracks = dest.stream.getTracks();
    tracks = tracks.concat(stream1.getVideoTracks()).concat(stream2.getVideoTracks());

    return new MediaStream(tracks)
  }

  getFilename() {
    const now = new Date();
    const timestamp = now.toISOString();
    return `recording_${timestamp}`;
  }
}
customElements.define('screen-recorder', ScreenRecorder);