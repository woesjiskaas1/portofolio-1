const element = document.getElementById("landing");
const visible = document.getElementById('visible');

const logPercentageSeen = () => {
    console.log(percentageSeen());
    if (percentageSeen() >= 95) {
        console.log(`hi`);
        document.querySelector(".landing-navbar").style.position = "sticky"
        document.querySelector(".landing-navbar").style.top = "0px"
        document.querySelector(".landing-navbar").style.background = "linear-gradient(rgba(255, 255, 255, 0.43), rgba(255, 255, 255, 0))"

    } else {
        console.log(percentageSeen());
        document.querySelector(".landing-navbar").style.position = "absolute"
         document.querySelector(".landing-navbar").style.background = "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))"
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