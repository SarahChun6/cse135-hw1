class ProjectCard extends HTMLElement {
    connectedCallback() {
        // Get attributes
        const name = this.getAttribute("name") || "Untitled Project";
        const imageSrc = this.getAttribute("image") || "placeholder.jpg";
        const description = this.getAttribute("description") || "No description provided.";
        const link = this.getAttribute("link") || "#";
        this.innerHTML = `
            <section class="project-card">
                <h2>${name}</h2>
                <img src="${imageSrc}" alt="Screenshot of ${name}" width="200" height= "150">
                <p>${description}</p>
                <a href="${link}" target="_blank">Learn more</a>
            </section>    
        `;

    }
}

// Define the custom element
customElements.define("project-card", ProjectCard);

function createProjCards(container, projects) {
    projects.forEach(project => {
        const projectCard = document.createElement("project-card");
        projectCard.setAttribute("name", project.name);
        projectCard.setAttribute("image", project.image); // Ensure consistent naming
        projectCard.setAttribute("description", project.description);
        projectCard.setAttribute("link", project.link);

        container.appendChild(projectCard);
    });
}

/*
fetch("projects.json")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("projects", JSON.stringify(data));
        console.log("Projects stored in localStorage");

        const container = document.getElementById("projects-container");
        createProjCards(container, data);
    })
    .catch(error => console.error("Error loading JSON:", error));
*/

document.getElementById("load-local").addEventListener("click", () => {
    const projectsContainer = document.getElementById("projects-container");
    console.log("Projects loaded from localStorage");

    projectsContainer.innerHTML = ""; // clear existing content

    const localProjects = JSON.parse(localStorage.getItem("projects")) || [];
    createProjCards(projectsContainer, localProjects);
});

document.getElementById("load-remote").addEventListener("click", () => {
    const projectsContainer = document.getElementById("projects-container");
    console.log("Fetching projects from remote server...");

    projectsContainer.innerHTML = ""; // clear existing content

    fetch("https://my-json-server.typicode.com/SarahChun6/portfolio/projects")
    .then(response => response.json())
    .then(data => {
        // Store fetched data in localStorage
        localStorage.setItem("projects", JSON.stringify(data));
        console.log("Projects fetched from remote and stored locally.");

        // Generate project cards
        createProjCards(projectsContainer, data);
    })
    .catch(error => console.error("Error loading remote JSON:", error));

});