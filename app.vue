<template>
  <div>
    <h1>Web Status Checker</h1>

    <!-- Lista fija de URLs -->
    <ul>
      <li v-for="(site, index) in sites" :key="index">
        <span>{{ site.url }} - </span>
        <span v-if="site.status === 'checking'">Verificando...</span>
        <span v-else-if="site.status === 'online'" style="color: green"
          >Online</span
        >
        <span v-else style="color: red">Offline</span>
        <button @click="checkStatus(index)">Revisar de nuevo</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sites = ref([
  { url: 'https://erp1.vylaris.online', status: 'checking' },
  { url: 'https://astuc.org', status: 'checking' },
  { url: 'https://app.gestoflex.com', status: 'checking' },
  { url: 'https://tst.gestoflex.com', status: 'checking' },
  { url: 'https://mdsmindset.com', status: 'checking' },
]);

// Función para verificar el estado de una URL a través del endpoint
const checkStatus = async (index) => {
  sites.value[index].status = 'checking';
  try {
    const response = await fetch(
      `/api/check-status?url=${encodeURIComponent(sites.value[index].url)}`
    );
    const data = await response.json();
    sites.value[index].status = data.status;
  } catch (error) {
    sites.value[index].status = 'offline';
  }
};

// Verificar todas las URLs al cargar
onMounted(() => {
  sites.value.forEach((_, index) => {
    checkStatus(index);
  });
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 2rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 1rem;
}
button {
  margin-left: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
