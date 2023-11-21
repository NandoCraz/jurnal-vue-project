<template>
  <Navbar />
  <div class="container mt-5">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/partials/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
