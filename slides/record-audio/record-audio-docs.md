---
lang: en
title:  \<record-audio\>
css: record-audio.css
---

<div>

# \<record-audio\>

</div>

## Example

```html
<record-audio audio-file-name="my-audio-file.webm"></record-audio>
```


```{=html}
<record-audio audio-file-name="my-audio-file.webm"></record-audio>
```

## Attributes

`audio-file-name`

- Description: The filename to be used when downloading the recorded audio file.
- Type: string
- Default: null
- Example:

```html
<record-audio audio-file-name="my-audio-file.webm"></record-audio>
```

## Methods

This component does not expose any methods.

## Data

This component does not store any internal data.

## Events

### ready

- Description: This event is fired when the component is ready to start recording audio.
- Type: Event
- Example:

```js
const recorder = document.querySelector('record-audio')
recorder.addEventListener('ready', () => {
  console.log('Recorder is ready to start recording.')
})
```


## Layouts

This component renders the following HTML structure:

```html
<button class="state-button">record</button>
<a href="#" download="recorded-audio.webm">download recording</a>

```

When the recording is finished, the audio player is appended to the component.


<script type=module>
import {RecordAudio} from './RecordAudio.js'
</script>