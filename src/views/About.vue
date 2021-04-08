<template>
  <div class="about">
    <h1>{{ this.$route.query.word }}</h1>
    <h1>{{ this.$route.query.id }}</h1>

    <div id="canvas">
    <Canvas
    :NewAuthor="this.$route.query.id"
    :newTitleName="this.$route.query.word"
    />
    </div>

    <v-text-field
      label="文章を入力"
      v-model="newPost"
    ></v-text-field>
    <v-text-field
      label="名前を入力"
      v-model="newPostName"
    ></v-text-field>

    <v-btn @click="addPost()">
      投稿
    </v-btn>

    <p>
      投稿数: {{ this.size }}
    </p>

    <h1 v-if="this.size <= 9">
      未完成
    </h1>
    <h1 v-else>完成</h1>

    <ul>
      <!-- key=accountsのIDが入る(dmNzy2QX92wE8fR4t5WG) -->
      <div v-for="(post, key) in posts" :key="key">

        {{ key }}
        {{ post }}
        {{ post.sentence }}
      </div>
    </ul>

  </div>
</template>

<script>
import firebase from 'firebase'
import Canvas from "../components/Canvas.vue"



export default {
  name: 'About',
  props: ['postNumber'],
  components: {
    Canvas
  },
  data: () => ({
    db: null,
    postsRef: null,
    postsWhere: null,
    postsDesc: null,
    newPost: '',
    posts: {},
    size: '',
    newPostName: '',
    isPush: false,
    canvasText: "",
  }),
  created(){
    this.db = firebase.firestore()
    this.postsRef = this.db.collection('posts')
    this.postsWhere = this.postsRef.where("word", "==", this.$route.query.word)
    this.postsLimit = this.postsWhere.orderBy("createdAt", "asc")
    
    this.postsLimit.onSnapshot(querySnapshot => {
      const obj = {};
      this.size = querySnapshot.size
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.posts = obj
    })
  },
  methods: {
    addPost(){
      if(this.newPost === ''){
        alert("nothing");
      }else{
        this.postsRef.add({
          sentence: this.newPost,
          word: this.$route.query.word,
          createdAt: new Date(),
          name: this.newPostName,
        }).then(() => {
          this.incrementPostNumber(this.$route.query.word);
        })
      this.newPost = '';
      this.newPostName = '';
      this.isPush = true;
      console.log("post");
      this.size += 1;

      }
    },
    // postをincrement
      incrementPostNumber: (word) => {
      const db = firebase.firestore()
      const titleList = db.collection('titles');
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
        }).catch((error) =>{
          console.error("Error writing document: ", error);
        });
    },
    // this.sizeをpostNumberに
      sizePostNumber: (word) => {
      const db = firebase.firestore()
      const titleList = db.collection('titles');
      titleList.where("word", "==", word);
        titleList.get()
        .then((res) => {
          res.forEach((doc) => {
            console.log(doc.data());
            console.log(1233333, doc.id);
            titleList.doc(doc.id).update({
              postNumber: this.size,
            });
          });
        }).catch((error) =>{
          console.error("Error writing document: ", error);
        });
    },
  }
}
</script>