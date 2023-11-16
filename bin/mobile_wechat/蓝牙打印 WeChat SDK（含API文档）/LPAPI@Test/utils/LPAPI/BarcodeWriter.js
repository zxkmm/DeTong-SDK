var qrcode = require('./qrcode');
var JsBarcode = require('./JsBarcode/JsBarcode');

function barc(ctx, code, x, y, width, height) {
  var options = {
    format: "CODE128",
    x: x,
    y: y,
    width: 1, //设置条之间的宽度
    height: 1, //高度
    displayValue: false, //是否在条形码下方显示文字
  };

  var bar = JsBarcode(ctx, code, options);
  var obj = bar.options(options)[options.format](code, options);
  var encodings = obj._encodings;
  if (encodings && encodings.length > 0) {
    var list = encodings[0];
    if (list && list.length > 0) {
      var data = list[0].data;
      if (data != null && data.length > 0) {

        var barWeight = width / data.length;
        if (barWeight < 1){
          barWeight = 1
        }
        
        let xx = x;

        ctx.lineWidth = 0;
        ctx.fillStyle = '#000000';

        for (var i = 0; i < data.length; i++) {
          var value = data[i];
          if (value == '1') {
            ctx.fillRect(xx, y, barWeight, height)
          }

          xx += barWeight;
        }
      }
    }
  }
}

function qrc(ctx, code, x, y, width, height, eccLevel) {
  qrcode.api.setEccLevel(eccLevel != null ? eccLevel : 2);
  qrcode.api.draw(code, {
    ctx: ctx,
    x: x,
    y: y,
    width: width,
    height: height,
  })
}

module.exports = {
  barcode: barc,
  qrcode: qrc,
}