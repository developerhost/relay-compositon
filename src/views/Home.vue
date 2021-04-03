<template>
  <div class="home">
    <h1>タイトル</h1>

    <v-text-field
      label="Regular"
      v-model="newTitleName"
    ></v-text-field>

    <v-btn @click="addTitle()">
      追加
    </v-btn>

    <ul>
      <!-- key=accountsのIDが入る(dmNzy2QX92wE8fR4t5WG) -->
      <div v-for="(title, key) in titles" :key="key">
        <router-link
        :to="'/about/' + title.word"
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
  name: 'Home',
  components: {
    
  },
  data: () => ({
    db: null,
    titlesRef: null,
    newTitleName: '',
    titles: {}
  }),
  created(){
    this.db = firebase.firestore()
    this.titlesRef = this.db.collection('titles')
    this.titlesRef.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.titles = obj
    })
  },
  methods: {
    addTitle(){
      if(this.newTitleName === ''){
        alert("nothing");
      }else{
        this.titlesRef.add({
          word: this.newTitleName
        })
      }
    }
  }
}
</script>
