const element = document.getElementById("landing");
const visible = document.getElementById('visible');

const logPercentageSeen = () => {
    if (percentageSeen() >= 85) {
        console.log(`hi`);
        element.classList.replace("landing-page", "hidden-landing-page")
    } else {
        console.log(percentageSeen());
         element.classList.replace("hidden-landing-page", "landing-page")
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

    // Restrict the range to between 0 and 100
    return Math.min(100, Math.max(0, percentage));

}