$(document).ready(function () {
  var text_title = "Overlay text";
  var canvas = document.getElementById('imageCanvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = "anonymous";

  window.addEventListener('load', DrawPlaceholder)

  function DrawPlaceholder() {
    img.onload = function () {
      DrawOverlay(img);
      DrawText();
      DynamicText(img)
    };
    img.src = '../images/social.png';
  }

  function DrawOverlay(img) {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = 'rgba(30, 144, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function DrawText() {
    ctx.fillStyle = "white";
    ctx.textBaseline = 'middle';
    ctx.font = "50px 'Montserrat'";
    ctx.textShadow = "1px solid black";
    wrapText(ctx, text_title, 130, 300, 800, 70);
  }

  function DynamicText(img) {
    document.getElementById('name').addEventListener('keyup', function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      DrawOverlay(img);
      DrawText();
      text_title = this.value;
      wrapText(ctx, text_title, 130, 300, 800, 70);
    });
  }

  function convertToImage() {
    window.open(canvas.toDataURL('png'));
  }

  document.getElementById('download').onclick = function download() {
    convertToImage();
  }
});
