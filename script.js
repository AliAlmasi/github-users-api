"use strict";

// function requestUserInfo(username) {
// 	if (username !== "") {
// 		return Promise.resolve(fetch(`https://api.github.com/users/${username}`));
// 	} else {
// 		console.error("username is empty");
// 		return false;
// 	}
// }

// data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgZmlsbD0iI2U5ZWNlZiIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMjQsMTI4YTk1Ljc2LDk1Ljc2LDAsMCwxLTMxLjgsNzEuMzdBNzIsNzIsMCwwLDAsMTI4LDE2MGE0MCw0MCwwLDEsMC00MC00MCw0MCw0MCwwLDAsMCw0MCw0MCw3Miw3MiwwLDAsMC02NC4yLDM5LjM3aDBBOTYsOTYsMCwxLDEsMjI0LDEyOFoiIG9wYWNpdHk9IjAuMiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjgsMjRBMTA0LDEwNCwwLDEsMCwyMzIsMTI4LDEwNC4xMSwxMDQuMTEsMCwwLDAsMTI4LDI0Wk03NC4wOCwxOTcuNWE2NCw2NCwwLDAsMSwxMDcuODQsMCw4Ny44Myw4Ny44MywwLDAsMS0xMDcuODQsMFpNOTYsMTIwYTMyLDMyLDAsMSwxLDMyLDMyQTMyLDMyLDAsMCwxLDk2LDEyMFptOTcuNzYsNjYuNDFhNzkuNjYsNzkuNjYsMCwwLDAtMzYuMDYtMjguNzUsNDgsNDgsMCwxLDAtNTkuNCwwLDc5LjY2LDc5LjY2LDAsMCwwLTM2LjA2LDI4Ljc1LDg4LDg4LDAsMSwxLDEzMS41MiwwWiI+PC9wYXRoPjwvc3ZnPg==

const elements = {
	profileBox: document.querySelector(".profile-box"),
	cardFullname: document.querySelector(".card-fullname"),
	cardUsername: document.querySelector(".card-username"),
	cardImg: document.querySelector(".card-img"),
	userLocation: document.querySelector(".user-location"),
	userBio: document.querySelector(".user-bio"),
	userCompany: document.querySelector(".user-company"),
	userLink: document.querySelector(".user-link"),
	userTwitter: document.querySelector(".user-twitter"),
	userRepos: document.querySelector(".user-repos"),
	userGists: document.querySelector(".user-gists"),
	userFollowers: document.querySelector(".user-followers"),
	userFollowings: document.querySelector(".user-followings")
};

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		elements.profileBox.style.display = "block";
	}, 1500);
});
