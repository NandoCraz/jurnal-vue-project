<template>
  <div>
    <div class="card">
      <div class="card-header">Seluruh Jurnal</div>
      <div class="card-body">
        <router-link class="btn btn-success mb-5" to="/new-jurnal">Tambah Jurnal</router-link>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Headline</th>
                <th scope="col" class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="jurnal in jurnals" :key="jurnal.id">
                <td>{{ jurnal.id }}</td>
                <td>{{ jurnal.headline }}</td>
                <td class="text-center">
                  <router-link class="btn btn-sm btn-primary me-2" :to="{ name: 'Jurnal Edit', params: { jurnal_id: jurnal.id } }">Edit</router-link>
                  <button class="btn btn-danger btn-sm me-2" @click="deleteJurnal(jurnal.id)">Hapus</button>
                  <router-link class="btn btn-sm btn-secondary" :to="{ name: 'Jurnal Detail', params: { jurnal_id: jurnal.id } }">Detail</router-link>
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
  name: "jurnals",
  data() {
    return {
      jurnals: [],
    };
  },
  created() {
    db.collection("jurnals")
      .orderBy("jurnal_id", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.jurnals.push({
            id: doc.data().jurnal_id,
            headline: doc.data().headline,
            lead_all: doc.data().lead_all,
            lead_why: doc.data().lead_why,
            lead_how: doc.data().lead_how,
            lead_what: doc.data().lead_what,
            lead_when: doc.data().lead_when,
            lead_where: doc.data().lead_where,
            lead_who: doc.data().lead_who,
            body: doc.data().body,
            closing: doc.data().closing,
            created_at: doc.data().created_at,
          });
        });
      });

    console.log(this.jurnals);
  },
  methods: {
    deleteJurnal(id) {
      if (confirm("Apakah Anda yakin ingin menghapus jurnal ini?")) {
        db.collection("jurnals")
          .where("jurnal_id", "==", id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete().then(() => {
                alert("Jurnal berhasil dihapus!");
                this.$router.push({ name: "Dashboard" });
              });
            });
          });
      }
    },
  },
};
</script>
