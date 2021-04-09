<template>
  <div class="home">
    <v-container>
      <v-row class="text-center mt-5 blue--text" justify="center">
        <h3>みんなで小説を作るアプリ</h3>
      </v-row>
      <v-row class="text-center blue--text" justify="center">
        <v-icon large color="blue">mdi-account-edit-outline</v-icon>
        <h1>TwiStory</h1>
      </v-row>

      <v-row>
        <v-layout justify-center>
          <v-avatar size="100%">
            <v-img
              max-width="150"
              max-height="150"
              src="@/assets/img/icon.png"
            ></v-img>
          </v-avatar>
        </v-layout>
      </v-row>

      <v-row outlined class="v-row--outlined text-center" justify="center">
        <v-col>
          <v-text-field
            class="text-center"
            value="#みんなで小説を作ろう"
            outlined
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row
        class="text-center grey--text text--lighten-2 my-2"
        justify="center"
      >
        <h1>つかいかた</h1>
      </v-row>
      <v-row class="text-center blue--text my-2" justify="center">
        <h4>
          ①一文ずつ文章を投稿し、<br />みんなで一つの作品を作るリレー小説サイトです。
        </h4>
      </v-row>
      <v-row class="text-center blue--text my-5" justify="center">
        <h4>
          ②作品は１０投稿で完成します。<br />どんどんシェアして完成させましょう！
        </h4>
      </v-row>

      <!-- モーダルで小説投稿ボタン -->
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue lighten-2" outlined large class="font-weight-bold my-5" dark v-bind="attrs" v-on="on">
              新しい小説を作る
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              タイトルと名前を入力
            </v-card-title>

            <v-text-field label="タイトル" v-model="newTitleName"></v-text-field>
            <v-text-field label="名前" v-model="newAuthor"></v-text-field>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
                <router-link
                class="text-decoration-none"
                  :to="{ name: 'About', query: { word: newTitleName, id: newAuthor } }"
                >
                <v-btn color="blue" text class="font-weight-bold text--darken-2" @click="addTitle()">
                  新しい小説を投稿
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <v-row
        class="text-center my-5 blue--text grey lighten-2"
        justify="center"
      >
        <h1>注目の作品</h1>
      </v-row>
    </v-container>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(title, key) in titles"
          :key="key"
          cols="12"
        >
                <router-link
          :to="{ name: 'About', query: { word: title.word, id: title.name } }"
          class="text-decoration-none"
        >
          <v-card
          
          outlined
          elevation="9"
          >
            <v-card-title
              class="headline"
            >
            <span>
              {{ title.word }}
            </span>
            <v-spacer></v-spacer>

            <span 
            class="subtitle-1"
            >
            あと{{ 10 - title.postNumber }}人！</span>
            
            </v-card-title>



            <v-card-subtitle v-text="title.name"></v-card-subtitle>
          </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";

export default {
  name: "Home",
  props: ["size"],
  components: {},
  data: () => ({
    db: null,
    titlesRef: null,
    newTitleName: "",
    titles: {},
    isComplete: false,
    postNumber: 0,
    newAuthor: "",
  }),
  created() {
    this.db = firebase.firestore();
    this.titlesRef = this.db.collection("titles");

    this.titlesRef
      .where("postNumber", "<", 10)
      .orderBy("postNumber", "desc")
      .onSnapshot((querySnapshot) => {
        //onSnapshot=イベントリスナー何か変化があった時に呼び出される
        const obj = {};
        querySnapshot.forEach((doc) => {
          obj[doc.id] = doc.data();
        });
        this.titles = obj;

        //titleとひもづくpostが10投稿でisCompleteをtrueにしたい
        if (this.postNumber >= 10) {
          this.titles.isComplete = true;
        }
      });
  },
  methods: {
    addTitle() {
      if (this.newTitleName === "") {
        alert("入力してください");
      } else {
        this.titlesRef.add({
          word: this.newTitleName,
          isComplete: false,
          postNumber: 0,
          name: this.newAuthor,
          createdAt: new Date(),
        });
      }
    },
  },
};
</script>

<style scoped>
.balloon {
  position: relative;
  display: inline-block;
  margin: 1.5em 0;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #e0edff;
  border-radius: 15px;
}

.balloon:before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -15px;
  border: 15px solid transparent;
  border-top: 15px solid #e0edff;
}

.balloon p {
  margin: 0;
  padding: 0;
}
</style>
