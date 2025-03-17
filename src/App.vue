<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const appointments = ref([]);

    // Fonction pour récupérer les rendez-vous depuis ton backend
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/odoo/appointments");
        appointments.value = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };

    onMounted(fetchAppointments); // Charge les données dès que le composant est monté

    return { appointments };
  },
};
</script>

<template>
  <div>
    <h1>📅 Rendez-vous Odoo</h1>
    <ul v-if="appointments.length">
      <li v-for="appointment in appointments" :key="appointment.id">
        <strong>{{ appointment.name }}</strong><br />
        🕒 De {{ new Date(appointment.start).toLocaleString() }} à {{ new Date(appointment.stop).toLocaleString() }}<br />
        👤 Client : {{ appointment.partner_id ? appointment.partner_id[1] : "Aucun" }}
      </li>
    </ul>
    <p v-else>Chargement des rendez-vous...</p>
  </div>
</template>