<template>
  <div id="dashboard">
    <div class="row">
      <div class="col-md-10">
        <p class="text-muted fw-bold">Created At : {{ jurnal.created_at }}</p>
        <h1 class="mb-4 text-center">{{ jurnal.headline }}</h1>
        <div class="d-flex align-items-center">
          <div class="row w-100">
            <div class="col-md-4 align-middle">
              <select class="form-select" @change="onChange($event)">
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
      </div>
      <div class="col-md-2">
        <h6>Baca Berita Lainnya</h6>
        <ul class="list-group list-group-flush fw-underline">
          <li class="list-group-item p-2" v-for="(link, index) in links" :key="index">
            <a :href="link.link_url" class="btn p-0 m-0 text-start">
              <span class="fs-6"
                ><u>{{ link.alias }}</u></span
              >
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./firebase/firebaseInit";

export default {
  name: "dashboard",
  data() {
    return {
      jurnal: {},
      links: [],
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
  created() {
    db.collection("jurnals")
      .orderBy("jurnal_id", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.jurnal = doc.data();
          this.lead = this.jurnal.lead_all;
        });
      });

    db.collection("links")
      .orderBy("link_id", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.links.push(doc.data());
        });
      });
  },
  methods: {
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
