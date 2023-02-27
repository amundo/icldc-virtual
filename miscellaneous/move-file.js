let getBoundingBoxCenter = element => {
  // Get the bounding box of the element
  const bbox = element.getBoundingClientRect()

  // Calculate the center point
  const centerX = bbox.left + bbox.width / 2
  const centerY = bbox.top + bbox.height / 2

  // Return the center point as an object
  return { x: centerX, y: centerY }
}

let moveElement = (move, a,b) => {
  let start = getBoundingBoxCenter(a)
  let end = getBoundingBoxCenter(b)

  move.style.position.left = start.x
  
  // Calculate the distance to move the element
  const dx = end.left - start.x;
  
  // Create the keyframes for the animation
  // const keyframes = [
  //   { transform: `translate(${start.x}px, ${start.y}px)` },
  //   { transform: `translate(${start.x}px, ${start.y}px)` },
  //   { transform: `translate(${start.x + dx}px, ${start.y + dy}px)` }
  // ];
  
  const keyframes = [
    { transform: `translateX(${start.x}px` },
    { transform: `translateX(${end.left}px)` }
  ];

  // Create the animation
  const options = {
    duration: 1000, // 1 second
    easing: 'ease-in-out',
    iterations: 1
  };

  setTimeout(() => {
    move.style.position.left = end.left
  }, 1000);

  
  const animation = move.animate(keyframes, options);
  
  
}

let [server, laptop, file] = Array.from(document.querySelectorAll('[data-current=true] img'))


file.addEventListener('click', () => {
	moveElement(file, server, laptop)
})