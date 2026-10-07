const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (nav.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});



document.querySelectorAll(".navbar nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});



const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


document
    .querySelectorAll(
        ".skill-card, .project-card, .timeline-item, .about-box"
    )
    .forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "0.7s ease";

        observer.observe(element);

    });