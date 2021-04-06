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
    drawImage: async function (canvas) {
      const image = await this.asyncLoadImage();
      const self = this;
      if (image.width > self.max_width) {
        image.width = self.max_width;
      }
      if (image.height > self.max_height) {
        image.height = self.max_height;
      }
      const ctx = canvas.getContext("2d");

      // キャンバスに画像を描画（開始位置0,0）
      ctx.drawImage(image, 0, 0, image.width, image.height);
      console.log(image.width);
      console.log(image.height);
    },

    drawText: function(canvas, text) {
      const ctx = canvas.getContext("2d");
      //文字の配置を指定
      ctx.textBaseline = "center";
      ctx.textAlign = "center";

      //座標を指定して文字を描く（画像の中心に）
      let x = canvas.width / 2;
      let y = canvas.height / 2;

      ctx.fillText(text, x, y);
      console.log("text",text);
    },

    asyncLoadImage: async function () {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
      });
    },

    reDraw: function () {
      this.context.clearRect(0, 0, 250, 250);
      this.drawImage(this.canvas).then(() => {
        this.drawText(this.canvas, this.$route.params.word);
        const imageUri = this.canvas.toDataURL();
        this.$emit("image-created", imageUri);
      })
    },

    watch: {
      canvasText: function () {
        this.reDraw();
      },
    }
  },
}
</script>