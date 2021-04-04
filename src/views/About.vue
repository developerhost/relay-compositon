<template>
  <div class="about">
    <h1>{{ this.$route.params.word }}</h1>

    <v-text-field
      label="Regular"
      v-model="newPost"
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


export default {
  name: 'About',
  data: () => ({
    db: null,
    postsRef: null,
    postsWhere: null,
    postsDesc: null,
    newPost: '',
    posts: {},
    size: ''
  }),
  created(){
    this.db = firebase.firestore()
    this.postsRef = this.db.collection('posts')
    this.postsWhere = this.postsRef.where("word", "==", this.$route.params.word)
    this.postsLimit = this.postsWhere.orderBy("createdAt", "asc")
    
    this.postsLimit.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.posts = obj
    })
    // 投稿数を表示
    this.db.collection('posts').where("word", "==", this.$route.params.word).get().then(snap => {
    this.size = snap.size // will return the collection size
});
  },
  methods: {
    addPost(){
      if(this.newPost === ''){
        alert("nothing");
      }else{
        this.postsRef.add({
          sentence: this.newPost,
          word: this.$route.params.word,
          createdAt: new Date()
        })
      }
    }
  }
}
</script>