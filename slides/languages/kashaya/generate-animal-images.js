let generateImageTags = async directoryPath => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const imageFiles = [];

  for await (const dirEntry of Deno.readDir(directoryPath)) {
    const ext = dirEntry.name.substring(dirEntry.name.lastIndexOf('.')).toLowerCase();
    if (dirEntry.isFile && imageExtensions.includes(ext)) {
      imageFiles.push(dirEntry.name);
    }
  }

  return imageFiles.map(file => `<img src="${directoryPath}/${file}">`).join('\n');
}


console.log(
  await generateImageTags('./images')
)