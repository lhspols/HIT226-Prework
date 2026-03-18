function highlightHeadings() {
    const headings = document.querySelectorAll(".accordion");
    headings.forEach(h => h.style.backgroundColor = "#ffeb3b");
    alert("Headings highlighted!");
}

const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

console.log("UX prework page loaded");
