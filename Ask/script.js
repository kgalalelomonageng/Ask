function openForm(type) {
  const formTitle = document.getElementById("form-title");
  const eventField = document.getElementById("eventType");

  if (type === "booking") {
    formTitle.textContent = "Book DJ ASK";
    eventField.placeholder = "Event Type";
  } else {
    formTitle.textContent = "Request a Quotation";
    eventField.placeholder = "Your Event / Service Needed";
  }

  document.getElementById("booking").scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildWhatsAppMessage(formData) {
  const name = formData.get("name") || "Guest";
  const email = formData.get("email") || "Not provided";
  const phone = formData.get("phone") || "Not provided";
  const eventType = formData.get("eventType") || "Not provided";
  const date = formData.get("date") || "Not provided";
  const venue = formData.get("venue") || "Not provided";
  const notes = formData.get("notes") || "No notes";

  return encodeURIComponent(
    `Hi DJ ASK, my name is ${name}. I would like to enquire about a ${eventType} event on ${date}. Venue: ${venue}. Email: ${email}. Phone: ${phone}. Notes: ${notes}`
  );
}

document.getElementById("djForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const button = form.querySelector("button[type='submit']");
  const originalText = button.textContent;

  button.textContent = "Sending...";
  button.disabled = true;

  const whatsappUrl = `https://wa.me/27670467274?text=${buildWhatsAppMessage(formData)}`;
  const mailtoUrl = `mailto:kgalalelo.monageng1@gmail.com?subject=${encodeURIComponent("Event Enquiry")}&body=${encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\nPhone: ${formData.get("phone")}\nEvent Type: ${formData.get("eventType")}\nDate: ${formData.get("date")}\nVenue: ${formData.get("venue")}\n\nNotes:\n${formData.get("notes")}`
  )}`;

  window.open(whatsappUrl, "_blank");
  window.location.href = mailtoUrl;

  setTimeout(() => {
    alert("Thank you! DJ ASK will contact you shortly.");
    form.reset();
    button.textContent = originalText;
    button.disabled = false;
  }, 500);
});
