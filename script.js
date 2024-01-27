"use strict";

const defaultPFP =
	"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgZmlsbD0iI2U5ZWNlZiIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMjQsMTI4YTk1Ljc2LDk1Ljc2LDAsMCwxLTMxLjgsNzEuMzdBNzIsNzIsMCwwLDAsMTI4LDE2MGE0MCw0MCwwLDEsMC00MC00MCw0MCw0MCwwLDAsMCw0MCw0MCw3Miw3MiwwLDAsMC02NC4yLDM5LjM3aDBBOTYsOTYsMCwxLDEsMjI0LDEyOFoiIG9wYWNpdHk9IjAuMiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjgsMjRBMTA0LDEwNCwwLDEsMCwyMzIsMTI4LDEwNC4xMSwxMDQuMTEsMCwwLDAsMTI4LDI0Wk03NC4wOCwxOTcuNWE2NCw2NCwwLDAsMSwxMDcuODQsMCw4Ny44Myw4Ny44MywwLDAsMS0xMDcuODQsMFpNOTYsMTIwYTMyLDMyLDAsMSwxLDMyLDMyQTMyLDMyLDAsMCwxLDk2LDEyMFptOTcuNzYsNjYuNDFhNzkuNjYsNzkuNjYsMCwwLDAtMzYuMDYtMjguNzUsNDgsNDgsMCwxLDAtNTkuNCwwLDc5LjY2LDc5LjY2LDAsMCwwLTM2LjA2LDI4Ljc1LDg4LDg4LDAsMSwxLDEzMS41MiwwWiI+PC9wYXRoPjwvc3ZnPg==";

const elements = {
	usernameInput: document.querySelector("#userName-input"),
	enterBtn: document.querySelector("#btn-Search"),
	profileBox: document.querySelector(".profile-box"),
	cardname: document.querySelector(".card-name"),
	cardFullname: document.querySelector(".card-fullname"),
	cardUsername: document.querySelector(".card-username"),
	cardImg: document.querySelector(".card-img"),
	userLocation: document.querySelector(".user-location"),
	userBio: document.querySelector(".user-bio"),
	userCompany: document.querySelector(".user-company"),
	companies: document.querySelector("#companies"),
	userLink: document.querySelector(".user-link"),
	userTwitter: document.querySelector(".user-twitter"),
	userRepos: document.querySelector(".user-repos"),
	userGists: document.querySelector(".user-gists"),
	userFollowers: document.querySelector(".user-followers"),
	userFollowings: document.querySelector(".user-followings"),
	errorBox: document.querySelector(`.error-box`),
	errorText: document.querySelector("#error-text")
};

function checkStatus(response) {
	if (!response.ok) {
		const responseError = {
			statusText: response.statusText,
			status: response.status
		};
		throw responseError;
	} else if (response.ok) {
		return response.json();
	}
}

function httpErrorCheck(error) {
	switch (error.status) {
		case 400:
			elements.errorText.textContent = "400 Bad Request, try again";
			break;
		case 403:
			elements.errorText.textContent = "403 Forbidden Request, try again";
			break;
		case 404:
			elements.errorText.textContent = "404 User Not Found, try again";
			break;
		case 500:
			elements.errorText.textContent = "Internal Server Error, try again";
			break;
		default:
			elements.errorText.textContent = "Unhandled error, check the console";
			console.log(`Unhandled error code: ${error.status}`);
			console.log(error);
			break;
	}
}

function requestUserInfo(username) {
	if (username.trim() === "none") {
		console.error("username is empty");
		return false;
	} else {
		fetch(`https://api.github.com/users/${username}`)
			.then(checkStatus)
			.then(function (data) {
				loadData(data);
			})
			.catch(function (error) {
				httpErrorCheck(error);
				elements.profileBox.style.display = "none";
				elements.errorBox.style.display = "block";
			});
	}
}

function loadData(data) {
	const {
		name,
		login,
		avatar_url,
		html_url,
		location,
		bio,
		company,
		blog,
		twitter_username,
		public_repos,
		public_gists,
		followers,
		following
	} = data;

	if (avatar_url) {
		elements.cardImg.src = avatar_url;
	} else {
		elements.cardImg.src = defaultPFP;
	}
	elements.userFollowings.textContent = `${following}`;
	elements.userFollowers.textContent = `${followers}`;
	elements.userRepos.textContent = `${public_repos}`;
	elements.userGists.textContent = `${public_gists}`;
	elements.cardUsername.textContent = `@${login}`;
	elements.cardname.href = html_url;
	elements.userFollowers.href = `https://github.com/${login}?tab=followers`;
	elements.userFollowings.href = `https://github.com/${login}?tab=following`;
	elements.userRepos.href = `https://github.com/${login}?tab=repositories`;
	elements.userGists.href = `https://gist.github.com/${login}`;
	nameValidCheck(name);
	bioValidCheck(bio);
	linkValidCheck(blog);
	elements.companies.innerHTML = "";
	locationValidCheck(location);
	companyValidCheck(company);
	twitterValidCheck(twitter_username);
	elements.errorBox.style.display = "none";
	elements.profileBox.style.display = "block";
}

function bioValidCheck(bio) {
	if (bio) {
		document.querySelector("#bio").style.display = "block";
		elements.userBio.textContent = `${bio}`;
	} else {
		document.querySelector("#bio").style.display = "none";
	}
}

function nameValidCheck(name) {
	if (name) {
		elements.cardFullname.style.display = "block";
		elements.cardFullname.textContent = `${name}`;
	} else {
		elements.cardFullname.style.display = "none";
	}
}

function linkValidCheck(blog) {
	if (blog) {
		document.querySelector("#link").style.display = "block";
		elements.userLink.textContent = `${blog}`;
		if (blog.includes("http")) {
			elements.userLink.href = `${blog}`;
		} else {
			elements.userLink.href = `http://${blog}`;
		}
	} else {
		document.querySelector("#link").style.display = "none";
	}
}

function locationValidCheck(location) {
	if (location) {
		document.querySelector("#location").style.display = "block";
		elements.userLocation.textContent = `${location}`;
	} else {
		document.querySelector("#location").style.display = "none";
	}
}

function companyValidCheck(company) {
	if (company) {
		document.querySelector("#companies").style.display = "block";
		if (company.includes("@")) {
			const companyArray = company.trim().replace(/,|, /g, "").split(" ");
			companyArray.forEach((element) => {
				elements.companies.innerHTML += `<a class="user-stats user-company" href="https://github.com/${
					element.split("@")[1]
				}" target="_blank">${element}</a>&MediumSpace;`;
			});
		} else {
			const companyArray = company.trim().replace(/,|, /g, "").split(" ");
			companyArray.forEach((element) => {
				elements.companies.innerHTML += `Company:&MediumSpace;<span class="user-stats user-company">${element}</span>&MediumSpace;`;
			});
		}
	} else {
		document.querySelector("#companies").style.display = "none";
	}
}

function twitterValidCheck(twitter_username) {
	if (twitter_username) {
		document.querySelector("#twitter").style.display = "block";
		elements.userTwitter.textContent = `@${twitter_username}`;
		elements.userTwitter.href = `https://twitter.com/${twitter_username}`;
	} else {
		document.querySelector("#twitter").style.display = "none";
	}
}

elements.usernameInput.addEventListener("keyup", function onEvent(e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		requestUserInfo(elements.usernameInput.value);
	}
});

elements.enterBtn.addEventListener("click", () => {
	requestUserInfo(elements.usernameInput.value);
});
