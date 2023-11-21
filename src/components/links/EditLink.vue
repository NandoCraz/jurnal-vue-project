<template>
  <div id="update-link" class="mb-5">
    <div class="card">
      <div class="card-header">Edit Link</div>
      <div class="card-body">
        <div class="row">
          <form @submit.prevent="updateLink" class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="link_id" class="form-label">Link ID</label>
                  <input type="text" class="form-control" id="link_id" :value="link.link_id" disabled readonly />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="url" class="form-label">URL</label>
                  <input type="text" class="form-control" id="url" v-model="link.link_url" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="alias" class="form-label">Alias</label>
                  <input type="text" class="form-control" id="alias" v-model="link.alias" required />
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
  name: "edit-link",
  data() {
    return {
      link: {
        link_id: null,
        link_url: null,
        alias: null,
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("links")
      .where("link_id", "==", to.params.link_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.link = doc.data();
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      db.collection("links")
        .where("link_id", "==", this.$route.params.link_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.link = doc.data();
          });
        });
    },

    updateLink() {
      db.collection("links")
        .where("link_id", "==", this.$route.params.link_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update(this.link).then(() => {
              alert("Link berhasil diperbarui!");
              this.$router.push({ name: "Links" });
            });
          });
        });
    },
  },
};
</script>
