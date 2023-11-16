using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DothanTech.LPAPI;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media.Imaging;

namespace PrintTest
{
    public class MainViewModel : ObservableObject
    {
        // 预览模式，用于生成白色底色的预览图片。
        public const int PRINT_MODE_PREV_WHITE = 0;
        // 预览模式，用于生成透明底色的预览图片，可以跟其他图片合成
        public const int PRINT_MODE_PREV_TRANS = 1;
        // 打印模式，用于直接打印。
        public const int PRINT_MODE_PRINT = 2;

        #region Commands
        public ICommand LoadedCommand => new RelayCommand<RoutedEventArgs>(OnLoadedCommandExecuted);
        public ICommand UpdatePrinterCmd => new RelayCommand<RoutedEventArgs>(OnUpdatePrinterCmdExecuted);
        //
        public ICommand OpenPrinterCmd => new RelayCommand(OnOpenPrinterCmdExecuted);
        public ICommand ClosePrinterCmd => new RelayCommand(OnClosePrinterCmdExecuted);
        //
        public ICommand DrawTextCmd => new RelayCommand(OnPrintTextCmdExecuted);
        public ICommand DrawWithAlignmentCmd => new RelayCommand(OnPrintWithAlignmentCmdExecuted);
        public ICommand DrawWithRotationCmd => new RelayCommand(OnPrintWithRotationCmdExecuted);
        public ICommand DrawBarcodeCmd => new RelayCommand(OnPrintBarcodeCmdExecuted);
        public ICommand DrawQRCodeCmd => new RelayCommand(OnPrintQRCodeCmdExecuted);
        public ICommand DrawPDF417Cmd => new RelayCommand(OnPrintPDF417CmdExecuted);
        public ICommand DrawDataMatrixCmd => new RelayCommand(OnPrintDataMatrixCmdExecuted);
        public ICommand DrawRectCmd => new RelayCommand(OnPrintRectCmdExecuted);
        public ICommand DrawEllipseCmd => new RelayCommand(OnPrintEllipseCmdExecuted);
        public ICommand DrawCircleCmd => new RelayCommand(OnPrintCircleCmdExecuted);
        public ICommand DrawLineCmd => new RelayCommand(OnPrintLineCmdExecuted);
        public ICommand DrawImageUrlCmd => new RelayCommand(OnDrawImageUrlCmdExecuted);
        public ICommand DrawImageDataCmd => new RelayCommand(OnDrawImageDataCmdExecuted);
        //
        public ICommand PrintImageCmd => new RelayCommand(OnPrintImageCmdExecuted);
        public ICommand PrintJSONCmd => new RelayCommand(OnPrintJsonCmdExecuted);

        #endregion

        #region Getter/Setter

        public DTPWeb Api => DTPWeb.GetInstance();

        public ObservableCollection<LPA_Device> PrinterList { get; set; } = new ObservableCollection<LPA_Device>();

        public LPA_Device CurrPrinter
        {
            get => _currPrinter;
            set => SetProperty(ref _currPrinter, value);
        }
        private LPA_Device _currPrinter;

        public ObservableCollection<JobInfo> PrintModeList { get; set; } = new ObservableCollection<JobInfo>();

        public JobInfo PrintMode
        {
            get => _printMode;
            set => SetProperty(ref _printMode, value);
        }
        private JobInfo _printMode;

        public ObservableCollection<NameValue> RotationList { get; set; } = new ObservableCollection<NameValue>();

        public int Orientation { get; set; }

        public ObservableCollection<BitmapImage> PreviewList { get; set; } = new ObservableCollection<BitmapImage>();

        public BitmapImage TestImage { get; protected set; } = new BitmapImage(new Uri("pack://application:,,,/PrintTest;component/Images/logo.png"));

        #endregion

        #region Life Cycle

        public MainViewModel()
        {
            //
            PrintModeList.Add(new JobInfo("Prev White Mode", PRINT_MODE_PREV_WHITE) { JobName = LPA_JobName.Preview_White });
            PrintModeList.Add(new JobInfo("Prev Trans Mode", PRINT_MODE_PREV_TRANS) { JobName = LPA_JobName.Preview_Transparent });
            PrintModeList.Add(new JobInfo("Print Mode", PRINT_MODE_PRINT) { JobName = LPA_JobName.Print });
            PrintMode = PrintModeList[0];
            //
            RotationList = new ObservableCollection<NameValue>()
            {
                new NameValue("横向打印"),
                new NameValue("右转90度", 1),
                new NameValue("旋转180度", 2),
                new NameValue("左转90度", 3)
            };
            Orientation = 0;
            // 检查插件是否可用。
            if (!Api.CheckPlugin())
            {
                Debug.WriteLine("问检测到本地打印助手！");
            }
        }

