import { mkdir, writeFile } from "node:fs/promises";

const photos = [
  ["goa-aerial-village.jpg", 23630487],
  ["mandrem-coast.jpg", 28368720],
  ["chapora-aerial.jpg", 28550376],
  ["goa-architecture.jpg", 36739502],
  ["goa-beach-hut.jpg", 35916759],
  ["goa-street.jpg", 35898256],
  ["goa-palm-coast.jpg", 35916766],
  ["calangute-palm-road.jpg", 14184291],
  ["morjim-friends-sunset.jpg", 20308254],
  ["mandrem-sunset.jpg", 28368723],
];

await mkdir("public/case-study/photos", { recursive: true });

for (const [name, id] of photos) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  await writeFile(`public/case-study/photos/${name}`, Buffer.from(await response.arrayBuffer()));
  console.log(name);
}
