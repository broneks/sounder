export function setupPlayer(element) {
  const onClick = () => {
    alert('click!')
  }

  element.addEventListener('click', onClick)
}
