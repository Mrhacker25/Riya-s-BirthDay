function displayBirthday() {
   // Pre-added values
   const name = document.getElementById('preName').textContent;
   const age = document.getElementById('preAge').textContent;
   const dob = new Date(document.getElementById('preDob').textContent);
   const pictureSrc = document.getElementById('prePicture').src;

   document.getElementById('birthdayImage').src = pictureSrc;
   document.getElementById('birthdayName').textContent = `Today is ${name}'s Birthday`;
   document.getElementById('birthdayAge').textContent = `${age} years old`;
   document.getElementById('birthdayDate').textContent = dob.toLocaleDateString();

   document.getElementById('birthdayHeader').style.display = 'block';

   const giftSections = document.querySelectorAll('.gift-section, .footer');
   giftSections.forEach((section) => (section.style.display = 'block'));

   document.querySelector('.form-container').style.display = 'none';

   // Show and setup audio controls
   document.getElementById('audioControls').style.display = 'flex';
   setupAudioControls();

   // Play the audio
   const audio = document.getElementById('birthdayAudio');
   audio.play();
}

// Media controls for birthday audio
function setupAudioControls() {
   const audio = document.getElementById('birthdayAudio');
   const playPauseBtn = document.getElementById('playPauseBtn');
   const muteBtn = document.getElementById('muteBtn');
   const progress = document.getElementById('audioProgress');
   const time = document.getElementById('audioTime');

   // Play/Pause toggle
   playPauseBtn.onclick = function () {
      if (audio.paused) {
         audio.play();
      } else {
         audio.pause();
      }
   };
   audio.onplay = function () {
      playPauseBtn.textContent = 'Pause';
   };
   audio.onpause = function () {
      playPauseBtn.textContent = 'Play';
   };

   // Mute/Unmute toggle
   muteBtn.onclick = function () {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
   };

   // Progress bar
   audio.ontimeupdate = function () {
      if (audio.duration) {
         progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
         time.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
      }
   };
   audio.onloadedmetadata = function () {
      progress.value = 0;
      time.textContent = '0:00 / ' + formatTime(audio.duration);
   };
   progress.oninput = function () {
      if (audio.duration) {
         audio.currentTime = (progress.value / 100) * audio.duration;
      }
   };
}

function formatTime(sec) {
   sec = Math.floor(sec);
   const m = Math.floor(sec / 60);
   const s = sec % 60;
   return m + ':' + (s < 10 ? '0' : '') + s;
}
