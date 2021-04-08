<template>
  <div>
    <div id="canvas-area">
      <canvas
        id="myCanvas"
        width="350px"
        height="496px"
        class="canvas"
      ></canvas>
    </div>
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
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#000000";
      this.imageDraw(this.canvas, this.newTitleName, this.NewAuthor);
      // this.drawText(this.canvas, this.newTitleName, this.NewAuthor);
      // this.reDraw();
    },
  methods: {
    imageDraw: function (canvas, text, text2) {
      let image = new Image();
        // await this.drawText(this.canvas, this.newTitleName, this.NewAuthor);
      // eslint-disable-next-line no-unused-vars
      const ctx = canvas.getContext('2d');
      // キャンバスに画像を描画（開始位置0,0）
      image.addEventListener("load", function() {
        const canvas = document.querySelector("#myCanvas");
        //(4)canvasグラフィックのサイズを設定する. ここでは画像のサイズに合わせている.
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        console.log("canvas.width", canvas.width); //350
        console.log("canvas.height", canvas.height); // 496
        
        //(5)canvasグラフィックを描くためのコンテキストオブジェクトを取得する.
        const ctx = canvas.getContext("2d");
        //(6)canvas要素にimageオブジェクトの内容を転写する.
        ctx.drawImage(image, 0, 0);
        ctx.font = "bold 30px serif"
        ctx.textBaseline = "center";
        ctx.textAlign = "center";

        var x = canvas.width / 2;
        var y = canvas.height / 2;
        ctx.fillText(text, x, y-120); //タイトル
        ctx.fillText("作者:"+text2, x, y+150); //著者
      });
        image.src = imgSrc;
    },
  },
}
</script>