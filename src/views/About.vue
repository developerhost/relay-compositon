<template>
  <div class="about">
    <v-container>
      <v-row class="text-center my-5" justify="center">
      <div id="canvas" v-if=this.title>
        <Canvas
          :NewAuthor="this.title.name"
          :newTitleName="this.$route.params.word"
        />
      </div>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="text-center my-2" justify="center">
        <h1>{{ this.$route.params.word }}</h1>
        <v-spacer></v-spacer>
        <span class="my-3"> のこり: {{ 10 - this.size }}人！ </span>
      </v-row>
      <v-divider></v-divider>
    </v-container>
    <v-container>
      <v-row class="text-center my-2" justify="center">
    <h3 v-if="this.size <= 9">
      未完成だよ
    </h3>
    <h3 v-else>完成したよ</h3>
      </v-row>
      <!-- 入力画面 -->
    </v-container>
      <div v-if="this.size <= 9">
      <v-card class="mx-2">
      <v-row class="text-center mx-2" justify="center">
          <v-text-field label="文章を入力" v-model="newPost"></v-text-field>
      </v-row>
      <v-row class="text-center mx-2" justify="center">
          <v-text-field label="名前" v-model="newPostName"></v-text-field>
      </v-row>
      <v-row class="text-center mx-2" justify="center">
        <!-- モーダルで投稿ボタンを作成 -->
          <div class="text-center">
            <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500">
              <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="font-weight-bold mb-3"
          color="blue lighten-2"
          outlined
          large
          dark
          v-bind="attrs"
          v-on="on"
          @click="
            addPost();
          "
        >
          文章を投稿
        </v-btn>
        </template>
        <v-card
          class="mx-auto my-auto"
          max-height="500px"
          >
          <v-row class="text-center" justify="center">
          <v-card-title class="headline text-center my-2">
            🎁投稿できました🎁
          </v-card-title>
          </v-row>
          <v-card-text>
            文章:{{ this.newPost }}
          </v-card-text>
          <v-card-text>
            名前:{{ this.newPostName }}
          </v-card-text>
          <v-divider></v-divider>
          <v-row justify="space-around">
        <v-col cols="auto">
          <v-card-actions>
              <v-btn
                color="blue"
                large
                text
                class="font-weight-bold text--darken-2 subtitle-1"
                @click="
                  tweet();
                  dialog = false;
                "
              >
                ツイートする
              </v-btn>
          </v-card-actions>
        </v-col>
          <!-- <v-spacer></v-spacer> -->
          <v-col cols="auto">
          <v-card-actions>
              <v-btn
                color="blue"
                large
                text
                class="font-weight-bold text--darken-2 subtitle-1"
                @click="dialog = false; clearText();"
              >
                閉じる
              </v-btn>
          </v-card-actions>
          </v-col>
          </v-row>
        </v-card>
            </v-dialog>
            </div>
        </v-row>
      </v-card>
    </div>
    <!-- カードを使って見た目を整える -->

    <div style="background-color:#EEEEEE">
    <v-container color="grey">
      <v-row dense>
        <v-col v-for="(post, key) in posts" :key="key" cols="12">
          <v-card class="d-inline" color="grey">
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
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </div>
    <div class="text-center" justify="center">
      <v-btn 
        color="blue lighten-2"
        outlined
        large
        class="font-weight-bold my-5 text-center"
        dark
        @click="tweet()"
        >ツイートする
      </v-btn>
    </div>
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
    title: null,
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
    // タイトル取得
    this.titlesRef = this.db.collection("titles");
    this.titlesRef
      .where("word", "==", this.$route.params.word)
      .onSnapshot((querySnapshot) => {
        //onSnapshot=イベントリスナー何か変化があった時に呼び出される
        querySnapshot.forEach((doc) => {
          this.title = doc.data();
        });
        console.log(this.title);
      });
    // 文章取得
    this.postsRef = this.db.collection("posts");
    this.postsWhere = this.postsRef.where("word", "==", this.$route.params.word);
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
            word: this.$route.params.word,
            createdAt: new Date(),
            name: this.newPostName,
          })
          .then(() => {
            this.incrementPostNumber(this.$route.params.word);
            console.log("increment");
          });
        this.isPush = true;
        console.log("post");
        this.size += 1;
      }
    },
    clearText() {
      this.newPost = '',
      this.newPostName = ''
    },
    // postをincrement
    incrementPostNumber: (word) => {
      const db = firebase.firestore();
      const titleList = db.collection("titles");
      titleList
        .where("word", "==", word)
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
    tweet() {
      const baseUrl = 'https://relay-composition.web.app/about/';
      const wordURL = encodeURI(this.$route.params.word);
      const url = baseUrl+wordURL;
      const encode = encodeURI(url);
      var shareURL =
        "https://twitter.com/intent/tweet?text=" +
        `${this.$route.params.word}に続きを投稿しよう！` +
        "%20%23TwiStory" +
        "&url=" + encode;
      location.href = shareURL;
      console.log("encodeurl",encode);
      console.log("encode",url);
      console.log(shareURL);
      console.log("URL",location.href);
      console.log(location.search);
      // const query = new URLSearchParams([text, hashtags, url, via]).toString();
      // const shareUrl = `${baseUrl}${query}`;
    },
  },
};
</script>