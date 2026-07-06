
/* KOTLOVSKY PORTFOLIO — v18 hotfix JS
   Fixes YouTube thumbnails so they use stable max-resolution fallbacks and are not cropped.
   Add after your existing script.js or paste at the end of script.js.
*/

const KOTLOVSKY_VIDEOS_V18 = [
  "https://youtu.be/_euLAHvTbeU?si=6bK8xyiu53UCxSub",
  "https://youtu.be/l8onRDPkydU?si=RXRsehHwK-jicCak",
  "https://youtu.be/4TwBC7YvyPU?si=Qg_aYAPJT-0QRQDn",
  "https://youtu.be/j_qmD8yaLe0?si=iDpRAl8jpOlMEl4m",
  "https://youtu.be/m-pNr8lumU4?si=RvuwP81NI2jrnlyj",
  "https://www.youtube.com/watch?v=9E87DuGpZ84",
  "https://youtu.be/Lq7xif8Rztg?si=Lkh-HkV850WkHpKM"
];

function kotlovskyExtractYouTubeId(url) {
  const match = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : "";
}

function kotlovskySetThumbFallback(img, id) {
  const sources = [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
  ];
  let i = 0;
  img.onerror = () => {
    i += 1;
    if (i < sources.length) img.src = sources[i];
  };
  img.src = sources[0];
}

document.addEventListener("DOMContentLoaded", () => {
  /* Works with existing markup: any video link/card with YouTube href. */
  document.querySelectorAll('a[href*="youtu"], a[href*="youtube"]').forEach((link) => {
    const id = kotlovskyExtractYouTubeId(link.href);
    if (!id) return;

    let img = link.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.alt = "YouTube video thumbnail";
      img.loading = "lazy";
      img.className = "youtube-thumb";
      link.prepend(img);
    }

    img.classList.add("youtube-thumb");
    kotlovskySetThumbFallback(img, id);
  });

  /* Optional full rebuild if you have a container with id="videoSlider". */
  const container = document.querySelector("#videoSlider[data-v18-rebuild='true']");
  if (container) {
    container.innerHTML = "";
    KOTLOVSKY_VIDEOS_V18.forEach((url, index) => {
      const id = kotlovskyExtractYouTubeId(url);
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "video-card";
      a.setAttribute("aria-label", `Open Kotlovsky video ${index + 1} on YouTube`);

      const img = document.createElement("img");
      img.alt = `Kotlovsky video ${index + 1}`;
      img.loading = "lazy";
      img.className = "youtube-thumb";
      kotlovskySetThumbFallback(img, id);

      a.appendChild(img);
      container.appendChild(a);
    });
  }
});
