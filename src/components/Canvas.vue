<template>
  <div>
    <div id="canvas-area">
      <canvas
        id="myCanvas"
        width="250px"
        height="250px"
        class="canvas"
      ></canvas>
    </div>
    <img src="@/assets/img/title.jpg">
    <v-btn
      @click="imageDraw(this.canvas)"
    >
      表示
    </v-btn>
  </div>
</template>

<style scoped>
#myCanvas {
  border: 1px solid #000000;
}
</style>

<script>
export default {
  name: "Canvas",
  props: [
    "NewAuthor",
    "newTitleName"
  ],
  data() {
    return {
      canvas: null,
      context: null,
      isDrag: false,
      max_width: 250,
      max_height: 250,
    };
  },
    mounted() {
      this.canvas = document.querySelector("#myCanvas");
      this.context = this.canvas.getContext("2d");
      this.imageDraw(this.canvas);
    },
  methods: {
    imageDraw: function (canvas) {
      let image = new Image();
      image.src = "@/assets/img/title.jpg"
      const ctx = canvas.getContext("2d");
      console.log("image-first",image);

      // キャンバスに画像を描画（開始位置0,0）
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
        console.log("image-onload",image);
      };
      image.onerror = function(e) {
        ctx.drawImage(image, 0, 0);
        console.log("error", e);
        
      }
        console.log("image-final",image);
        console.log("image-width",image.width);
        console.log("image-heigth",image.height);
    },

    // reDraw: function () {
    //   this.context.clearRect(0, 0, 250, 250);
    //   this.drawImage(this.canvas).then(() => {
    //     this.drawText(this.canvas, this.$route.params.word);
    //     console.log("word" ,this.$route.params.word);
    //   })
    // },

    // asyncLoadImage: async function () {
    //   return new Promise((resolve, reject) => {
    //     let img = new Image();
    //     img.onload = () => resolve(img);
    //     img.onerror = (e) => reject(e);
    //     img.src = "@/assets/img/title.jpg" 
    //     console.log("asyncImage",img)
    //   }).catch(function(error) {
    //     return error;
    //   });
    // },

    // watch: {
    //   canvasText: function () {
    //     this.reDraw();
    //   },
    // }
  },
}
</script>