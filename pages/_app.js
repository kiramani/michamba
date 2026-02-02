async function searchJobs() {
  const what = document.getElementById("what").value;
  const where = document.getElementById("where").value;
  const remote = document.getElementById("remote").value;

  const res = await fetch(`/.netlify/functions/jobs?what=${what}&where=${where}&remote=${remote}`);
  const data = await res.json();

  const container = document.getElementById("jobs");
  container.innerHTML = "";

  data.forEach(job => {
    container.innerHTML += `
      <div class="job">
        <h3>${job.title}</h3>
        <p><strong>Empresa:</strong> ${job.company}</p>
        <p><strong>Ubicación:</strong> ${job.location}</p>
        <p><strong>Salario:</strong> ${job.salary}</p>
        <p><strong>Tipo:</strong> ${job.type}</p>
        <a class="apply" href="${job.url}" target="_blank">Postular</a>
      </div>
    `;
  });
}