        #endregion

        #region OnCommandExecuted

        protected void OnLoadedCommandExecuted(RoutedEventArgs args)
        {
            OnUpdatePrinterCmdExecuted(args);
        }
        protected void OnUpdatePrinterCmdExecuted(RoutedEventArgs args)
        {
            PrinterList.Clear();
            //
            var printers = Api.GetPrinters();
            if (printers.Count > 0)
            {
                foreach (var item in printers)
                    PrinterList.Add(item);
                //
                CurrPrinter = printers[0];
            }
            else
            {
                PrinterList.Add(new LPA_Device("未检测到打印机"));
            }
        }
        protected void OnOpenPrinterCmdExecuted()
        {
            if (CurrPrinter == null)
            {
                MessageBox.Show("未检测到打印机");
                return;
            }
            if (Api.OpenPrinter(CurrPrinter))
                MessageBox.Show("打印机链接成功!");
            else
                MessageBox.Show("打印机链接失败！");
        }

        protected void OnClosePrinterCmdExecuted()
        {
            Api.ClosePrinter();
        }
        protected void OnPrintTextCmdExecuted()
        {
            // 打印模式下需要先打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            double width = 40;
            double height = 30;
            double fontHeight = 5;
            string text = "@上海道臻信息技术有限公司#";
            // var text = "www.dothatnech.com";
            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                //
                api.DrawText(text, width: width, height: height, fontHeight: fontHeight);
                //
                api.CommitJob();
                // 预览模式下显示预览效果
                ShowPreview();
            }
            // 关闭打印机
            api.ClosePrinter();
        }
        protected void OnPrintWithAlignmentCmdExecuted()
        {
            // 打印模式下需要先打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 40;
            var fontHeight = 4;
            var itemWidth = width / 2;
            var itemHeight = height / 2;
            var text1 = "水平居左对齐，垂直居上对齐";
            var text2 = "水平居中对齐，垂直居中对齐";
            var text3 = "水平居右对齐，垂直居下对齐";
            var text4 = "水平拉伸对齐，垂直拉伸对齐";

            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                // 将正张标签分成四个区域，分别对应不同的对齐方式
                api.DrawRectangle(width: width, height: height);
                api.DrawLine(x1: 0, x2: width, y1: itemHeight);
                api.DrawLine(y1: 0, y2: height, x1: itemWidth);
                // 左对齐，上对齐
                api.DrawText(text1, 0, 0, itemWidth, itemHeight, fontHeight, horizontalAlignment: 0, verticalAlignment: 0);
                // 水平居中，垂直居中
                api.DrawText(text2, itemWidth, 0, itemWidth, itemHeight, fontHeight, horizontalAlignment: 1, verticalAlignment: 1);
                // 水平居右，垂直居右
                api.DrawText(text3, 0, itemHeight, itemWidth, itemHeight, fontHeight, horizontalAlignment: 2, verticalAlignment: 2);
                // 水平拉伸，垂直拉伸
                api.DrawText(text4, itemWidth, itemHeight, itemWidth, itemHeight, fontHeight, horizontalAlignment: 3, verticalAlignment: 3);
                //
                api.CommitJob();
                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintWithRotationCmdExecuted()
        {
            // 打印模式下需要先打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 40;
            var fontHeight = 4;
            var text = "@上海道臻信息技术有限公司#";
            // var text = "www.dothatnech.com";
            var itemWidth = width / 2;
            var itemHeight = height / 2;

            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                // 将正张标签分成四个区域，分别对应不同的对齐方式
                api.DrawRectangle(width: width, height: height);
                api.DrawLine(x1: 0, x2: width, y1: itemHeight);
                api.DrawLine(y1: 0, y2: height, x1: itemWidth);
                // 左对齐，上对齐
                api.DrawText(text, 0, 0, itemWidth, itemHeight, fontHeight, orientation: 0);
                // 水平居中，垂直居中
                api.DrawText(text, itemWidth, 0, itemWidth, itemHeight, fontHeight, orientation: 90);
                // 水平居右，垂直居右
                api.DrawText(text, itemWidth, itemHeight, itemWidth, itemHeight, fontHeight, orientation: 180);
                // 水平拉伸，垂直拉伸
                api.DrawText(text, 0, itemHeight, itemWidth, itemHeight, fontHeight, orientation: 270);
                //
                api.CommitJob();

                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintBarcodeCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 30;
            var text = "1234567890";
            var margin = 5;

            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                //
                api.Draw1DBarcode(text, margin, margin, width - margin * 2, height - margin * 2, 5);
                //
                api.CommitJob();
                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintQRCodeCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 45;
            var margin = 5;
            var text = "上海道臻信息技术有限公司";
            // var text = "www.dothantech.com";

            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                //
                api.Draw2DQRCode(text, margin, margin, width - margin * 2);
                //
                api.CommitJob();
                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();

        }
        protected void OnPrintPDF417CmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 30;
            var text = "上海道臻信息技术有限公司";
            // var text = "www.dothantech.com";
            var margin = 5;

            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                //
                api.Draw2DPdf417(text, margin, margin, width - margin * 2, height - margin * 2);
                //
                api.CommitJob();
                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintDataMatrixCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 30;
            var text = "www.dothantech.com";
            var margin = 5;

            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                //
                api.Draw2DDataMatrix(text, margin, margin, width - margin * 2, height - margin * 2);
                //
                api.CommitJob();
                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintRectCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 30;
            var padding = 2;

            // 创建打印任务
            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                api.StartPage();
                // 第一页，打印矩形框
                api.DrawRectangle(0, 0, width, height);
                // 打印填充矩形
                api.DrawRectangle(padding, padding, width - padding * 2, height - padding * 2, fill: true);
                api.EndPage();

                // 第二页，打印圆角矩形框
                api.StartPage();
                api.DrawRectangle(0, 0, width, height, cornerWidth: 3.0, cornerHeight: 3.0, lineWidth: 0.5);
                api.DrawRectangle(padding, padding, width - padding * 2, height - padding * 2, cornerWidth: 2, cornerHeight: 2, fill: true);
                api.EndPage();

                // 提交打印任务
                api.CommitJob();

                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintEllipseCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var height = 30;
            var padding = 2;

            // 创建打印任务。
            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                // 打印椭圆边框
                api.DrawEllipse(0, 0, width, height, 0.5);
                // 打印填充椭圆
                api.DrawEllipse(padding, padding, width - padding * 2, height - padding * 2, fill: true);

                // 提交打印任务。
                api.CommitJob();

                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintCircleCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 30;
            var height = 30;
            var centerX = width * 0.5;
            var centerY = height * 0.5;
            var radius = 15;
            var padding = 2;

            // 创建打印任务。
            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                // 打印椭圆边框
                api.DrawCircle(centerX, centerY, radius);
                // 打印填充椭圆
                api.DrawCircle(centerX, centerY, radius - padding, fill: true);

                // 提交打印任务。
                api.CommitJob();

                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintLineCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 45;
            var lineSpace = 5;
            var height = lineSpace * 4;
            var lineWidth = 0.5;

            // 开始打印任务；
            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                //
                api.DrawLine(0, 5, 45, 5, lineWidth);
                api.DrawLine(0, 10, 45, 10, lineWidth, new double[] { 0.5 });
                api.DrawLine(0, 15, 45, 15, lineWidth, new double[] { 0.75, 0.5 });
                // 提交打印任务；
                api.CommitJob();

                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnDrawImageUrlCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var width = 30;
            var height = 30;
            var url = "http://www.detonger.com/img/QRCode_OfficialAccounts.png";
            var margin = 5;
            if (api.StartJob(width, height, Orientation, PrintMode?.JobName))
            {
                //
                api.DrawImage(url, margin, margin, width - margin * 2, height - margin * 2);
                //
                api.CommitJob();
                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnDrawImageDataCmdExecuted()
        {
            // 打开打印机
            if (PrintMode?.Value == PRINT_MODE_PRINT && !Api.OpenPrinter(CurrPrinter))
                return;
            //
            var api = Api;
            var labelWidth = 30;
            var labelHeight = 30;
            var image = CreateMemoryStream(TestImage);

            if (api.StartJob(labelWidth, labelHeight, Orientation, PrintMode?.JobName))
            {
                //
                api.DrawImageStream(image, 0, 0, labelWidth, labelHeight);
                //
                api.CommitJob();
                // 则显示预览效果
                ShowPreview();
            }
            //
            api.ClosePrinter();
        }
        protected void OnPrintImageCmdExecuted()
        {
            var image = CreateMemoryStream(TestImage);
            Api.PrintMemoryStream(image, CurrPrinter.Name);
        }
        protected void OnPrintJsonCmdExecuted()
        {
            if (CurrPrinter == null)
                return;
            int action = 0x1000;
            if (PrintMode?.Value == PRINT_MODE_PREV_WHITE)
                action = 0x02;
            else if (PrintMode?.Value == PRINT_MODE_PREV_TRANS)
                action = 0x82;
            //
            JObject root = new JObject();
            JObject printerInfo = new JObject();
            root.Add("printerInfo", printerInfo);
            //
            printerInfo.Add("printerName", CurrPrinter.Name);
            //
            JObject jobInfo = new JObject();
            root.Add("jobInfo", jobInfo);
            jobInfo.Add("jobWidth", 40);
            jobInfo.Add("jobHeight", 30);
            //
            JArray jobPages = new JArray();
            root.Add("jobPages", jobPages);
            JArray jobPage = new JArray();
            jobPages.Add(jobPage);
            JObject drawItem = new JObject();
            jobPage.Add(drawItem);
            // 绘制字符串
            drawItem.Add("type", "text");
            drawItem.Add("text", "上海道臻信息技术有限公司");
            drawItem.Add("x", 0);
            drawItem.Add("y", 0);
            drawItem.Add("width", 40);
            drawItem.Add("height", 10);
            drawItem.Add("fontHeight", 4.5);
            drawItem.Add("verticalAlignment", 1);
            drawItem.Add("horizontalAlignment", 3);
            //
            // 绘制一维码
            drawItem = new JObject();
            jobPage.Add(drawItem);
            //
            drawItem.Add("type", "barcode");
            drawItem.Add("text", "dothantech");
            drawItem.Add("x", 0);
            drawItem.Add("y", 10);
            drawItem.Add("width", 40);
            drawItem.Add("height", 20);
            drawItem.Add("textHeight", 5);
            drawItem.Add("horizontalAlignment", 1);
            drawItem.Add("textAlignment", 3);
            //
            var result = Api.Preview(action, root.ToString());
            if (result != null && result.previewData != null)
                PreviewPages(result.previewData);
        }
        #endregion

        protected void ShowPreview()
        {
            // 打印模式下是无法获取预览图片的，所以直接退出；
            if (PrintMode.Value == PRINT_MODE_PRINT)
                return;
            // 清空列表
            PreviewList.Clear();
            // 如果需要显示打印任务中所有的标签，需要先查获取标签的页数。
            var pages = Api.GetJobPages();
            PreviewPages(pages);
        }
        protected void PreviewPages(IEnumerable<string> pages)
        {
            if (pages == null)
                return;
            List<MemoryStream> list = new List<MemoryStream>();
            foreach(var item in pages)
            {
                var page = DTPWeb.DecodeImage(item);
                if (page != null) list.Add(page);
            }
            PreviewPages(list);
        }
        protected void PreviewPages(IEnumerable<MemoryStream> pages)
        {
            if (pages == null) return;
            foreach (var item in pages)
            {
                BitmapImage img = new BitmapImage();
                img.BeginInit();
                img.StreamSource = item;
                img.EndInit();
                //
                PreviewList.Add(img);
            }
        }

        public static MemoryStream CreateMemoryStream(BitmapImage image)
        {
            using (var stream = new MemoryStream())
            {
                var encoder = new PngBitmapEncoder();
                encoder.Frames.Add(BitmapFrame.Create(image));
                encoder.Save(stream);
                return stream;
            }
        }
    }

    public class NameValue
    {
        public string Name { get; set; }
        public int Value { get; set; }

        public NameValue(string name, int value = 0)
        {
            Name = name;
            Value = value;
        }
    }
    public class JobInfo : NameValue
    {
        public string JobName { get; set; }

        public JobInfo(string name, int value = 0) : base(name, value) { }
    }
}
