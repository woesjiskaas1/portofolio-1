const element = document.getElementById("landing");
const visible = document.getElementById('visible');
const house = document.getElementById(`cardhouse`);

document.getElementById("projects").addEventListener("click", () => {
    console.log(`hi`);
    document.getElementById("projects").scrollIntoView({
        behavior: 'smooth',   // or 'auto' for instant jump
        block: 'end'        // 'center' or 'end' for different alignment
    });

});


jsonOphalen()








const logPercentageSeen = () => {
    const navbar = document.querySelector(".landing-navbar")
    if (percentageSeen() >= 95) {
        console.log(`hi`);

        if (navbar.classList != "moving") {
            document.querySelector(".landing-navbar").classList.remove("normal");
            document.querySelector(".landing-navbar").classList.add("moving");
        }
    } else {
        console.log(`hi2`);
        // console.log(percentageSeen());
        if (navbar.classList != "normal") {
            document.querySelector(".landing-navbar").classList.remove("moving");
            document.querySelector(".landing-navbar").classList.add("normal");
        }
    }
}

window.addEventListener('scroll', logPercentageSeen);

const percentageSeen = () => {
    // Get the relevant measurements and positions
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const elementOffsetTop = element.offsetTop;
    const elementHeight = element.offsetHeight;

    // Calculate percentage of the element that's been seen
    const distance = (scrollTop + viewportHeight) - elementOffsetTop;
    const percentage = Math.round(distance / ((viewportHeight + elementHeight) / 100));
    console.log(percentage);
    
    // Restrict the range to between 0 and 100
    return Math.min(100, Math.max(0, percentage));

}

// card
// showContent();

async function jsonOphalen() {
    fetch("./json/projecten.json")
        .then((data) => data.json())
        .then((data) => {
            showContent(data)
            showingblog(data.blog)
        })
        .catch(error => console.error(error), console.log(`error`),
        );
}

function showContent(data) {
    for (const element of data.projecten) {
        // console.log(element);
        let temp = document.getElementById("cardTemplate");
        let clone = temp.content.cloneNode(true);
        for (const key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
                const innerelement = element[key];
                // console.log(`key: ${key} \nvalue: ${innerelement}`);
                if (key != "details") {
                    if (key === "img") {
                        clone.getElementById(key).src = innerelement
                    } else {
                        clone.getElementById(key).innerText = innerelement
                    }



                }
            }
        }
        clone.querySelector(".card").addEventListener("click", () => {
            showingmodal(element.details)
        })
        house.appendChild(clone)
    }

};

function showingmodal(data) {
    console.log(data);
    document.getElementById('modal').classList.toggle('close');
    let temp = document.getElementById("content-template");
    let clone = temp.content.cloneNode(true);


    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const imglocation = clone.querySelector('.content-left')
            const element = data[key];
            console.log(key);
            if (key != "talen") {
                if (key != "img") {
                    console.log(`content-${key}`);

                    clone.querySelector(`#content-${key}`).innerText = element;
                    if (key === "repo") {
                        clone.querySelector(`#content-${key}`).href = element;
                    }
                } else if (key === "img") {
                    if (Array.isArray(element)) {
                        const slideContainer = clone.getElementById('slideshow-container')
                        const dots = clone.getElementById('dots')
                        element.forEach((url, i) => {
                            const slideContents = document.createElement('div')
                            slideContents.className = "mySlides fade";
                            slideContents.innerHTML = `
                        <div class="numbertext">${i + 1} / ${element.length}</div>
                        <img src="./img/${url}" style="width:100%">
                        <div class="text">${data.title || ""}</div>
                    `;
                            slideContainer.appendChild(slideContents);
                            const dot = document.createElement('span')
                            dot.classList.add('dot')
                            dot.addEventListener('click', () => {
                                currentSlide(i + 1)
                            });
                            dots.appendChild(dot)
                        });

                    } else {
                        console.log(element);

                        imglocation.innerHTML = `
                        <img src="./img/${element}" alt="${data.title || `no title`} genereerd">
                        `
                    }

                }

            } else if (key === "talen") {
                const taalcontainer = clone.getElementById('content-talen');
                for (const taal of data.talen) {
                    const taalimg = document.createElement('img');
                    taalimg.src = taal;
                    taalimg.classList.add("taalimg");
                    taalcontainer.appendChild(taalimg);
                }
            };
        }
    }
    document.getElementById('modal').appendChild(clone);
    +   // initialize slideshow for new modal content
        showSlides(1);
}
// =================================closing===================================
const modal = document.getElementById("modal");

// close when clicking outside content
window.addEventListener("click", function (e) {
    if (e.target === modal) {
        document.getElementById('modal').classList.toggle('close');
        modal.innerHTML = "";
    }
});


// === slideshow functions (moved out of template) ===
let slideIndex = 1;

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;        // <-- safeguard
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
// === end slideshow functions ===


// ----------------------------------------------------blog--------------------------------------
function showingblog(data) {
    let temp = document.getElementById("blog-post-template");
    for (const element of data) {
        let clone = temp.content.cloneNode(true);
        for (const key in element) {
            if (!Object.hasOwn(element, key)) continue;
            const content = element[key];
            const HTMLSomething = clone.getElementById(`blog-${key}`)
            if (HTMLSomething instanceof HTMLImageElement) {
                HTMLSomething.src = `./img/${content}`
            } else {
                HTMLSomething.innerText = content
            }

        }
        document.getElementById('blog-cardhouse').appendChild(clone)
    }


}


// -----------------------------------responsive navbar--------------------------------
console.log(document.querySelector(".left-navbar"));

function movingthings() {
    const lefty = document.querySelector(".left-navbar")
    for (const el of lefty) {
        console.log(el);

    }
}

function responsiveNavbar() {
    const nav = document.querySelector('.right-navbar')
    console.log(nav.classList);
    
    if (nav.classList != "right-navbar open") {
        nav.classList.add("open");
        nav.classList.remove("closed");
    } else {
        nav.classList.remove("open");
        nav.classList.add("closed");
    }
}