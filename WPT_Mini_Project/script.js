// Log message to check if JS is loaded
console.log("Welcome to Spotify")
 

// Array of Songs: 
let songs =[
    {songName:"Mortals",filepath:"1.mp3",coverpath:"new_cover_1.jpeg"},
    {songName:"Whoopty",filepath:"2.mp3",coverpath:"new_cover_2.jpeg"},
    {songName:"I am Coming Home",filepath:"3.mp3",coverpath:"new_cover_3.jpeg"},
    {songName:"Plevne",filepath:"4.mp3",coverpath:"new_cover_4.jpeg"},
    {songName:"Ignite",filepath:"5.mp3",coverpath:"new_cover_5.jpeg"},
    {songName:"Waving Flag",filepath:"6.mp3",coverpath:"new_cover_6.jpeg"},
    {songName:"In the End",filepath:"7.mp3",coverpath:"new_cover_7.png"},
    {songName:"I am Greateness",filepath:"8.mp3",coverpath:"new_cover_8.jpeg"},
    {songName:"Hall of Fame",filepath:"9.mp3",coverpath:"new_cover_9.jpeg"},
    {songName:"Written In The Stars",filepath:"10.mp3",coverpath:"new_cover_10.jpeg"},
   
   ]; 


// Initialize the variables
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filepath);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let bottomPlayIcons = Array.from(document.getElementsByClassName('songPlay')); // Bottom Play Button 



// To Update the song Information in the Bottom Bar 
const updateSongInfo = () =>{
  const songInfo = document.querySelector('.songinfo');
  songInfo.innerHTML = `<img src="${songs[songIndex].coverpath}" width="60px"> ${songs[songIndex].songName}`;
}; 

// To change the song specific play icon when the song is 
// played using the masterplay icon 
const updateSongIcon = () =>
{
  const songIcon = bottomPlayIcons[songIndex]; // Get the currently playing sonf icon 
  if(audioElement.paused) 
  {
    songIcon.classList.add('fa-play-circle');
    songIcon.classList.remove('fa-pause-circle');
  } 
  else
  {
      songIcon.classList.remove('fa-play-circle');
      songIcon.classList.add('fa-pause-circle');
  }
};


// Play or Pause the current Song 
const togglePlayPause = () =>
{
    if(audioElement.paused || audioElement.currentTime <=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); 
        //Update individual song icon to pause 
        updateIndividualIcon();
    } 

    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    } 
    updateSongIcon(); // Sync the play/pause state of the song icon
    
    //Reset individual song icon
    resetIndividualIcon();
};    

// Update the individual song icon based on songIndex 
const updateIndividualIcon = () =>
    {
        const currentIcon = songItems[songIndex]?.querySelector('.songPlay i');
        if(currentIcon){
        currentIcon.classList.remove('fa-play-circle');
       currentIcon.classList.add('fa-pause-circle');
        }
    }; 
    
// Reset Individual to play
const resetIndividualIcon = () =>
{
    const currentIcon = songItems[songIndex]?.querySelector('.songPlay i')
   if(currentIcon){
    currentIcon.classList.remove('fa-pause-circle');
    currentIcon.classList.add('fa-play-circle');
   }
};

// Handle Play/Pause from the master Icon in the bottom bar 
masterPlay.addEventListener('click',togglePlayPause);
 

// Update progress bar (Slider) based on the song's current time
audioElement.addEventListener('timeupdate', () =>{
const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
myProgressBar.value = progress;
}); 

// Seek the song based on progress bar changes 
myProgressBar.addEventListener('change', () =>{
 audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});  


// Reset all Play icons when switching songs 
const resetPlayIcons = () =>
{
  songItems.forEach((item) => 
    {
        const icon = item.querySelector('.songPlay i');
         if(icon){
        icon.classList.add('fa-play-circle');
        icon.classList.remove('fa-pause-circle');
         }
    });  
};

// play the selected song from the song list 
songItems.forEach((element, index) => {
element.addEventListener('click', (e) =>{
  // If the clicked song is currently playing song, toggle
  // the play/pause 
   if(songIndex==index) 
   {
    togglePlayPause();
   } 
   else{
         // Reset play icons 
    resetPlayIcons();
   
     
   // Set the selected song Index 
    songIndex = index; 

    // Load the new song 
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;

    //Update song info in the bottom bar 
    updateSongInfo();

    // Play the selected song and update play icon
    audioElement.play();
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle'); 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
   }
});
});   

// Update bottom play/pause icon when a song ends
audioElement.addEventListener('ended',() => {
  masterPlay.classList.add('fa-play-circle');
  masterPlay.classList.remove('fa-pause-circle');
   resetIndividualIcon();
});