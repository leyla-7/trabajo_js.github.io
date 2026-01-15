document.addEventListener("DOMContentLoaded", function () {
  const empresaCoords = [40.421, -3.682];

  const map = L.map("map").setView(empresaCoords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker(empresaCoords)
    .addTo(map)
    .bindPopup("<b>BrillaPro Limpiezas</b><br>Calle de Alcalá 123, Madrid")
    .openPopup();

  let routingControl;
  let userMarker;

  function dibujarRutaDesde(origenCoords) {
    if (routingControl) map.removeControl(routingControl);

    routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origenCoords[0], origenCoords[1]),
        L.latLng(empresaCoords[0], empresaCoords[1]),
      ],
      language: "es",
      routeWhileDragging: false,
      addWaypoints: false,
    }).addTo(map);

    map.fitBounds([origenCoords, empresaCoords], { padding: [30, 30] });
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userCoords = [pos.coords.latitude, pos.coords.longitude];
        if (userMarker) map.removeLayer(userMarker);
        userMarker = L.marker(userCoords).addTo(map).bindPopup("Tu ubicación");

        dibujarRutaDesde(userCoords);
      },
      () => {

      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  const form = document.getElementById("ruta-formulario");
  const direccionInput = document.getElementById("direccion");

  if (form && direccionInput) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const direccion = direccionInput.value.trim();
      if (!direccion) return;

      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          direccion
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data || data.length === 0) {
            alert("No se encontró la dirección. Intenta otra vez.");
            return;
          }

          const userCoords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];

          if (userMarker) map.removeLayer(userMarker);
          userMarker = L.marker(userCoords).addTo(map).bindPopup("Tu ubicación");

          dibujarRutaDesde(userCoords);
        })
        .catch(() => {
          alert("Error al calcular la ruta. Intenta más tarde.");
        });
    });
  }
});
