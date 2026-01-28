document.addEventListener("DOMContentLoaded", () => {
    const avatarImg = document.getElementById("selectedAvatarImg");
    const avatarWrap = document.querySelector(".avatar-wrap");

    const savedAvatar = sessionStorage.getItem("selectedAvatar");
    const savedColor = sessionStorage.getItem("avatarBgColor");

    console.log("Avatar from session:", savedAvatar);

    if(savedAvatar && avatarImg) {
        avatarImg.src = savedAvatar;
        avatarImg.style.display = "block";
    }

    if(savedColor && avatarWrap) {
        avatarWrap.style.backgroundColor = savedColor;
    }
});


