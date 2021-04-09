<template>
  <div class="home">
    <h1>完結した作品</h1>
  <div class="postBtn">

  </div>

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
            完成済み</span>
            
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
