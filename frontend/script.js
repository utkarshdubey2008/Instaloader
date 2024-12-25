document.getElementById("url-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const url = document.getElementById("insta-url").value;
    const mediaContainer = document.getElementById("media-container");
    const mediaDiv = document.getElementById("media");
    const loader = document.getElementById("loader");
    
    mediaContainer.classList.add("hidden");
    mediaDiv.innerHTML = '';
    loader.classList.remove("hidden");

    if (!url) {
        alert("Please enter a valid Instagram URL.");
        return;
    }

    try {
        const response = await fetch(`/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.videos && data.videos.length > 0) {
            data.videos.forEach(video => {
                const videoElement = document.createElement("video");
                videoElement.src = video.url;
                videoElement.controls = true;
                videoElement.classList.add("w-full", "rounded-lg", "my-4");
                mediaDiv.appendChild(videoElement);
            });
        }

        if (data.images && data.images.length > 0) {
            data.images.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = image.url;
                imgElement.classList.add("w-full", "rounded-lg", "my-4");
                mediaDiv.appendChild(imgElement);
            });
        }

        loader.classList.add("hidden");
        mediaContainer.classList.remove("hidden");
    } catch (error) {
        alert("Error fetching media. Please try again later.");
        console.error(error);
        loader.classList.add("hidden");
    }
});
