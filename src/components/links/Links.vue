<template>
  <div>
    <div class="card">
      <div class="card-header">Seluruh Link Jurnal</div>
      <div class="card-body">
        <router-link class="btn btn-success mb-5" to="/new-link">Tambah Link</router-link>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Alias</th>
                <th scope="col">URL</th>
                <th scope="col" class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="link in links" :key="link.id">
                <td>{{ link.id }}</td>
                <td>
                  {{ link.alias }}
                </td>
                <td>
                  {{ link.url.substring(0, 70) + "..." }}
                </td>
                <td class="text-center">
                  <router-link class="btn btn-sm btn-primary me-2" :to="{ name: 'Link Edit', params: { link_id: link.id } }">Edit</router-link>
                  <button class="btn btn-danger btn-sm" @click="deleteLink(link.id)">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "../firebase/firebaseInit";

export default {
  name: "links",
  data() {
    return {
      links: [],
    };
  },
  created() {
    db.collection("links")
      .orderBy("link_id", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.links.push({
            id: doc.data().link_id,
            alias: doc.data().alias,
            url: doc.data().link_url,
          });
        });
      });

    console.log(this.links);
  },
  methods: {
    deleteLink(link) {
      if (confirm("Apakah Anda yakin ingin menghapus link ini?")) {
        db.collection("links")
          .where("link_id", "==", link)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete().then(() => {
                alert("Link berhasil dihapus!");
                this.$router.push({ name: "Dashboard" });
              });
            });
          });
      }
    },
  },
};
</script>
