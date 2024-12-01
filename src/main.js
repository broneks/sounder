import './style.css'
import { setupPlayer } from './player.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello</h1>

    <div class="card">
      <button id="player" type="button">Play</button>
    </div>
  </div>
`

setupPlayer(document.querySelector('#player'))
