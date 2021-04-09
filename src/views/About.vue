<template>
  <div class="about">
    <v-container>
      <v-row class="text-center my-5" justify="center">
    <div id="canvas">
      <Canvas
        :NewAuthor="this.$route.query.id"
        :newTitleName="this.$route.query.word"
      />
    </div>
      </v-row>
    </v-container>

    <!-- モーダルで投稿ボタンを作成 -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          
            color="blue lighten-2"
            outlined
            large
            class="font-weight-bold my-5"
            dark
            v-bind="attrs"
            v-on="on"
          >
            新しい文章を作る
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            文章と名前を入力
          </v-card-title>

          <v-text-field label="文章を入力" v-model="newPost"></v-text-field>
          <v-text-field label="名前" v-model="newPostName"></v-text-field>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link
              class="text-decoration-none"
              :to="{
                name: 'About',
                query: { word: newTitleName, id: newAuthor },
              }"
            >
              <v-btn
                color="blue"
                text
                class="font-weight-bold text--darken-2"
                @click="
                  addPost();
                  dialog = false;
                "
              >
                文章を投稿
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-container>
      <v-row class="text-center my-2" justify="center">
        <h1>{{ this.$route.query.word }}</h1>

        <v-spacer></v-spacer>

        <span class="my-3"> のこり: {{ 10 - this.size }}人！ </span>
      </v-row>
      <v-divider></v-divider>
    </v-container>

    <h1 v-if="this.size <= 9">
      未完成
    </h1>
    <h1 v-else>完成</h1>

    <!-- カードを使って見た目を整える -->
    <v-container>
      <v-row dense>
        <v-col v-for="(post, key) in posts" :key="key" cols="12">
          <v-card class="d-inline">
            <v-card-title class="headline">
              <span class="subtitle-1">
                {{ post.sentence }}
              </span>
              <v-spacer></v-spacer>

              <!-- <span 
            class="subtitle-1"
            >
            あと{{ 10 - this.size }}人！</span> -->
            </v-card-title>

            <v-card-subtitle class="text-right">
              -{{ post.name }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import Canvas from "../components/Canvas.vue";

export default {
  name: "About",
  props: ["postNumber"],
  components: {
    Canvas,
  },
  data: () => ({
    db: null,
    postsRef: null,
    postsWhere: null,
    postsDesc: null,
    newPost: "",
    posts: {},
    size: "",
    newPostName: "",
    isPush: false,
    canvasText: "",
    dialog: false,
  }),
  created() {
    this.db = firebase.firestore();
    this.postsRef = this.db.collection("posts");
    this.postsWhere = this.postsRef.where("word", "==", this.$route.query.word);
    this.postsLimit = this.postsWhere.orderBy("createdAt", "asc");

    this.postsLimit.onSnapshot((querySnapshot) => {
      const obj = {};
      this.size = querySnapshot.size;
      querySnapshot.forEach((doc) => {
        obj[doc.id] = doc.data();
      });
      this.posts = obj;
    });
  },
  methods: {
    addPost() {
      if (this.newPost === "") {
        alert("nothing");
      } else {
        this.postsRef
          .add({
            sentence: this.newPost,
            word: this.$route.query.word,
            createdAt: new Date(),
            name: this.newPostName,
          })
          .then(() => {
            this.incrementPostNumber();
            console.log("increment");
            
          });
        this.newPost = "";
        this.newPostName = "";
        this.isPush = true;
        console.log("post");
        this.size += 1;
      }
    },
    // postをincrement
    incrementPostNumber: () => {
      const db = firebase.firestore();
      const titleList = db.collection("titles");
      titleList
        .where("word", "==", this.$route.query.word)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            console.log(doc.data());
            console.log(1233333, doc.id);
            titleList.doc(doc.id).update({
              postNumber: firebase.firestore.FieldValue.increment(1),
            });
          });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
};
</script>
