<template>
  <div id="new-link" class="mb-5">
    <div class="card">
      <div class="card-header">Tambahkan Link</div>
      <div class="card-body">
        <div class="row">
          <form @submit.prevent="saveLink" class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="link_id" class="form-label">Link ID</label>
                  <input type="text" class="form-control" id="link_id" :value="links.length + 1" disabled readonly />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="url" class="form-label">URL</label>
                  <input type="text" class="form-control" id="url" v-model="url" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="alias" class="form-label">Alias</label>
                  <input type="text" class="form-control" id="alias" v-model="alias" required />
                </div>
              </div>
            </div>
            <div class="col-md-12 text-end mt-4">
              <button type="submit" class="btn btn-success btn-sm me-3">Simpan</button>
              <router-link to="/links" class="btn btn-danger btn-sm">Batal</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "../firebase/firebaseInit";

export default {
  name: "new-link",
  data() {
    return {
      links: [],
      alias: null,
      url: null,
    };
  },
  created() {
    db.collection("links")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.links.push(doc.data());
        });
      });
  },
  methods: {
    saveLink() {
      db.collection("links")
        .add({
          link_id: String(this.links.length + 1),
          link_url: this.url,
          alias: this.alias,
        })
        .then(() => {
          alert("Link berhasil ditambahkan!");
          this.$router.push({ name: "Links" });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
  },
};
</script>
