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
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#000000";
      this.drawImage(this.canvas);
    },
  methods: {
    drawImage: function (canvas) {
      let image = new Image;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 250, 250);
      let imagePath = "../assets/title.jpg";
      image.src = imagePath;

      // キャンバスに画像を描画（開始位置0,0）
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        console.log("image",image);
        console.log("image-width",image.width);
        console.log("image-heigth",image.height);
      }
      
      console.log("image",image);
    },

    // reDraw: function () {
    //   this.context.clearRect(0, 0, 250, 250);
    //   this.drawImage(this.canvas).then(() => {
    //     this.drawText(this.canvas, this.$route.params.word);
    //     console.log("word" ,this.$route.params.word);
    //   })
    // },

    // watch: {
    //   canvasText: function () {
    //     this.reDraw();
    //   },
    // }
  },
}
</script>