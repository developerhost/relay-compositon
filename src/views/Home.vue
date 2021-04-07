<template>
  <div class="home">
    <h1>タイトル</h1>

    <v-text-field
      label="タイトル"
      v-model="newTitleName"
    ></v-text-field>
    <v-text-field
      label="名前"
      v-model="newAuthor"
    ></v-text-field>
  <div class="postBtn">
    <router-link
      :to="'/about/' + newTitleName"
    >

    <v-btn @click="addTitle()">
      タイトルを投稿
    </v-btn>
    </router-link>

  </div>


    <ul>
      <!-- key=accountsのIDが入る(dmNzy2QX92wE8fR4t5WG) -->
      <div v-for="(title, key) in titles" :key="key">
        <router-link
        :to="'/about/' + title.word"
        >
        {{ key }}
        {{ title }}
        {{ title.word }}
        {{ title.name }}
        {{ title.postNumber }}
        <!-- {{ this.postNumber }} -->
        <!-- {{ this.$route.params.size }} -->
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
  props: ['size'],
  components: {
    
  },
  data: () => ({
    db: null,
    titlesRef: null,
    newTitleName: '',
    titles: {},
    isComplete: false,
    postNumber: 0,
    newAuthor: ''
  }),
  created(){
    this.db = firebase.firestore()
    this.titlesRef = this.db.collection('titles')
    this.titlesRef.onSnapshot(querySnapshot => { //onSnapshot=イベントリスナー何か変化があった時に呼び出される
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.titles = obj

      console.log("titles",this.titles);
      
      //titleとひもづくpostが10投稿でisCompleteをtrueにしたい
      if(this.$route.params.size >= 10){
        this.titles.isComplete = !this.titles.isComplete
      }
      console.log(this.$route.params.size)
    })

    //投稿数を表示
    const postList = this.db.collection('posts').where("word", "==", this.$route.params.word);
    postList.get().then(snap => {
    this.postNumber = snap.postNumber
    console.log(this.postNumber)
    });

    //投稿数を追加する処理
    // postList.get().then((res) => {
    //   res.forEach((doc) => {
    //     postList.doc(doc.id).update({
    //       postNumber: firebase.firestore.FieldValue.increment(1),
    //     })
    //   })
    // })
    console.log(this.postNumber);

    //parent
    // let firebase_node = firebase.database().ref('/about');
    // firebase_node.once('value', titles => console.log('Count: ' + titles.numChildren()));
  },
  methods: {
    addTitle(){
      if(this.newTitleName === ''){
        alert("入力してください");
      }else{
        this.titlesRef.add({
          word: this.newTitleName,
          isComplete: false,
          postNumber: 0,
          name: this.newAuthor
        })
      }
    }
  }
}
</script>
