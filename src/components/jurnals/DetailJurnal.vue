<template>
  <div id="detail-jurnal">
    <!-- Add your jurnal template here -->
    <p class="text-muted fw-bold">Created At : {{ jurnal.created_at }}</p>
    <h1 class="mb-4 text-center">{{ jurnal.headline }}</h1>
    <div class="d-flex align-items-center">
      <div class="row w-100">
        <div class="col-md-4 d-flex justify-content-center text-center">
          <select class="form-select mb-3" @change="onChange($event)">
            <option :value="category.value" v-for="(category, index) in categories" :key="index">{{ category.name }}</option>
          </select>
        </div>
        <div class="col-md-8">
          <h5 class="mb-5" id="lead">{{ lead }}</h5>
        </div>
      </div>
    </div>
    <p>{{ jurnal.body }}</p>
    <p>{{ jurnal.closing }}</p>
    <router-link to="/jurnals" class="btn btn-danger btn-sm mt-4">Kembali</router-link>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
export default {
  name: "view-jurnal",
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
      lead: null,
      categories: [
        {
          name: "All",
          value: "all",
        },
        {
          name: "Why",
          value: "why",
        },
        {
          name: "What",
          value: "what",
        },
        {
          name: "When",
          value: "when",
        },
        {
          name: "Where",
          value: "where",
        },
        {
          name: "Who",
          value: "who",
        },
        {
          name: "How",
          value: "how",
        },
      ],
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
            vm.lead = doc.data().lead_all;
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
            this.lead = doc.data().lead_all;
          });
        });
    },
    onChange(event) {
      // console.log(event.target.value);
      if (event.target.value == "why") {
        this.lead = this.jurnal.lead_why;
      } else if (event.target.value == "why") {
        this.lead = this.jurnal.lead_why;
      } else if (event.target.value == "how") {
        this.lead = this.jurnal.lead_how;
      } else if (event.target.value == "what") {
        this.lead = this.jurnal.lead_what;
      } else if (event.target.value == "when") {
        this.lead = this.jurnal.lead_when;
      } else if (event.target.value == "where") {
        this.lead = this.jurnal.lead_where;
      } else if (event.target.value == "who") {
        this.lead = this.jurnal.lead_who;
      } else {
        this.lead = this.jurnal.lead_all;
      }
    },
  },
};
</script>
