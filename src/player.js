export function setupPlayer(element) {
  const onClick = () => {
    alert('click!')

    // where the magic happens
  }

  element.addEventListener('click', onClick)
}
