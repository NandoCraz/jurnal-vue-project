<template>
  <div id="edit-jurnal">
    <div class="card">
      <div class="card-header">Edit Jurnal</div>
      <div class="card-body">
        <div class="row">
          <form @submit.prevent="updateJurnal" class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="jurnal_id" class="form-label">Jurnal ID</label>
                  <input type="text" class="form-control" id="jurnal_id" :value="jurnal.jurnal_id" disabled readonly />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="headline" class="form-label">Headline</label>
                  <input type="text" class="form-control" id="headline" v-model="jurnal.headline" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_all" class="form-label">Lead All</label>
                  <input type="text" class="form-control" id="lead_all" v-model="jurnal.lead_all" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_why" class="form-label">Lead Why</label>
                  <input type="text" class="form-control" id="lead_why" v-model="jurnal.lead_why" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_what" class="form-label">Lead What</label>
                  <input type="text" class="form-control" id="lead_what" v-model="jurnal.lead_what" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_when" class="form-label">Lead When</label>
                  <input type="text" class="form-control" id="lead_when" v-model="jurnal.lead_when" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_where" class="form-label">Lead Where</label>
                  <input type="text" class="form-control" id="lead_where" v-model="jurnal.lead_where" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_who" class="form-label">Lead Who</label>
                  <input type="text" class="form-control" id="lead_who" v-model="jurnal.lead_who" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_how" class="form-label">Lead How</label>
                  <input type="text" class="form-control" id="lead_how" v-model="jurnal.lead_how" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="closing" class="form-label">Closing</label>
                  <input type="text" class="form-control" id="closing" v-model="jurnal.closing" />
                </div>
              </div>
              <div class="col-md-12">
                <label for="body" class="form-label">Body</label>
                <textarea id="body" class="form-control" v-model="jurnal.body" style="resize: none; height: 200px"></textarea>
              </div>
            </div>
            <div class="col-md-12 text-end mt-4">
              <button type="submit" class="btn btn-success btn-sm me-3">Simpan</button>
              <router-link to="/jurnals" class="btn btn-danger btn-sm">Batal</router-link>
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
  name: "edit-jurnal",
  data() {
    return {
      jurnal: {
        jurnal_id: null,
        headline: null,
        lead_all: null,
        lead_why: null,
        lead_how: null,
        lead_what: null,
        lead_when: null,
        lead_where: null,
        lead_who: null,
        body: null,
        closing: null,
        created_at: null,
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("jurnals")
      .where("jurnal_id", "==", to.params.jurnal_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.jurnal = doc.data();
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      db.collection("jurnals")
        .where("jurnal_id", "==", this.$route.params.jurnal_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.jurnal = doc.data();
          });
        });
    },

    updateJurnal() {
      db.collection("jurnals")
        .where("jurnal_id", "==", this.$route.params.jurnal_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update(this.jurnal).then(() => {
              alert("Jurnal berhasil diperbarui!");
              this.$router.push({ name: "Jurnals" });
            });
          });
        });
    },
  },
};
</script>
