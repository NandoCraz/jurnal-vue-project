<template>
  <div id="new-jurnal" class="mb-5">
    <div class="card">
      <div class="card-header">Buat Jurnal</div>
      <div class="card-body">
        <div class="row">
          <form @submit.prevent="saveJurnal" class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="jurnal_id" class="form-label">Jurnal ID</label>
                  <input type="text" class="form-control" id="jurnal_id" :value="jurnals.length + 1" disabled readonly />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="headline" class="form-label">Headline</label>
                  <input type="text" class="form-control" id="headline" v-model="headline" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_all" class="form-label">Lead All</label>
                  <input type="text" class="form-control" id="lead_all" v-model="lead_all" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_why" class="form-label">Lead Why</label>
                  <input type="text" class="form-control" id="lead_why" v-model="lead_why" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_what" class="form-label">Lead What</label>
                  <input type="text" class="form-control" id="lead_what" v-model="lead_what" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_when" class="form-label">Lead When</label>
                  <input type="text" class="form-control" id="lead_when" v-model="lead_when" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_where" class="form-label">Lead Where</label>
                  <input type="text" class="form-control" id="lead_where" v-model="lead_where" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_who" class="form-label">Lead Who</label>
                  <input type="text" class="form-control" id="lead_who" v-model="lead_who" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="lead_how" class="form-label">Lead How</label>
                  <input type="text" class="form-control" id="lead_how" v-model="lead_how" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="closing" class="form-label">Closing</label>
                  <input type="text" class="form-control" id="closing" v-model="closing" required />
                </div>
              </div>
              <div class="col-md-12">
                <label for="body" class="form-label">Body</label>
                <textarea id="body" class="form-control" v-model="body" style="resize: none"></textarea>
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
  name: "new-jurnal",
  data() {
    return {
      jurnals: [],
      headline: null,
      lead_all: null,
      lead_why: null,
      lead_how: null,
      lead_what: null,
      lead_when: null,
      lead_where: null,
      lead_who: null,
      closing: null,
      body: null,
    };
  },
  created() {
    db.collection("jurnals")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.jurnals.push(doc.data());
        });
      });
  },
  methods: {
    saveJurnal() {
      db.collection("jurnals")
        .add({
          jurnal_id: String(this.jurnals.length + 1),
          headline: this.headline,
          lead_all: this.lead_all,
          lead_why: this.lead_why,
          lead_how: this.lead_how,
          lead_what: this.lead_what,
          lead_when: this.lead_when,
          lead_where: this.lead_where,
          lead_who: this.lead_who,
          closing: this.closing,
          body: this.body,
          created_at: String(new Date()),
        })
        .then(() => {
          alert("Jurnal berhasil dibuat!");
          this.$router.push({ name: "Jurnals" });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
  },
};
</script>
