let VideoPlayer = document.getElementById("VideoPlayer");
let MyVideo = document.getElementById("MyVideo");
let play_btn = document.getElementById("play_btn");
let pauses_btn = document.getElementById("pauses_btn");
let rest_btn = document.getElementById("rest_btn");
let back_btn = document.getElementById("back_btn");
let forward_btn = document.getElementById("forward_btn");
let online_time = document.getElementById("online_time");
let full_time = document.getElementById("full_time");
let fullscreen_btn = document.getElementById("fullscreen_btn");
let exit_fullscreen_btn = document.getElementById("exit_fullscreen_btn");
let timer = document.getElementById("timer");
let volume = document.getElementById("volume");
let show_volume = document.getElementById("show_volume");
let volume_section = document.getElementById("volume_section");
let speed_bar = document.getElementById("speed_bar");
let speeds = document.querySelectorAll("#speed_bar span");


MyVideo.volume = 0.5;
volume.style.background = `linear-gradient(90deg, #44bd32 50%, #dff9fb 0%)`;
play_btn.addEventListener("click", function () {
    MyVideo.play();

    this.classList.remove("flex");
    this.classList.add("hidden");

    pauses_btn.classList.remove("hidden");
    pauses_btn.classList.add("flex");

    full_time.innerHTML = getTime(MyVideo.duration);
});
pauses_btn.addEventListener("click", function () {
    MyVideo.pause();

    this.classList.remove("flex");
    this.classList.add("hidden");

    play_btn.classList.remove("hidden");
    play_btn.classList.add("flex");
});
back_btn.addEventListener("click", () => MyVideo.currentTime = MyVideo.currentTime - 15);
forward_btn.addEventListener("click", () => MyVideo.currentTime = MyVideo.currentTime + 15);
MyVideo.addEventListener("timeupdate", function () {
    online_time.innerHTML = getTime(MyVideo.currentTime);
    let bar = (MyVideo.currentTime / MyVideo.duration) * 100;
    timer.value = bar;
    timer.style.background = `linear-gradient(90deg, #487eb0 ${bar}%, #dff9fb 0%)`;
});

function getTime(video_time) {
    let min = Math.floor(video_time / 60);
    let se = Math.floor(video_time - (min * 60));
    if (min < 10) {
        min = "0" + min;
    }
    if (se < 10) {
        se = "0" + se;
    }
    return min + ":" + se;
}
fullscreen_btn.addEventListener("click", function () {
    VideoPlayer.requestFullscreen();
    this.classList.remove("flex");
    this.classList.add("hidden");

    exit_fullscreen_btn.classList.remove("hidden");
    exit_fullscreen_btn.classList.add("flex");

});
exit_fullscreen_btn.addEventListener("click", function () {
    document.exitFullscreen();
    this.classList.remove("flex");
    this.classList.add("hidden");

    fullscreen_btn.classList.remove("hidden");
    fullscreen_btn.classList.add("flex");
});
timer.addEventListener("input", function () {
    MyVideo.currentTime = (this.value / 100) * MyVideo.duration;
});
volume.addEventListener("input", function () {
    MyVideo.volume = this.value;
    volume.style.background = `linear-gradient(90deg, #4cd137 ${this.value * 100}%, #dff9fb 0%)`;
});
show_volume.addEventListener("click", function () {
    this.classList.remove("flex");
    this.classList.add("hidden");

    volume_section.classList.add("flex");
    volume_section.classList.remove("hidden");
});
volume_section.addEventListener("click", function () {
    this.classList.remove("flex");
    this.classList.add("hidden");

    show_volume.classList.add("flex");
    show_volume.classList.remove("hidden");
});
show_speed_bar.addEventListener("click", () => {
    speed_bar.classList.remove("hidden");
    speed_bar.classList.add("flex");
});
speeds.forEach(item => {
    item.addEventListener("click", function () {
        speeds.forEach(item => {
            item.classList.remove("bg-slate-50", "text-black");
            item.classList.add("text-white");
        });
        this.classList.remove("text-white");
        this.classList.add("bg-slate-50", "text-black");
        let spe = this.innerHTML;
        spe.slice(0, -1);
        MyVideo.playbackRate = parseInt(spe);
        speed_bar.classList.remove("flex");
        speed_bar.classList.add("hidden");
        show_speed_bar.innerHTML = spe;
    });
});
window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
        if (MyVideo.paused) {
            MyVideo.play();

            play_btn.classList.remove("flex");
            play_btn.classList.add("hidden");

            pauses_btn.classList.remove("hidden");
            pauses_btn.classList.add("flex");

            full_time.innerHTML = getTime(MyVideo.duration);
        } else if (!MyVideo.paused) {
            MyVideo.pause();

            pauses_btn.classList.remove("flex");
            pauses_btn.classList.add("hidden");

            play_btn.classList.remove("hidden");
            play_btn.classList.add("flex");
        }
    }



});
window.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        exit_fullscreen_btn.classList.remove("flex");
        exit_fullscreen_btn.classList.add("hidden");

        fullscreen_btn.classList.remove("hidden");
        fullscreen_btn.classList.add("flex");
    }
});
MyVideo.addEventListener("ended", function () {
    pauses_btn.classList.remove("flex");
    pauses_btn.classList.add("hidden");

    rest_btn.classList.remove("hidden");
    rest_btn.classList.add("flex");
});
rest_btn.addEventListener("click", function () {
    this.classList.remove("flex");
    this.classList.add("hidden");
    pauses_btn.classList.remove("hidden");
    pauses_btn.classList.add("flex");
    MyVideo.currentTime = 0;
    MyVideo.play();
});