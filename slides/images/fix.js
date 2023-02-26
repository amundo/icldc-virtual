import { moveSync } from "https://deno.land/std/fs/mod.ts";


const sourceDir = "."; // the directory containing the files
const suffixes = Deno.args[0].split(",");
console.log(suffixes)


for (const file of Deno.readDirSync('.')) {
  if (file.name.includes("#") && suffixes.includes(file.name.split(".")[1])) {
    const newName = file.name.replace("#", "");
    const oldPath = `${sourceDir}/${file.name}`;
    const newPath = `${sourceDir}/${newName}`;
    try {
      await moveSync(oldPath, newPath, { overwrite: true });
      console.log(`${file.name} renamed to ${newName}`);
    } catch (error) {
      console.error(`Error renaming ${file.name}: ${error}`);
    }
  }
}

