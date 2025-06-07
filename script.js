// Theme toggle logic
    const btn = document.querySelector('.toggle-theme-btn');
    const body = document.body;
    // Load saved theme from localStorage
    if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light');
      btn.textContent = '🌞';
    }

    btn.addEventListener('click', () => {
      body.classList.toggle('light');
      if (body.classList.contains('light')) {
        btn.textContent = '🌞';
        localStorage.setItem('theme', 'light');
      } else {
        btn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
      }
    });

    // Simple contact form submission simulation
    function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (name.length < 2) {
        alert("Please enter a valid name (at least 2 characters).");
        return false;
      }
      if (!email.includes('@') || email.length < 5) {
        alert("Please enter a valid email address.");
        return false;
      }
      if (message.length < 5) {
        alert("Please enter a message of at least 5 characters.");
        return false;
      }

      alert(`Thank you, ${name}! Your message has been received.`);
      form.reset();
      return false;
    }
	
	
	
	
	
	const TELEGRAM_TOKEN = "";
  const CHAT_ID = "";

  function showStatus(message, isSuccess) {
    const statusBox = document.getElementById("formStatus");
    statusBox.textContent = message;
    statusBox.className = "form-status " + (isSuccess ? "success" : "error");
    statusBox.style.display = "block";
    setTimeout(() => {
      statusBox.style.display = "none";
    }, 5000);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all fields.", false);
      return false;
    }

    const text = `📩 New Contact Message:\n\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message: ${message}`;

    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          showStatus("✅ Message sent successfully!", true);
          document.getElementById("contactForm").reset();
        } else {
          showStatus("❌ Error sending message.", false);
          console.error(data);
        }
      })
      .catch((err) => {
        showStatus("⚠️ Network error.", false);
        console.error(err);
      });

    return false;
  }
  