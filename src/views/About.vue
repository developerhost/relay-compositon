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
    newPost: '',
    posts: {}
  }),
  created(){
    this.db = firebase.firestore()
    this.postsRef = this.db.collection('posts')
    this.postsRef.onSnapshot(querySnapshot => {
      const obj = {}
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
          sentence: this.newPost
        })
      }
    }
  }
}
</script>