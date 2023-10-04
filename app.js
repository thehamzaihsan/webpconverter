const input = document.querySelector("input");
const output = document.querySelector("img");
const download = document.querySelector("#download");
const progress = document.querySelector("progress");
const downloadall = document.querySelector("#downloadall")
input.addEventListener("change", function () {
  progress.style.display = "block";
  const files = input.files;
  const totalSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);
  let loadedSize = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      const image = new Image();
      image.src = reader.result;

      image.addEventListener("load", function () {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);

        canvas.toBlob(function (blob) {
          // output.src = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          link.innerHTML = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          link.classList.add("webplink");
          const linkwrapper = document.createElement("div");
          const linkimg = document.createElement("img");
          linkimg.src = URL.createObjectURL(blob);
          linkwrapper.className = "linkwrapper";
          download.appendChild(linkwrapper);
          linkwrapper.appendChild(link);
          linkwrapper.appendChild(linkimg);

          loadedSize += file.size;
          progress.value = (loadedSize / totalSize) * 100;
        }, "image/webp");
      });
    });

    reader.readAsDataURL(file);
  }

    downloadall.addEventListener('click', function() {
      const links = download.querySelectorAll('.webplink');
      for (let i = 0; i < links.length; i++) {
        links[i].click();
      }
    });
});
