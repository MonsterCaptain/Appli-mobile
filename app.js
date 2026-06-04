function saveEntry() {
  const entry = {
    date: new Date().toLocaleString(),
    humeur: document.getElementById("humeur").value,
    libido: document.getElementById("libido").value,
    fatigue: document.getElementById("fatigue").value
  };

  let data = JSON.parse(localStorage.getItem("data") || "[]");
  data.push(entry);
  localStorage.setItem("data", JSON.stringify(data));

  alert("Enregistré");
}

function renderHistory() {
  const list = document.getElementById("list");
  const data = JSON.parse(localStorage.getItem("data") || "[]");

  list.innerHTML = data.reverse().map(d => `
    <div style="padding:10px;border:1px solid #ddd;margin-bottom:10px">
      <b>${d.date}</b><br>
      Humeur: ${d.humeur} | Libido: ${d.libido} | Fatigue: ${d.fatigue}
    </div>
  `).join("");
}

function drawChart() {
  const canvas = document.getElementById("chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = JSON.parse(localStorage.getItem("data") || "[]");

  ctx.clearRect(0,0,300,200);

  ctx.beginPath();
  ctx.strokeStyle = "purple";

  data.slice(-10).forEach((d,i) => {
    const y = 200 - d.humeur * 15;
    const x = i * 30;

    if (i === 0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  });

  ctx.stroke();
}

function clearData() {
  localStorage.removeItem("data");
  alert("Données supprimées");
}

function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
}
