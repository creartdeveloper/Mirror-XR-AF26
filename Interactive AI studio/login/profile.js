document.getElementById("toggleDarkMode")
document.addEventListener("click", function (){
    document.body.classList.toggle("dark-mode");
});

/* need to impelemnt the above*/

const avatars = document.querySelectorAll('.avatar');
const selectedAvatarImg = document.getElementById('selectedAvatarImg');
const usernameInput = document.getElementById('username');
const submitbutton = document.getElementById('submitbutton')

//disable submit until avatar is chosen 
submitbutton.disabled = true;

//avatar selection

avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        //remove previous selection
        avatars.forEach(a => a.classList.remove('selected'));
        avatar.classList.add('selected');

        //get image inside clicked avatar
        const img = avatar.querySelector('img');

        // copy image into bottom bar
        if (img && selectedAvatarImg){
            selectedAvatarImg.src = img.src;
            selectedAvatarImg.style.display = 'block';
        }

        //store for next page
        sessionStorage.setItem('selectedAvatar', img.src);
    });
});


//generate username

function generateUsername(){

    const usernames = new Set();

    while (usernames.size < count) {
        const adj = adjectives[Math.floor(Math.random()* adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const number = Math.floor(Math.random() * 100);

        usernames.add(`${adj}${noun}${num}`);
    }

    return Array.from(usernames);


}

const name = generateUsername(200);
console.log(username);