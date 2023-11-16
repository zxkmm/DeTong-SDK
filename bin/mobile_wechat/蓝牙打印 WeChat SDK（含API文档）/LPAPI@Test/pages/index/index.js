//index.js

var lpapi = require('../../utils/LPAPI/LPAPI.js');
var tempIndex = 0;

//获取应用实例
var app = getApp()
Page({
  data: {},

  onLoad: function () {},

  openPrinter: function () {

    // lpapi.scanedPrinters((didGetScanedPrinters) => {
    //   console.log(didGetScanedPrinters)
    //   })

    wx.showLoading({
      title: '连接打印机',
    })

    lpapi.openPrinter('', function (res) {

      console.log('PrinterName：' + lpapi.connectingPrinterDetailInfos().name);
      console.log('DPI：' + lpapi.connectingPrinterDetailInfos().DPI);
      console.log('PrintWidth：' + lpapi.connectingPrinterDetailInfos().width);
      console.log('SoftwareFlags：' + lpapi.connectingPrinterDetailInfos().softFlags);

      wx.hideLoading({
        success: (res) => {},
      })

      wx.showToast({
        title: '连接打印机成功',
        icon: '',
        image: '',
        duration: 2000,
        mask: true,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    }, function (errorCode) {

      var message = null;
      if (errorCode == 0) {
        message = '打印机连接断开';
      } else if (errorCode == 1) {
        message = '没有搜到打印机';
      }

      wx.showToast({
        title: message,
        icon: '',
        image: '',
        duration: 2000,
        mask: true,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    })
  },

  disconnect: function () {
    lpapi.closePrinter();

    // wx.closeBluetoothAdapter({
    //   success: (res) => {
    //   },
    // })
  },

  showPreview: function (previewData) {
    // 填充预览数据
    wx.createSelectorQuery().select('#test').fields({
      node: true,
      size: true
    }).exec((res) => {
      const canvas = res[0].node;
      const context = canvas.getContext('2d');
      const dpr = wx.getWindowInfo().pixelRatio;
      canvas.width = 600;
      canvas.height = 600;
      context.scale(dpr, dpr);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.putImageData(previewData, 0, 0);
    });
  },

  createLabel_Text: function () {
    const width = 50
    const height = 40

    lpapi.startDrawLabel(width, height, 0);

    lpapi.drawRectangle(2, 2, width - 4, height - 4, 0.5, false);

    lpapi.setItemHorizontalAlignment(0);
    lpapi.drawText('第一行：sdfjwheoxczcsda1413', 2, 5, 3);
    lpapi.drawText('第二行：asdkljfaeioufvsdoia', 2, 10, 3);
    lpapi.drawText('第三行：dfiovjsdiovhasnkfvh', 2, 15, 3);

    lpapi.setItemHorizontalAlignment(1);

    lpapi.drawTextInWidth('第四行', 2, 20, width - 4, 3);
    lpapi.drawTextInWidth('第五行', 2, 25, width - 4, 3);

    lpapi.setItemHorizontalAlignment(2);

    lpapi.drawTextInWidth('第六行', 2, 30, width - 4, 3);
    lpapi.drawTextInWidth('第七行', 2, 35, width - 4, 3);

    this.print();

    var previewData = lpapi.endDrawLabel();
    this.showPreview(previewData);
  },

  createLabel_QRCode: function () {
    const width = 30
    const height = 30

    lpapi.startDrawLabel(width, height, 0);

    lpapi.drawRectangle(2, 2, width - 4, height - 4, 0.5, false);

    lpapi.drawQRCode('0123456789', 4, 4, width - 8)

    this.print();

    var previewData = lpapi.endDrawLabel();
    this.showPreview(previewData);
  },

  createLabel_Barcode: function () {
    const width = 50
    const height = 50

    lpapi.startDrawLabel(width, height, 0);

    lpapi.drawRectangle(2, 2, width - 4, height - 4, 0.5, false);

    lpapi.drawBarcode('1234567890', 4, 10, width - 8, 10)

    this.print();

    var previewData = lpapi.endDrawLabel();
    this.showPreview(previewData);
  },

  createLabel_LocalImage: function () {
    const width = 50
    const height = 50

    lpapi.setPrintGrayThreshold(192);

    lpapi.startDrawLabel(width, height, 0);

    lpapi.drawRectangle(2, 2, width - 4, height - 4, 0.5, false);

    let self = this;

    lpapi.drawImagePath('../image/001.png', 4, 4, width - 8, height - 8, function () {
      self.print();

      var previewData = lpapi.endDrawLabel();
      self.showPreview(previewData);
    });
  },

  createLabel_NetworkImage: function () {
    const width = 50
    const height = 50

    lpapi.setPrintGrayThreshold(192);

    lpapi.startDrawLabel(width, height, 0);

    lpapi.drawRectangle(2, 2, width - 4, height - 4, 0.5, false);

    let self = this;

    lpapi.drawImagePath('https://csdnimg.cn/medal/chizhiyiheng@240.png', 4, 4, width - 8, height - 8, function () {
      self.print();

      var previewData = lpapi.endDrawLabel();
      self.showPreview(previewData);
    });
  },

  print: function () {
    wx.showLoading({
      title: '打印中',
    })

    tempIndex = 1;
    this.printOneLabel();
  },

  printOneLabel: function () {
    let self = this;
    lpapi.print(function () {
      self.printNextLabel();
    })
  },

  printNextLabel: function () {
    tempIndex--;
    if (tempIndex <= 0) {
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '打印成功',
        icon: '',
        image: '',
        duration: 2000,
        mask: true,
      })
    } else {
      this.printOneLabel();
    }
  },

  onHide() {
    // 页面隐藏
    lpapi.closePrinter();
  },
})