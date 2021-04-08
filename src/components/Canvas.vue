<template>
  <div>
    <div id="canvas-area">
      <canvas
        id="myCanvas"
        width="600px"
        height="600px"
        class="canvas"
      ></canvas>
    </div>
    <img src="../assets/img/title.jpg">
  </div>
</template>

<style scoped>
#myCanvas {
  border: 1px solid #000000;
}
</style>

<script>
import imgSrc from "@/assets/img/title.jpg";
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
      this.drawText(this.canvas, this.newTitleName, this.NewAuthor)
    },
  methods: {
    imageDraw: function () {
      let image = new Image();

      // キャンバスに画像を描画（開始位置0,0）
      image.addEventListener("load", function() {
        const canvas = document.querySelector("#myCanvas");
        //(4)canvasグラフィックのサイズを設定する. ここでは画像のサイズに合わせている.
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        //(5)canvasグラフィックを描くためのコンテキストオブジェクトを取得する.
        const ctx = canvas.getContext("2d");
        //(6)canvas要素にimageオブジェクトの内容を転写する.
        ctx.drawImage(image, 0, 0);
      });
        image.src = imgSrc;
    },

    drawText: function (canvas, text) {
      const ctx = canvas.getContext('2d');

      ctx.textBaseline = "top";
      ctx.textAlign = "top";

      var x = canvas.width / 2;
      var y = canvas.height / 2;

      ctx.fillText(text, x, y);
      console.log(text);
    }

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