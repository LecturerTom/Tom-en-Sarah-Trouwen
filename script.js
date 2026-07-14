
const config = window.WEDDING_CONFIG || {};

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__weddingToastTimer);
  window.__weddingToastTimer = setTimeout(
    () => toast.classList.remove("show"),
    4200
  );
}

document.querySelectorAll("[data-config-link]").forEach(link => {
  const key = link.dataset.configLink;
  const url = config[key];

  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.href = "#";
    link.addEventListener("click", event => {
      event.preventDefault();
      showToast(
        "Deze link wordt geactiveerd zodra Tom en Sarah de externe dienst hebben gekoppeld."
      );
    });
  }
});

const contactBlock = document.querySelector("[data-contact-block]");
if (contactBlock) {
  const details = [];

  if (config.contactPhoneTom) {
    details.push(
      `<strong>Tom</strong>: <a href="tel:${config.contactPhoneTom.replace(/\s/g, "")}">${config.contactPhoneTom}</a>`
    );
  }
  if (config.contactPhoneSarah) {
    details.push(
      `<strong>Sarah</strong>: <a href="tel:${config.contactPhoneSarah.replace(/\s/g, "")}">${config.contactPhoneSarah}</a>`
    );
  }
  if (config.contactEmail) {
    details.push(`<a href="mailto:${config.contactEmail}">${config.contactEmail}</a>`);
  }

  contactBlock.innerHTML = details.length
    ? details.join("<br>")
    : "Contactgegevens worden later toegevoegd.";
}

const countdown = document.querySelector("[data-countdown]");
if (countdown) {
  const target = new Date("2027-03-27T15:30:00+01:00").getTime();
  const fields = {
    days: countdown.querySelector("[data-days]"),
    hours: countdown.querySelector("[data-hours]"),
    minutes: countdown.querySelector("[data-minutes]"),
    seconds: countdown.querySelector("[data-seconds]")
  };

  function updateCountdown() {
    const remaining = Math.max(0, target - Date.now());

    fields.days.textContent = Math.floor(remaining / 86400000);
    fields.hours.textContent = String(
      Math.floor((remaining % 86400000) / 3600000)
    ).padStart(2, "0");
    fields.minutes.textContent = String(
      Math.floor((remaining % 3600000) / 60000)
    ).padStart(2, "0");
    fields.seconds.textContent = String(
      Math.floor((remaining % 60000) / 1000)
    ).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}



const rsvpForm = document.querySelector("#rsvp-form");
if (rsvpForm) {
  const inviteNameInput = rsvpForm.querySelector("#invite-name");
  const emailInput = rsvpForm.querySelector("#email");
  const subjectInput = rsvpForm.querySelector("#rsvp-subject");
  const replyToInput = rsvpForm.querySelector("#rsvp-replyto");
  const sourceUrlInput = rsvpForm.querySelector("#rsvp-source-url");
  const nextUrlInput = rsvpForm.querySelector("#rsvp-next-url");
  const submitButton = rsvpForm.querySelector('button[type="submit"]');
  const localTestNote = rsvpForm.querySelector(".rsvp-test-note");

  function cleanSubjectPart(value) {
    return value
      .replace(/[\r\n]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100);
  }

  function updateMessageFields() {
    const inviteName = cleanSubjectPart(inviteNameInput?.value || "");
    subjectInput.value = inviteName ? `RSVP - ${inviteName}` : "RSVP";
    replyToInput.value = emailInput?.value.trim() || "";
    sourceUrlInput.value = window.location.href;
  }

  function configureReturnPage() {
    const isHosted =
      window.location.protocol === "http:" ||
      window.location.protocol === "https:";

    if (isHosted) {
      nextUrlInput.value =
        new URL("rsvp-bedankt.html", window.location.href).href;
      nextUrlInput.disabled = false;
    } else {
      nextUrlInput.disabled = true;
      if (localTestNote) localTestNote.hidden = false;
    }
  }

  inviteNameInput?.addEventListener("input", updateMessageFields);
  emailInput?.addEventListener("input", updateMessageFields);

  configureReturnPage();
  updateMessageFields();

  rsvpForm.addEventListener("submit", event => {
    if (!rsvpForm.reportValidity()) {
      event.preventDefault();
      return;
    }

    updateMessageFields();

    submitButton.disabled = true;
    submitButton.textContent = "Bezig met verzenden…";
  });
}

// Chronological photo lightbox for Ons verhaal.
const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-image]"));

if (galleryButtons.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "story-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Foto bekijken">
      <button class="lightbox-close" type="button" aria-label="Sluiten">×</button>
      <button class="lightbox-prev" type="button" aria-label="Vorige foto">‹</button>
      <div class="lightbox-image-wrap"><img class="lightbox-image" alt=""></div>
      <button class="lightbox-next" type="button" aria-label="Volgende foto">›</button>
      <div class="lightbox-counter" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector(".lightbox-image");
  const counter = lightbox.querySelector(".lightbox-counter");
  const close = lightbox.querySelector(".lightbox-close");
  const previous = lightbox.querySelector(".lightbox-prev");
  const next = lightbox.querySelector(".lightbox-next");
  let current = 0;
  let previousFocus = null;

  function render() {
    const button = galleryButtons[current];
    image.src = button.dataset.galleryImage;
    image.alt = button.dataset.galleryAlt || "Foto uit ons verhaal";
    counter.textContent = `${current + 1} / ${galleryButtons.length}`;
  }

  function open(index) {
    current = index;
    previousFocus = document.activeElement;
    render();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    close.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    image.removeAttribute("src");
    if (previousFocus) previousFocus.focus();
  }

  function showPrevious() {
    current = (current - 1 + galleryButtons.length) % galleryButtons.length;
    render();
  }

  function showNext() {
    current = (current + 1) % galleryButtons.length;
    render();
  }

  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => open(index));
  });

  close.addEventListener("click", closeLightbox);
  previous.addEventListener("click", showPrevious);
  next.addEventListener("click", showNext);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
  });
}
