fetch("/data/data.xml")
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const home = data.querySelector("home");

    // Get data from XML
    const profilePhoto = home.querySelector("profilephoto").textContent;
    const name = home.querySelector("name").textContent;
    const tagline = home.querySelector("tagline").textContent;
    const location = home.querySelector("location").textContent;
    const facebook = home.querySelector("facebook").textContent;
    const instagram = home.querySelector("instagram").textContent;

    // Assign to HTML elements using IDs
    document.getElementById("profile-photo").src = profilePhoto;
    document.getElementById("name").textContent = name;
    document.getElementById("tagline").textContent = `"${tagline}"`;
    document.getElementById("location").innerHTML = `<i class="fas fa-map-marker-alt"></i> ${location}`;

    document.getElementById("social-links").innerHTML = `
            <a href="${facebook}" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="${instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
        `;

    // === PROJECTS section ===
    const projectNodes = data.querySelectorAll("projects project");
    const projectsGrid = document.getElementById("projects-grid");

    projectNodes.forEach(project => {
      const title = project.querySelector("title").textContent;
      const description = project.querySelector("description").textContent;
      const technologies = project.querySelector("technologies").textContent.split(", ");
      const link = project.querySelector("link").textContent;
      const image = project.querySelector("image").textContent;

      // Create project card HTML
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.innerHTML = `
                <img src="${image}" alt="Project Preview" class="project-image" />
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="tech-tags">
                    ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
                </div>
                <a href="${link}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            `;
      projectsGrid.appendChild(projectCard);
    });

    // === SKILLS section ===
    const skills = data.querySelector("skills");
    const technical = skills.querySelector("technical").textContent;
    const talents = skills.querySelector("talents").textContent;

    const skillsContainer = document.getElementById("skills-container");

    skillsContainer.innerHTML = `
            <div class="skill-category">
                <i class="fas fa-code skill-icon"></i>
                <h3>Technical Skills</h3>
                <p>${technical}</p>
            </div>
            <div class="skill-category">
                <i class="fas fa-music skill-icon"></i>
                <h3>Creative Talents</h3>
                <p>${talents}</p>
            </div>
        `;

    // === SERVICES Section ===
    const serviceNodes = data.querySelectorAll("services service");
    const servicesGrid = document.getElementById("services-grid");

    serviceNodes.forEach(service => {
      const name = service.querySelector("name").textContent;
      const description = service.querySelector("description").textContent;

      const serviceCard = document.createElement("div");
      serviceCard.classList.add("service-card");
      serviceCard.innerHTML = `
                <i class="fas fa-laptop-code service-icon"></i>
                <h3>${name}</h3>
                <p>${description}</p>
            `;
      servicesGrid.appendChild(serviceCard);
    });

    // === ORGANIZATIONS/EXPERIENCE Section ===
    const orgNodes = data.querySelectorAll("organizations organization");
    const experienceContainer = document.getElementById("experience-container");

    orgNodes.forEach(org => {
      const name = org.querySelector("name").textContent;
      const role = org.querySelector("role").textContent;
      const years = org.querySelector("years").textContent;

      // You can add a default description or fetch if available in XML (none in current XML)
      const description = "Active participation in community service and leadership development activities.";

      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.innerHTML = `
                <h3>${name}</h3>
                <p><strong>Role:</strong> ${role}</p>
                <p><strong>Years:</strong> ${years}</p>
                <p>${description}</p>
            `;
      experienceContainer.appendChild(projectCard);
    });

    //Testimonials

    const testimonialNodes = data.querySelectorAll("testimonials testimonial");
    const testimonialsContainer = document.getElementById("testimonials-container");

    testimonialNodes.forEach(testimonial => {
      const message = testimonial.querySelector("message").textContent;
      const name = testimonial.querySelector("name").textContent;
      const relationship = testimonial.querySelector("relationship").textContent;

      const card = document.createElement("div");
      card.classList.add("testimonial-card");
      card.innerHTML = `
        <p>"${message}"</p>
        <h4>- ${name} (${relationship})</h4>
      `;
      testimonialsContainer.appendChild(card);
    });

    //Contact

    const contact = data.querySelector("contact");
    const email = contact.querySelector("email").textContent.replace(/^your\.email:/, '').trim(); // remove prefix if any
    const phone = contact.querySelector("phone").textContent;

    const contactContainer = document.getElementById("contact-container");

    // Email Card
    const emailCard = document.createElement("div");
    emailCard.classList.add("contact-card");
    emailCard.innerHTML = `
      <i class="fas fa-envelope contact-icon"></i>
      <h3>Email</h3>
      <p>${email}</p>
    `;

    // Phone Card
    const phoneCard = document.createElement("div");
    phoneCard.classList.add("contact-card");
    phoneCard.innerHTML = `
      <i class="fas fa-phone contact-icon"></i>
      <h3>Phone</h3>
      <p>${phone}</p>
    `;

    contactContainer.appendChild(emailCard);
    contactContainer.appendChild(phoneCard);
  })
  .catch(err => console.error("Error loading XML:", err));
