<template>
  <div class="home">
    <h1>完成品</h1>
  <div class="postBtn">

  </div>


    <ul>
      <!-- key=accountsのIDが入る(dmNzy2QX92wE8fR4t5WG) -->
      <div v-for="(title, key) in titles" :key="key">
        <router-link
        :to="{name: 'About', query: {word: title.word, id: title.name}}"
        >
        {{ key }}
        {{ title }}
        {{ title.word }}
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'

export default {
  name: 'Complete',
  components: {
    
  },
  data: () => ({
    db: null,
    titlesRef: null,
    newTitleName: '',
    titles: {},
    isComplete: false
  }),
  created(){
    this.db = firebase.firestore()
    this.titlesRef = this.db.collection('titles')
    this.titlesPostNumber = this.titlesRef.where("postNumber", ">=", 10)
    this.titlesPostNumber.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.titles = obj
    })
  },
  methods: {
    
  }
}
</script>
