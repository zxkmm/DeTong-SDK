/**
 * @file utils.ts
 * @author DothanTech (hudianxing@dothantech.com)
 * @brief PC JavaScript 版本 相关接口类型及方法定义。
 * @version 2.1
 * @date 2022-05-16
 *
 * @copyright Copyright (c) 2022
 *
 */
/**
 * PC LPAPI 接口中用到的相关常量。
 */
var CONSTANTS = {
    /**
     * post请求字符串。
     */
    METHOD_POST: "POST",
    /**
     * get请求字符串。
     */
    METHOD_GET: "GET",
    /**
     * 默认请求IP地址。
     */
    IP: "127.0.0.1",
    /**
     * 默认端口号。
     */
    PORT1: 15216,
    /**
     * 备用端口号。
     */
    PORT2: 35216,
    /**
     * 默认请求超时时间。
     */
    TIME_OUT: 2000,
    /**
     * 非本机请求超时时间。
     */
    OUTER_TIME_OUT: 5000,
    /**
     * 默认标签宽度。
     */
    LABEL_WIDTH: 40,
    /**
     * 默认标签高度。
     */
    LABEL_HEIGHT: 30,
    /**
     * 默认字体。
     */
    FONT_NAME: "黑体",
    /**
     * 默认字体高度。
     */
    FONT_HEIGHT: 3.5,
    /**
     * 相关矢量图的默认线条宽度。
     */
    LINE_WIDTH: 0.35,
    /**
     * 默认点划线线段数组。
     */
    DASH_LEN: [0.5, 0.5],
    /**
     * 默认圆角矩形的圆角半径。
     */
    CORNER_RADIUS: 1.5,
    /**
     * 默认圆形半径。
     */
    RADIUS: 5,
    /**
     * 默认矩形框宽度。
     */
    RECT_WIDTH: 20,
    /**
     * 默认图片黑白转换阈值。
     */
    THRESHOLD: 192,
    /**
     * 默认打印方式。调用print接口的打印JSON数据的时候，默认直接打印。
     */
    PRINT_ACTION: 0x1000,
};
var CONTROLS = {
    /** lpapi */
    LPAPI: "lpapi",
    /** local */
    LOCAL: "local",
};
var ACTIONS = {
    Version: "Version",
    SetSupportedPrinters: "SetSupportedPrinters",
    GetDefaultPrinter: "GetDefaultPrinter",
    SetDefaultPrinter: "SetDefaultPrinter",
    DiscoveryPrinters: "DiscoveryPrinters",
    GetPrinters: "GetPrinters",
    OpenPrinter: "OpenPrinter",
    ClosePrinter: "ClosePrinter",
    IsPrinterOpened: "IsPrinterOpened",
    IsPrinterOnline: "IsPrinterOnline",
    GetPrinterName: "GetPrinterName",
    ShowProperty: "ShowProperty",
    PrintImage: "PrintImage",
    PrintImageD: "PrintImageD",
    PrintRawData: "PrintRawData",
    PrintPackage: "PrintPackage",
    Print: "Print",
    //
    GetParam: "GetParam",
    SetParam: "SetParam",
    GetPrinterDPI: "GetPrinterDPI",
    GetItemOrientation: "GetItemOrientation",
    SetItemOrientation: "SetItemOrientation",
    GetItemHorizontalAlignment: "GetItemHorizontalAlignment",
    SetItemHorizontalAlignment: "SetItemHorizontalAlignment",
    GetItemVerticalAlignment: "GetItemVerticalAlignment",
    SetItemVerticalAlignment: "SetItemVerticalAlignment",
    StartJob: "StartJob",
    StartPreview: "StartPreview",
    AbortJob: "AbortJob",
    CommitJob: "CommitJob",
    GetJobID: "GetJobID",
    GetJobInfo: "GetJobInfo",
    GetPageInfo: "GetPageInfo",
    GetPageImage: "GetPageImage",
    StartPage: "StartPage",
    EndPage: "EndPage",
    //
    ReturnDrawResult: "ReturnDrawResult",
    DrawText: "DrawText",
    Draw1DBarcode: "Draw1DBarcode",
    Draw2DQRCode: "Draw2DQRCode",
    Draw2DPdf417: "Draw2DPdf417",
    Draw2DDataMatrix: "Draw2DDataMatrix",
    DrawRectangle: "DrawRectangle",
    FillRectangle: "FillRectangle",
    DrawRoundRectangle: "DrawRoundRectangle",
    FillRoundRectangle: "FillRoundRectangle",
    DrawEllipse: "DrawEllipse",
    FillEllipse: "FillEllipse",
    DrawLine: "DrawLine",
    DrawDashLine: "DrawDashLine",
    DrawImage: "DrawImage",
    DrawImageD: "DrawImageD",
    // local Action
    ServerInfo: "ServerInfo",
};
var CONTENT_TYPE = {
    UrlEncoded: "application/x-www-form-urlencoded;charset=UTF-8",
    Base64: "application/octet-stream;encoding=base64",
    Json: "application/json;charset:utf-8",
};
/**
 * 打印参数ID，GetParam() SetParam() 中使用。
 */
var LPA_ParamID;
(function (LPA_ParamID) {
    /** 纸张类型。对应的value值可参考属性 {@link LPA_GapType} */
    LPA_ParamID[LPA_ParamID["GapType"] = 1] = "GapType";
    /** 打印浓度。对应的value值参考 {@link LPA_PrintDarkness} */
    LPA_ParamID[LPA_ParamID["PrintDarkness"] = 2] = "PrintDarkness";
    /** 打印速度。对应的value值可参考 {@link LPA_PrintSpeed} */
    LPA_ParamID[LPA_ParamID["PrintSpeed"] = 3] = "PrintSpeed";
    /** 打印机水平方向分辨率。注意：打印模式下只能获取，不能修改 */
    LPA_ParamID[LPA_ParamID["PrinterDPIx"] = 4] = "PrinterDPIx";
    /** 打印机垂直方向分辨率。注意：打印模式下只能获取，不能修改 */
    LPA_ParamID[LPA_ParamID["PrinterDPIy"] = 5] = "PrinterDPIy";
})(LPA_ParamID || (LPA_ParamID = {}));
/**
 * 纸张间隔类型。
 */
var LPA_GapType;
(function (LPA_GapType) {
    /** 随打印机设置 */
    LPA_GapType[LPA_GapType["Unset"] = 255] = "Unset";
    /** 连续纸（小票纸） */
    LPA_GapType[LPA_GapType["None"] = 0] = "None";
    /** 定位孔 */
    LPA_GapType[LPA_GapType["Hole"] = 1] = "Hole";
    /** 间隙纸 */
    LPA_GapType[LPA_GapType["Gap"] = 2] = "Gap";
    /** 黑标纸 */
    LPA_GapType[LPA_GapType["Black"] = 3] = "Black";
})(LPA_GapType || (LPA_GapType = {}));
/**
 * 打印速度常用值。
 *
 * 实际有效值为0到4之间，255表示随打印机设置，其他为无效值。
 */
var LPA_PrintSpeed;
(function (LPA_PrintSpeed) {
    /** 随打印机设置 */
    LPA_PrintSpeed[LPA_PrintSpeed["Unset"] = 255] = "Unset";
    /** 最慢 */
    LPA_PrintSpeed[LPA_PrintSpeed["Min"] = 0] = "Min";
    /** 较慢 */
    LPA_PrintSpeed[LPA_PrintSpeed["Low"] = 1] = "Low";
    /** 正常速度 */
    LPA_PrintSpeed[LPA_PrintSpeed["Normal"] = 2] = "Normal";
    /** 较块 */
    LPA_PrintSpeed[LPA_PrintSpeed["High"] = 3] = "High";
    /** 最快 */
    LPA_PrintSpeed[LPA_PrintSpeed["Max"] = 4] = "Max";
})(LPA_PrintSpeed || (LPA_PrintSpeed = {}));
/**
 * 打印浓度常用枚举值。
 *
 * 打印浓度可以0到14之间的任意值，255表示随打印机设置，其他为无效值。
 */
var LPA_PrintDarkness;
(function (LPA_PrintDarkness) {
    /** 随打印机设置 */
    LPA_PrintDarkness[LPA_PrintDarkness["Unset"] = 255] = "Unset";
    /** 最淡 */
    LPA_PrintDarkness[LPA_PrintDarkness["Min"] = 0] = "Min";
    /** 较淡 */
    LPA_PrintDarkness[LPA_PrintDarkness["Low"] = 3] = "Low";
    /** 正常浓度 */
    LPA_PrintDarkness[LPA_PrintDarkness["Normal"] = 5] = "Normal";
    /** 较浓 */
    LPA_PrintDarkness[LPA_PrintDarkness["High"] = 9] = "High";
    /** 最浓 */
    LPA_PrintDarkness[LPA_PrintDarkness["Max"] = 14] = "Max";
})(LPA_PrintDarkness || (LPA_PrintDarkness = {}));
/**
 * 打印动作的对齐方式。
 */
var LPA_ItemAlignment;
(function (LPA_ItemAlignment) {
    /** 水平居左(垂直居上)对齐 */
    LPA_ItemAlignment[LPA_ItemAlignment["Start"] = 0] = "Start";
    /** 水平（垂直）居中对齐 */
    LPA_ItemAlignment[LPA_ItemAlignment["Center"] = 1] = "Center";
    /** 水平居右（垂直居下）对齐 */
    LPA_ItemAlignment[LPA_ItemAlignment["End"] = 2] = "End";
    /** 拉伸（多余空间使用空白填充） */
    LPA_ItemAlignment[LPA_ItemAlignment["Stretch"] = 3] = "Stretch";
    /** 放大（多余空间通过放大填充） */
    LPA_ItemAlignment[LPA_ItemAlignment["Expand"] = 4] = "Expand";
})(LPA_ItemAlignment || (LPA_ItemAlignment = {}));
/**
 * 字体样式。
 */
var LPA_FontStyle;
(function (LPA_FontStyle) {
    /** 一般字体样式 */
    LPA_FontStyle[LPA_FontStyle["Regular"] = 0] = "Regular";
    /** 粗体 */
    LPA_FontStyle[LPA_FontStyle["Bold"] = 1] = "Bold";
    /** 斜体 */
    LPA_FontStyle[LPA_FontStyle["Italic"] = 2] = "Italic";
    /** 粗斜体 */
    LPA_FontStyle[LPA_FontStyle["BoldItalic"] = 3] = "BoldItalic";
    /** 下划线 */
    LPA_FontStyle[LPA_FontStyle["Underline"] = 4] = "Underline";
    /** 删除线 */
    LPA_FontStyle[LPA_FontStyle["Strikeout"] = 8] = "Strikeout";
})(LPA_FontStyle || (LPA_FontStyle = {}));
/**
 * 绘制字符串的时候的自动换行模式。
 */
var LPA_AutoReturnMode;
(function (LPA_AutoReturnMode) {
    /** 不进行自动换行 */
    LPA_AutoReturnMode[LPA_AutoReturnMode["None"] = 0] = "None";
    /** 按照字自动换行 */
    LPA_AutoReturnMode[LPA_AutoReturnMode["Char"] = 1] = "Char";
    /** 按照词自动换行 */
    LPA_AutoReturnMode[LPA_AutoReturnMode["Word"] = 2] = "Word";
})(LPA_AutoReturnMode || (LPA_AutoReturnMode = {}));
/**
 * 一维条码编码类型。
 *
 * UPC-A, UPC-E, EAN13, EAN8, ISBN 统称为商品码，编码和显示方式类似；
 * 只能包含数字，对于支持两段的方式的编码，使用“+”来作为前后两段的分隔；
 * 都有校验字符，一般为0～9。对于 ISBN 编码，其校验字符可能为“X”。
 */
var LPA_BarcodeType;
(function (LPA_BarcodeType) {
    /**
     * 支持长度为：12、12+2、12+5，显示为 1+5+5+1
     * 输入长度为 12：表示已经有校验码；
     *            11：没有校验码，程序会自动添加；
     *          < 11：加上前导零，然后自动添加校验码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_UPC_A"] = 20] = "LPA_1DBT_UPC_A";
    /**
     * 支持长度为：8、8+2、8+5，显示为1+6+1。其中第一位是编码数字类型，只
     * 能为0/1，表示采用的数字系统；第八位是校验位，采用 upc_check() 进行校验。
     * 输入长度为 8：表示已经有校验码，如果第一个字符不是0/1，则强制换成0来处理；
     *           7：没有校验码，程序会自动添加。如果第一个字符不是0/1，则强制换成0来处理；
     *           6：没有校验码，程序会自动添加。同时采用数字系统 0 来进行编码。
     *         < 6：加上前导 0 到长度为 6 之后，再进行编码。
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_UPC_E"] = 21] = "LPA_1DBT_UPC_E";
    /**
     * 支持长度为：13、13+2、13+5、8、8+2、8+5、5、2。
     * 输入长度为 13：表示已经有校验码；
     *           12：没有校验码，程序会自动添加；
     *         6~11：加上前导零之后，当成长度为 12 的处理；
     * 输入长度为 3/4/5：表示编码成长度为 5 的附加条码；
     *             1/2：表示编码成长度为 2 的附加条码。
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_EAN13"] = 22] = "LPA_1DBT_EAN13";
    /**
     * 在内部和 EAN13 编码统一处理
     *
     * 输入长度为 8：表示已经有校验码；
     * 输入长度大于 8 时，切换成 EAN13 码进行编码；
     * 输入长度 <= 5 时，切换成 EAN13 码进行编码；
     * 输入长度为 7：没有校验码，程序会自动添加；
     *           6：加上前导零，然后自动添加校验码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_EAN8"] = 23] = "LPA_1DBT_EAN8";
    /**
     * 1、"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%"
     * 2、以 * 为显示用引导和结束字符（编码中没有，仅仅显示用）
     * 3、每个字符用10个编码（显示长度为13）
     * 4、引导字符10个（显示长度为13），结束字符9个（显示长度12）
     * ==》字符数为 10+ 9+10×N
     *        显示长度 13+12+13×N
     *        10个字符 13+12+13×10 = 155像素
     * 如果编码内容中包含不支持的字符，则会切换成 CODE 128 编码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_CODE39"] = 24] = "LPA_1DBT_CODE39";
    /**
     * 1、0~9
     * 2、加校验码之后长度必须是偶数，否则在头部加上 0
     * 3、每个字符用5个编码（显示长度为 7）
     * 4、引导字符 4 个（显示长度为 4），结尾字符 3 个（显示长度是 4）
     * ==》字符数为 4 + 3 + 10*（N/2）
     *        显示长度 4 + 4 + 14*（N/2）
     *        10个字符 4+4+14×5 = 78像素
     * 如果编码内容中包含不支持的字符，则会切换成 CODE 128 编码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_ITF25"] = 25] = "LPA_1DBT_ITF25";
    /**
     * 1、"0123456789-$:/.+ABCD"，多应用于医疗领域
     * 2、引导/结束字符 A～D，都会被转化为大写
     * 3、加上引导字符/校验码之后，数据统一编码；
     * 4、每个字符用8个编码（显示长度为 10～11）
     * ==》字符数为 8×N，显示长度为 10×N～11×N
     *        10个字符10×10 + 11×2 = 122像素
     * 如果编码内容中包含不支持的字符，则会切换成 CODE 128 编码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_CODABAR"] = 26] = "LPA_1DBT_CODABAR";
    /**
     * 0x00～0x7F
     * 如果编码内容中包含不支持的字符，则会切换成 CODE 128 编码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_CODE93"] = 27] = "LPA_1DBT_CODE93";
    /**
     * 0x00～0xFF，CODE 128 A/B 支持全字符，对于 CODE 128 C 编码：
     *
     * 1、有固定方式的校验码，都是数字，必须是偶数长度
     * 2、引导字符 105，结束字符 106
     * 3、条码宽度范围为1～4，每个字符用7个编码（显示长度为11）
     * ==》字符数为 7+7+7+7×（N/2）
     *        显示长度 11+11+11+11×（N/2）
     *        10个字符 11+11+11+11×（10/2）= 88像素
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_CODE128"] = 28] = "LPA_1DBT_CODE128";
    /**
     * 0~9，最后一位可能为 0~9, X（校验字符）
     * 13：必须是 978/979 前导，用 EAN13 编码，isbn13_check
     * 10：加上 978 前导之后，用 EAN13 编码，isbn_check
     * <=9：加上 0 前导之后，Check，然后再加上 978 前导，用 EAN 13 编码
     * 如果编码内容中包含不支持的字符，则会切换成 CODE 128 编码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_ISBN"] = 29] = "LPA_1DBT_ISBN";
    /**
     * EXTENDED CODE 39，0x00～0x7F
     *
     * 对于 CODE 39 不支持的字符，采用转义之后，用两个字符来表示
     * 如果编码内容中包含不支持的字符，则会切换成 CODE 128 编码；
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_ECODE39"] = 30] = "LPA_1DBT_ECODE39";
    /**
     * 根据编码内容，自动选择最适合的编码类型进行编码。
     *
     * 1、ITF25（内容长度为偶数，并且全部为数字时）
     * 2、CODABAR（如果内容以A/B/C/D开头，又以A/B/C/D结尾的话）
     * 3、CODE 39
     * 4、CODE 128
     */
    LPA_BarcodeType[LPA_BarcodeType["LPA_1DBT_AUTO"] = 60] = "LPA_1DBT_AUTO";
})(LPA_BarcodeType || (LPA_BarcodeType = {}));
/**
 * 打印任务名称。
 *
 * 在startJob接口中可以通过设置不同的 jobName 获取不同的base64图片。
 */
var LPA_JobNames;
(function (LPA_JobNames) {
    /** 用于生成白色底色预览图片 */
    LPA_JobNames["Preview"] = "#!#Preview#!#";
    /** 用于生成透明底色的透明图片 */
    LPA_JobNames["Transparent"] = "#!#Transparent#!#";
    /** 默认打印任务名称 */
    LPA_JobNames["Print"] = "dtpweb";
})(LPA_JobNames || (LPA_JobNames = {}));
/**
 * JSON数据打印action参数。
 */
var LPA_PrintActions;
(function (LPA_PrintActions) {
    /** 返回用于打印的二进制数据。 */
    LPA_PrintActions[LPA_PrintActions["PrintData"] = 1] = "PrintData";
    /** 返回BASE64编码的预览图片，白色底色，格式："data:image/png;base64,..." */
    LPA_PrintActions[LPA_PrintActions["PrevBase64"] = 2] = "PrevBase64";
    /** 返回预览用的url图片，eg: https://... */
    LPA_PrintActions[LPA_PrintActions["PrevUrl"] = 4] = "PrevUrl";
    /** 获取透明底色的预览图片 */
    LPA_PrintActions[LPA_PrintActions["Transparent"] = 128] = "Transparent";
    /** 获取透明底色的 BASE64 图片 */
    LPA_PrintActions[LPA_PrintActions["TransBase64"] = 130] = "TransBase64";
    /** 直接打印给定的JSON数据 */
    LPA_PrintActions[LPA_PrintActions["Print"] = 4096] = "Print";
})(LPA_PrintActions || (LPA_PrintActions = {}));
/** 创建预览任务时生成图片的模式 */
var LPA_BackgroundMode;
(function (LPA_BackgroundMode) {
    /** 直接打印 */
    LPA_BackgroundMode[LPA_BackgroundMode["Print"] = 0] = "Print";
    /** 生成白色底色的图片 */
    LPA_BackgroundMode[LPA_BackgroundMode["White"] = 1] = "White";
    /** 生成透明底色的图片 */
    LPA_BackgroundMode[LPA_BackgroundMode["Transparent"] = 2] = "Transparent";
})(LPA_BackgroundMode || (LPA_BackgroundMode = {}));
var LPA_Result;
(function (LPA_Result) {
    /** http请求成功状态码 */
    LPA_Result[LPA_Result["OK"] = 0] = "OK";
    /** 函数参数错误 */
    LPA_Result[LPA_Result["PARAM_ERROR"] = 1] = "PARAM_ERROR";
    /** 系统错误，如创建 Windows 对象失败、内存不足等 */
    LPA_Result[LPA_Result["SYSTEM_ERROR"] = 2] = "SYSTEM_ERROR";
    /** 没有找到 LabelPrintAPI 支持的打印机 */
    LPA_Result[LPA_Result["NO_SUPPORTED_PRINTER"] = 3] = "NO_SUPPORTED_PRINTER";
    /** API 不支持指定名称的打印机 */
    LPA_Result[LPA_Result["UNSUPPORTED_PRINTER"] = 4] = "UNSUPPORTED_PRINTER";
    /** 没有需要打印的数据 */
    LPA_Result[LPA_Result["NO_PRINT_DATA"] = 5] = "NO_PRINT_DATA";
    /** 没有打印页面尺寸信息 */
    LPA_Result[LPA_Result["NO_PAGE_DIMENSION"] = 6] = "NO_PAGE_DIMENSION";
    /** 无效的图片文件 */
    LPA_Result[LPA_Result["INVALID_FILE"] = 7] = "INVALID_FILE";
    /** 不支持的功能 */
    LPA_Result[LPA_Result["UNSUPPORTED_FUNCTION"] = 8] = "UNSUPPORTED_FUNCTION";
    /** 字体名称错误 */
    LPA_Result[LPA_Result["INVALID_FONT_NAME"] = 9] = "INVALID_FONT_NAME";
    /** 网络请求失败 */
    LPA_Result[LPA_Result["NETWORK_FAILED"] = 90] = "NETWORK_FAILED";
    /** 网络请求超时 */
    LPA_Result[LPA_Result["NETWORK_TIMEOUT"] = 91] = "NETWORK_TIMEOUT";
    /** 网络请求错误 */
    LPA_Result[LPA_Result["NETWORK_ERROR"] = 92] = "NETWORK_ERROR";
    /** 网络请求被取消 */
    LPA_Result[LPA_Result["NETWORK_ABORT"] = 93] = "NETWORK_ABORT";
    /** 不被支持的http请求环境 */
    LPA_Result[LPA_Result["NETWORK_UNSUPPORTED"] = 94] = "NETWORK_UNSUPPORTED";
    /** 被捕获的未知网络异常 */
    LPA_Result[LPA_Result["NETWORK_EXCEPTION"] = 95] = "NETWORK_EXCEPTION";
})(LPA_Result || (LPA_Result = {}));
/**
 * 一维条码编码类型。
 */
var LPA_BarcodeFlags;
(function (LPA_BarcodeFlags) {
    /** 不显示供人识读字符。 */
    LPA_BarcodeFlags[LPA_BarcodeFlags["ShowReadNone"] = 0] = "ShowReadNone";
    /** 是否在条码下方显示供人识读字符？ */
    LPA_BarcodeFlags[LPA_BarcodeFlags["ShowReadDown"] = 1] = "ShowReadDown";
    /** 是否在条码上方显示供人识读字符？ */
    LPA_BarcodeFlags[LPA_BarcodeFlags["ShowReadUp"] = 2] = "ShowReadUp";
    /** 是否显示 CODE 39 编码的起始终止符？ */
    LPA_BarcodeFlags[LPA_BarcodeFlags["ShowStartStop"] = 4] = "ShowStartStop";
    /** 是否自动修正商品码的校验字符？ */
    LPA_BarcodeFlags[LPA_BarcodeFlags["EanCheckCode"] = 8] = "EanCheckCode";
})(LPA_BarcodeFlags || (LPA_BarcodeFlags = {}));
/**
 * QRCode 字符串编码方式。
 */
var LPA_QRTextEncoding;
(function (LPA_QRTextEncoding) {
    /** Unicode 编码 */
    LPA_QRTextEncoding[LPA_QRTextEncoding["Unicode"] = 0] = "Unicode";
    /** Ansi/DBCS 编码*/
    LPA_QRTextEncoding[LPA_QRTextEncoding["Ansi"] = 1] = "Ansi";
    /** UTF-8 编码*/
    LPA_QRTextEncoding[LPA_QRTextEncoding["UTF8"] = 2] = "UTF8";
})(LPA_QRTextEncoding || (LPA_QRTextEncoding = {}));
/**
 * QRCode 编码模式。
 */
var LPA_QREncodeMode;
(function (LPA_QREncodeMode) {
    /** Numeric mode */
    LPA_QREncodeMode[LPA_QREncodeMode["ModeNum"] = 0] = "ModeNum";
    /** Alphabet-numeric mode */
    LPA_QREncodeMode[LPA_QREncodeMode["ModeAn"] = 1] = "ModeAn";
    /**8-bit data mode */
    LPA_QREncodeMode[LPA_QREncodeMode["Mode8Bit"] = 2] = "Mode8Bit";
    /**Kanji (shift-jis) mode */
    LPA_QREncodeMode[LPA_QREncodeMode["ModeKanji"] = 3] = "ModeKanji";
    /**Internal use only */
    LPA_QREncodeMode[LPA_QREncodeMode["ModeStructure"] = 4] = "ModeStructure";
    /**ECI mode */
    LPA_QREncodeMode[LPA_QREncodeMode["ModeEci"] = 5] = "ModeEci";
    /**FNC1, first position */
    LPA_QREncodeMode[LPA_QREncodeMode["ModeFnc1First"] = 6] = "ModeFnc1First";
    /**FNC1, second position */
    LPA_QREncodeMode[LPA_QREncodeMode["ModeFnc1Second"] = 7] = "ModeFnc1Second";
})(LPA_QREncodeMode || (LPA_QREncodeMode = {}));
/**
 * QRCode 纠错模式。
 */
var LPA_QREccLevel;
(function (LPA_QREccLevel) {
    /** Low */
    LPA_QREccLevel[LPA_QREccLevel["EccLevel_L"] = 0] = "EccLevel_L";
    /** Middle */
    LPA_QREccLevel[LPA_QREccLevel["EccLevel_M"] = 1] = "EccLevel_M";
    /** Quality */
    LPA_QREccLevel[LPA_QREccLevel["EccLevel_Q"] = 2] = "EccLevel_Q";
    /** High */
    LPA_QREccLevel[LPA_QREccLevel["EccLevel_H"] = 3] = "EccLevel_H";
})(LPA_QREccLevel || (LPA_QREccLevel = {}));
/**
 * Pdf417 字符串编码方式。
 */
var LPA_P417TextEncoding;
(function (LPA_P417TextEncoding) {
    /** Unicode 编码 */
    LPA_P417TextEncoding[LPA_P417TextEncoding["Unicode"] = 0] = "Unicode";
    /** Ansi/DBCS 编码 */
    LPA_P417TextEncoding[LPA_P417TextEncoding["Ansi"] = 1] = "Ansi";
    /** UTF-8 编码 */
    LPA_P417TextEncoding[LPA_P417TextEncoding["UTF8"] = 2] = "UTF8";
})(LPA_P417TextEncoding || (LPA_P417TextEncoding = {}));
/**
 * Pdf417 编码模式。
 */
var LPA_P417EncodeMode;
(function (LPA_P417EncodeMode) {
    /** Auto mode */
    LPA_P417EncodeMode[LPA_P417EncodeMode["ModeAuto"] = 0] = "ModeAuto";
    /** Numeric mode */
    LPA_P417EncodeMode[LPA_P417EncodeMode["ModeNumeric"] = 1] = "ModeNumeric";
    /** Text mode */
    LPA_P417EncodeMode[LPA_P417EncodeMode["ModeText"] = 2] = "ModeText";
    /** Binary mode */
    LPA_P417EncodeMode[LPA_P417EncodeMode["ModeBinary"] = 3] = "ModeBinary";
})(LPA_P417EncodeMode || (LPA_P417EncodeMode = {}));
/**
 * Pdf417 纠错模式。
 */
var LPA_P417EccLevel;
(function (LPA_P417EccLevel) {
    /** Auto */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_Auto"] = 0] = "EccLevel_Auto";
    /** 1 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_1"] = 1] = "EccLevel_1";
    /** 2 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_2"] = 2] = "EccLevel_2";
    /** 3 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_3"] = 3] = "EccLevel_3";
    /** 4 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_4"] = 4] = "EccLevel_4";
    /** 5 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_5"] = 5] = "EccLevel_5";
    /** 6 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_6"] = 6] = "EccLevel_6";
    /** 7 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_7"] = 7] = "EccLevel_7";
    /** 8 */
    LPA_P417EccLevel[LPA_P417EccLevel["EccLevel_8"] = 8] = "EccLevel_8";
})(LPA_P417EccLevel || (LPA_P417EccLevel = {}));
var LPA_SourceImageFormat;
(function (LPA_SourceImageFormat) {
    /**
     * 直接传递给打印机的原始打印数据
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_RAWDATA"] = 0] = "LPASIF_RAWDATA";
    /**
     * 每个点用一个比特位表示的黑白点阵数据，1 表示黑点（需要打印），0 表示白点
     *
     * 数据从上至下按照行来存放，每行需要的字节数为 (width + 7) / 8。
     * 每个字节表示 8 个点，高位表示左边的点，低位表示右边的点。
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_BPP_1"] = 1] = "LPASIF_BPP_1";
    /**
     * 同 LPASIF_BPP_1，只是 0 表示黑点（需要打印），1 表示白点
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_BPP_1N"] = 2] = "LPASIF_BPP_1N";
    /**
     * 每个点用四个字节表示的点阵数据，四个字节依次表示 RGBA
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_32_RGBA"] = 32] = "LPASIF_32_RGBA";
    /**
     * 每个点用四个字节表示的点阵数据，四个字节依次表示 BGRA
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_32_BGRA"] = 33] = "LPASIF_32_BGRA";
    /**
     * 每个点用四个字节表示的点阵数据，四个字节依次表示 RGB，最高字节未使用
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_32_RGB"] = 34] = "LPASIF_32_RGB";
    /**
     * 每个点用四个字节表示的点阵数据，四个字节依次表示 BGR，最高字节未使用
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_32_BGR"] = 35] = "LPASIF_32_BGR";
    /**
     * 简易报文格式的点阵数据，1 表示黑点（需要打印），0 表示白点，对于标签打印而言，压缩效率还是不错的。
     *
     * 打印行：Ax 前导零字节数 打印字节数 xxxxxx
     *        首字节的4个比特，给前导零用2位，给打印字节用2位，也就是说打印数据最多为1K字节，8K个点。
     * 打印行：B0 xxxxxx
     *        打印字节数等于点阵数据的行字节数，(width + 7) / 8。
     * 重复行：Bx
     *        首字节的4个比特，给行数使用，也就是说行数最大值为 15。
     * 空白行：110xxxxx（也即 Cx/Dx）
     *        首字节的5个比特，给行数使用，也就是说行数最大值为 31。
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_PACKAGE"] = 90] = "LPASIF_PACKAGE";
    /**
     * 图片文件数据，支持 PNG/JPG/BMP 等几乎所有常见图片文件格式。
     *
     * 如果图片文件数据采用 Base64 编码（通过设置 dLen = 0 实现），则会自动过滤字符串开始的诸如
     * “data:image/png;base64,”的头部字符串，这种头部字符串一般在 JS 中被广泛使用，用于指示图片
     * 数据格式。接口会自动查找头部的部分字符，一直找到“,”为止。如果没有找到“,”，则数据从头开始。
     */
    LPA_SourceImageFormat[LPA_SourceImageFormat["LPASIF_IMAGEDATA"] = 93] = "LPASIF_IMAGEDATA";
})(LPA_SourceImageFormat || (LPA_SourceImageFormat = {}));
var LPA_ContentType;
(function (LPA_ContentType) {
    LPA_ContentType[LPA_ContentType["UrlEncoded"] = 0] = "UrlEncoded";
    LPA_ContentType[LPA_ContentType["Base64"] = 1] = "Base64";
    LPA_ContentType[LPA_ContentType["Json"] = 2] = "Json";
})(LPA_ContentType || (LPA_ContentType = {}));
var LPA_DrawType;
(function (LPA_DrawType) {
    LPA_DrawType["Text"] = "text";
    LPA_DrawType["Barcode"] = "barcode";
    LPA_DrawType["QRCode"] = "qrcode";
    LPA_DrawType["Pdf417"] = "pdf417";
    LPA_DrawType["DataMatrix"] = "dataMatrix";
    LPA_DrawType["Image"] = "image";
    LPA_DrawType["Rect"] = "rectangle";
    LPA_DrawType["RoundRect"] = "roundRectangle";
    LPA_DrawType["Ellipse"] = "ellipse";
    LPA_DrawType["Line"] = "line";
    LPA_DrawType["DashLine"] = "dashLine";
})(LPA_DrawType || (LPA_DrawType = {}));
var utils = {
    scaleUnit: 0,
    getJobAction: function (jobName) {
        var jName = jobName || "";
        // var value = typeof jobTypeValue === 'number' ? jobTypeValue : getJobTypeValue();
        if (jName.startsWith("#!#Prev")) {
            return 0x02;
        }
        else if (jName.startsWith("#!#Trans")) {
            return 0x82;
        }
        else {
            return 0x1000;
        }
    },
    assignValue: function (target, src) {
        var result = target ? target : {};
        for (var key in src) {
            if (Object.prototype.hasOwnProperty.call(src, key)) {
                if (this.isPlainObject(result[key]) && this.isPlainObject(src[key])) {
                    this.assignValue(result[key], src[key]);
                }
                else if (this.isPlainObject(src[key])) {
                    result[key] = this.assignValue({}, src[key]);
                }
                else if (Array.isArray(src[key])) {
                    result[key] = src[key].slice();
                }
                else {
                    result[key] = src[key];
                }
            }
        }
        //
        return result;
    },
    merge: function (target) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        var result = target ? target : {};
        if (!other)
            return result;
        //
        for (var i = 0; i < other.length; i++) {
            result = this.assignValue(result, other[i]);
        }
        //
        return result;
    },
    isObject: function (val) {
        return val !== null && typeof val === "object";
    },
    isPlainObject: function (val) {
        if (toString.call(val) !== "[object Object]") {
            return false;
        }
        var prototype = Object.getPrototypeOf(val);
        return prototype === null || prototype === Object.prototype;
    },
    isFunction: function (val) {
        return toString.call(val) === "[object Function]";
    },
    isStream: function (val) {
        return this.isObject(val) && this.isFunction(val.pipe);
    },
    isArrayBuffer: function (val) {
        return toString.call(val) === "[object ArrayBuffer]";
    },
    isArray: function (val) {
        return Array.isArray ? Array.isArray(val) : Object.prototype.toString.call(val) === "[object Array]";
    },
    isString: function (val) {
        return typeof val === "string";
    },
    isNumber: function (val) {
        return typeof val === "number";
    },
    isHttpsRequest: function (protocol) {
        return /https:?/.test(protocol);
    },
    parseArray: function (val, count) {
        if (count === void 0) { count = 1; }
        var arr = [];
        if (utils.isArray(val))
            return val;
        if (typeof val === "string")
            return val.split(",");
        if (typeof val === "number") {
            for (var i = 0; i < count; i++) {
                arr.push(val);
            }
        }
        return arr;
    },
    parseMargin: function (options) {
        var _a, _b, _c, _d;
        var margins = [];
        if (options.margin) {
            margins = utils.parseArray(options.margin, 4);
            if (margins.length === 1) {
                margins = [margins[0], margins[0], margins[0], margins[0]];
            }
            else if (margins.length === 2) {
                margins = [margins[0], margins[1], margins[0], margins[1]];
            }
            else if (margins.length === 3) {
                margins.push(margins[1]);
            }
        }
        if (options.marginH) {
            var arr = utils.parseArray(options.marginH, 2);
            margins[1] = (_a = arr[0]) !== null && _a !== void 0 ? _a : 0;
            margins[3] = (_b = arr[1]) !== null && _b !== void 0 ? _b : arr[0];
        }
        if (options.marginV) {
            var arr = utils.parseArray(options.marginV, 2);
            margins[0] = (_c = arr[0]) !== null && _c !== void 0 ? _c : 0;
            margins[2] = (_d = arr[1]) !== null && _d !== void 0 ? _d : arr[0];
        }
        return margins;
    },
    getParamString: function (data) {
        data = data || {};
        var values = [];
        for (var key in data) {
            var v = data[key];
            if (v === null || v === undefined)
                continue;
            if (typeof v !== "object" && typeof v !== "function") {
                values.push("".concat(key, "=").concat(encodeURIComponent(v)));
            }
        }
        return values.length > 0 ? values.join("&") : "";
    },
    getRequestData: function (keys, values) {
        if (values === null || values === undefined)
            values = [];
        else if (typeof values !== "object") {
            values = [values];
        }
        //
        if (values.length && typeof values[0] === "object")
            return values[0];
        //
        var obj = {};
        if (typeof keys === "string")
            keys = [keys];
        if (keys.length < 1 || !keys[0])
            return obj;
        //
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = values[i];
        }
        return obj;
    },
    buildURL: function (baseUrl, param) {
        var paramArgs = typeof param === "string" ? param : this.getParamString(param);
        return paramArgs ? "".concat(baseUrl, ":").concat(paramArgs) : baseUrl;
    },
    request: function (config, resolve) {
        if (typeof XMLHttpRequest !== "undefined") {
            this.requestXMLHttp(config, resolve);
        }
        else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
            this.requestNodeHttp(config, resolve);
        }
        else {
            resolve({
                statusCode: LPA_Result.NETWORK_UNSUPPORTED,
                resultInfo: "not supported http request environment!",
            });
        }
    },
    requestXMLHttp: function (config, resolve) {
        var http = new XMLHttpRequest();
        var ipAddress = config.host || CONSTANTS.IP;
        var port = config.port || CONSTANTS.PORT1;
        var baseUrl = config.baseUrl || "http://".concat(ipAddress, ":").concat(port);
        var data = config.data;
        var requestHeaders = config.headers;
        var result;
        if (config.url && config.url[0] === "/")
            config.url = config.url.substring(1);
        var requestUrl = "".concat(baseUrl, "/").concat(config.url);
        try {
            http.open(config.method || CONSTANTS.METHOD_GET, requestUrl, !config.sync);
            // Set the request timeout in MS
            // 注意：同步接口中不能用timeout，否则会抛异常。
            if (config.timeout && !config.sync)
                http.timeout = config.timeout;
            //
            var onloadend_1 = function () {
                if (!http) {
                    return;
                }
                if (http.status === 200) {
                    // 请求成功；
                    result = JSON.parse(http.responseText);
                }
                else {
                    // 请求失败；
                    result = {
                        statusCode: LPA_Result.NETWORK_FAILED,
                        resultInfo: http.responseText,
                    };
                }
                resolve(result);
                // Clean up request
                http = null;
            };
            //
            if ("onloadend" in http) {
                // Use onloadend if available
                http.onloadend = onloadend_1;
            }
            else {
                // Listen for ready state to emulate onloadend
                // 请求结果处理函数；
                http.onreadystatechange = function () {
                    if (!http || http.readyState !== 4) {
                        return;
                    }
                    // The request errored out and we didn't get a response, this will be
                    // handled by onerror instead
                    // With one exception: request that using file: protocol, most browsers
                    // will return status as 0 even though it's a successful request
                    if (http.status === 0 && !(http.responseURL && http.responseURL.indexOf("file:") === 0)) {
                        return;
                    }
                    // readystate handler is calling before onerror or ontimeout handlers,
                    // so we should call onloadend on the next 'tick'
                    setTimeout(onloadend_1);
                };
            }
            // Handle browser request cancellation (as opposed to a manual cancellation)
            http.onabort = function handleAbort() {
                if (!http) {
                    return;
                }
                resolve({
                    statusCode: LPA_Result.NETWORK_ABORT,
                    resultInfo: "Request aborted!",
                });
                // Clean up request
                http = null;
            };
            // Handle low level network errors
            http.onerror = function handleError() {
                // Real errors are hidden from us by the browser
                // onerror should only fire if it's a network error
                resolve({
                    statusCode: LPA_Result.NETWORK_ERROR,
                    resultInfo: "Network Error",
                });
                // Clean up request
                http = null;
            };
            // Handle timeout
            http.ontimeout = function handleTimeout() {
                resolve({
                    statusCode: LPA_Result.NETWORK_TIMEOUT,
                    resultInfo: config.timeout ? "timeout of ".concat(config.timeout, "ms exceeded") : "timeout exceeded",
                });
                // Clean up request
                http = null;
            };
            // Add headers to the request
            if (requestHeaders && "setRequestHeader" in http) {
                for (var key in requestHeaders) {
                    if (typeof data === "undefined" && key.toLowerCase() === "content-type") {
                        // Remove Content-Type if data is undefined
                        delete requestHeaders[key];
                    }
                    else {
                        // Otherwise add header to the request
                        http.setRequestHeader(key, requestHeaders[key]);
                    }
                }
            }
            http.send(data);
        }
        catch (e) {
            resolve({
                statusCode: LPA_Result.NETWORK_EXCEPTION,
                resultInfo: e,
            });
        }
    },
    requestNodeHttp: function (config, resolve) {
        var http = require("http");
        if (config.url && config.url[0] !== "/")
            config.url = "/".concat(config.url);
        //
        var options = {
            host: config.host || CONSTANTS.IP,
            port: config.port || CONSTANTS.PORT1,
            method: config.method || CONSTANTS.METHOD_GET,
            path: config.url,
            headers: config.headers,
        };
        var response = "";
        // 发出一个request
        var client = http.request(options, function (res) {
            //  res是响应
            // 'data'当请求体数据到来时该事件被触发，提供一个chunk表示接受的数据
            res.on("data", function (chunk) {
                response += chunk;
            });
            // 'end'当请求体数据传输完毕事件除法，不再有数据
            res.on("end", function () {
                var result = {
                    statusCode: LPA_Result.NETWORK_EXCEPTION,
                    resultInfo: response,
                };
                try {
                    result = JSON.parse(response);
                }
                catch (error) {
                    console.log(error);
                }
                resolve(result);
            });
            res.on("error", function (err) {
                if (http.aborted)
                    return;
                resolve({
                    statusCode: LPA_Result.NETWORK_ERROR,
                    resultInfo: err,
                });
            });
        });
        // Handle errors
        // http请求异常时触发
        client.on("error", function (err) {
            resolve({
                statusCode: LPA_Result.NETWORK_FAILED,
                resultInfo: err,
            });
        });
        // set tcp keep alive to prevent drop connection by peer
        client.on("socket", function (socket) {
            // default interval of sending ack packet is 1 minute
            socket.setKeepAlive(true, 1000 * 60);
        });
        // Handle request timeout
        if (config.timeout) {
            // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
            // var timeout = parseInt(config.timeout, 10);
            var timeout = config.timeout;
            // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
            // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
            // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
            // And then these socket which be hang up will devoring CPU little by little.
            // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
            client.setTimeout(timeout, function () {
                client.destroy();
                resolve({
                    statusCode: LPA_Result.NETWORK_TIMEOUT,
                    resultInfo: config.timeout ? "timeout of ".concat(config.timeout, "ms exceeded") : "timeout exceeded",
                });
            });
        }
        // Send the request
        client.end(config.data);
    },
    /**
     * 如果当前使用的单位为毫米，则需要将毫米转换为0.01毫米，因为当前接口还不支持毫米单位。
     */
    unitConvert: function (value) {
        return this.scaleUnit === 1 && value ? value * 100 : value;
    },
    poundToMm: function (value) {
        return (value * 25.4) / 72;
    },
    mmToPound: function (value) {
        return (value * 72) / 25.4;
    },
    unitConvertOfDrawBase: function (options, margins) {
        options = options || {};
        var margin = margins || [];
        // offset1 表示Margin
        var offsetX1 = margin[3] || 0;
        var offsetY1 = margin[0] || 0;
        // offset2 表示用户指定的offset
        var offsetX2 = margin[4] || 0;
        var offsetY2 = margin[5] || 0;
        var x = options.x || 0;
        var y = options.y || 0;
        //
        options.x = this.unitConvert(x + offsetX1 + offsetX2);
        options.y = this.unitConvert(y + offsetY1 + offsetY2);
        options.width = this.unitConvert(options.width);
        options.height = this.unitConvert(options.height);
        // 底层接口只支持0，1，2，3
        if (options.orientation && options.orientation > 3) {
            options.orientation = (options.orientation / 90);
        }
        //
        return options;
    },
    unitConvertOfFillRect: function (options, margins) {
        options = this.unitConvertOfDrawBase(options, margins);
        //
        options.width = options.width || this.unitConvert(CONSTANTS.RECT_WIDTH);
        options.height = options.height || options.width;
        options.cornerWidth = this.unitConvert(options.cornerWidth);
        options.cornerHeight = this.unitConvert(options.cornerHeight) || options.cornerWidth;
        //
        return options;
    },
    unitConvertOfDrawRect: function (options, margins) {
        options = this.unitConvertOfFillRect(options, margins);
        options.lineWidth = this.unitConvert(options.lineWidth || CONSTANTS.LINE_WIDTH);
        //
        return options;
    },
    unitConvertOfLine: function (options, margins) {
        var _a, _b;
        options = options || {};
        var margin = margins || [];
        var offsetX1 = margin[3] || 0;
        var offsetY1 = margin[0] || 0;
        //
        var offsetX2 = margin[4] || 0;
        var offsetY2 = margin[5] || 0;
        var x1 = options.x1 || 0;
        var y1 = options.y1 || 0;
        var x2 = (_a = options.x2) !== null && _a !== void 0 ? _a : x1;
        var y2 = (_b = options.y2) !== null && _b !== void 0 ? _b : y1;
        //
        options.x1 = this.unitConvert(x1 + offsetX1 + offsetX2);
        options.y1 = this.unitConvert(y1 + offsetY1 + offsetY2);
        options.x2 = this.unitConvert(x2 + offsetX1 + offsetX2);
        options.y2 = this.unitConvert(y2 + offsetY1 + offsetY2);
        options.lineWidth = this.unitConvert(options.lineWidth || CONSTANTS.LINE_WIDTH);
        // 最终以字符串方式发送，所以字符串不需要做特殊处理。
        if (!options.dashLens && utils.isArray(options.dashLen)) {
            options.dashLens = options.dashLen;
            options.dashLen = undefined;
        }
        else if (!options.dashLen && typeof options.dashLens === "string") {
            options.dashLen = options.dashLens;
            options.dashLens = undefined;
        }
        // 先将字符串转换成数组，方便进行单位转换
        if (typeof options.dashLen === "string") {
            options.dashLens = options.dashLen.split(",");
        }
        if (options.dashLens && options.dashLens.length > 0) {
            if (options.dashLens.length === 1)
                options.dashLens.push(options.dashLens[0]);
            for (var i = 0; i < options.dashLens.length; i++) {
                options.dashLens[i] = this.unitConvert(options.dashLens[i]);
            }
            options.dashLen = options.dashLens.join(",");
            // options.dashCount = options.dashLens.length;
            // 如果设置了dashLens，则在 JSON 打印的时候无法正常绘制虚线。
            delete options.dashLens;
        }
        // 底层接口只支持0，1，2，3
        if (options.orientation && options.orientation > 3) {
            options.orientation = (options.orientation / 90);
        }
        //
        return options;
    },
    checkTextOptions: function (options) {
        options.fontHeight = utils.unitConvert(options.fontHeight);
        //
        options.charSpace = utils.unitConvert(options.charSpace);
        if (typeof options.lineSpace === "number")
            options.lineSpace = utils.unitConvert(options.lineSpace);
        // 缩进
        if (!options.leadingIndent) {
            if (options.leadingIndentChars) {
                // leadingIndent = 10表示向左缩进1个字符的高度。
                options.leadingIndent = options.leadingIndentChars * 10;
                delete options.leadingIndentChars;
            }
            else if (options.leadingIndentMM) {
                // leadingIndent = 1100,表示向左缩进1mm的宽度。
                if (options.leadingIndentMM >= 0.01)
                    options.leadingIndent = options.leadingIndentMM * 100 + 1000;
                else if (options.leadingIndentMM <= -0.01)
                    options.leadingIndent = options.leadingIndentMM * 100 - 1000;
                //
                delete options.leadingIndentMM;
            }
            else if (options.leadingIndentColon) {
                // 1000表示自动查找字符串中的冒号(":"或者"：")，按冒号前的长度（包括冒号）进行缩进。
                options.leadingIndent = 1000;
                delete options.leadingIndentColon;
            }
        }
        if (options.leadingIndent === 0)
            delete options.leadingIndent;
        // 绘制区域
        if (Array.isArray(options.regionCorners)) {
            for (var i = 0; i < options.regionCorners.length; i++) {
                options.regionCorners[i] = utils.unitConvert(options.regionCorners[i]);
            }
            options.regionCorners = options.regionCorners.join(",");
        }
        if (!options.regionCorners) {
            var cornerList = [];
            // leftUp
            if (options.regionLeftUpCorner) {
                cornerList[0] = options.regionLeftUpCorner;
                delete options.regionLeftUpCorner;
            }
            if (options.regionRightUpCorner) {
                cornerList[1] = options.regionRightUpCorner;
                delete options.regionRightUpCorner;
            }
            if (options.regionRightBottomCorner) {
                cornerList[2] = options.regionRightBottomCorner;
                delete options.regionRightBottomCorner;
            }
            if (options.regionLeftBottomCorner) {
                cornerList[3] = options.regionLeftBottomCorner;
                delete options.regionLeftBottomCorner;
            }
            //
            if (cornerList.length > 0) {
                var strList = [];
                for (var i = 0; i < 4; i++) {
                    var cornerItems = cornerList[i];
                    // 先将字符串转换为数组
                    if (typeof cornerItems === "string") {
                        cornerItems = cornerItems.split(",");
                    }
                    strList[i] = "0,0";
                    // 对每一个字段进行单位转换处理。
                    if (Array.isArray(cornerItems)) {
                        if (cornerItems.length > 2)
                            cornerItems = cornerItems.slice(0, 2);
                        for (var j = 0; j < 2; j++)
                            cornerItems[j] = utils.unitConvert(cornerItems[j] || 0);
                        strList[i] = cornerItems.join(",");
                    }
                }
                options.regionCorners = strList.join(",");
            }
        }
        if (options.regionLeftBorders) {
            var segments = options.regionLeftBorders;
            if (typeof options.regionLeftBorders === "string")
                segments = options.regionLeftBorders.split(",");
            if (Array.isArray(segments) && segments.length > 2) {
                for (var i = 0; i < segments.length; i++) {
                    segments[i] = utils.unitConvert(segments[i]);
                }
                options.regionLeftBorders = segments.join(",");
            }
            else {
                delete options.regionLeftBorders;
            }
        }
        if (options.regionRightBorders) {
            var segments = options.regionRightBorders;
            if (typeof segments === "string")
                segments = segments.split(",");
            if (Array.isArray(segments) && segments.length > 2) {
                for (var i = 0; i < segments.length; i++) {
                    segments[i] = utils.unitConvert(segments[i]);
                }
                options.regionRightBorders = segments.join(",");
            }
            else {
                delete options.regionRightBorders;
            }
        }
        return options;
    },
    getAgent: function () {
        return navigator.userAgent.toLowerCase() || "";
    },
    isWin32: function () {
        var agent = this.getAgent();
        return agent.indexOf("win32") || agent.indexOf("wow32");
    },
    isWin64: function () {
        var agent = this.getAgent();
        return agent.indexOf("win64") || agent.indexOf("wow64");
    },
    isWindows: function () {
        var agent = this.getAgent();
        return agent.indexOf("win") >= 0 || agent.indexOf("wow") >= 0;
    },
    isMac: function () {
        return /macintosh|mac os x/i.test(this.getAgent());
    },
    formatDate: function (format, date) {
        // yyyy-MM-dd HH:mm:ss.SSS
        var fmt = format || "HH:mm:ss.SSS";
        date = date || new Date();
        var fts = {
            "y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds(), //毫秒
        };
        //
        var matches;
        for (var key in fts) {
            if ((matches = new RegExp("(".concat(key, ")")).exec(fmt))) {
                // matches[1]表示匹配到的字符串，譬如："yyyy","mm","dd"等；
                var oldValue = "".concat(fts[key]);
                var extValue = "00".concat(oldValue);
                var from = matches[1].length > extValue.length ? 0 : extValue.length - matches[1].length;
                fmt = fmt.replace(matches[1], matches[1].length === 1 ? oldValue : extValue.substring(from));
            }
        }
        return fmt;
    },
    downloadDtpweb: function (url) {
        var downloadElement = document.createElement("a");
        downloadElement.href = url; // 创建下载连接；
        downloadElement.click(); // 点击下载；
        return true;
    },
};

/**
 * @file dtpweb.ts
 * @author DothanTech (hudianxing@dothantech.com)
 * @brief 该接口是对底层 dtpweb 打印助手的二次封装。
 * @version 2.1
 * @date 2022-06-27
 *
 * @copyright Copyright (c) 2022
 *
 */
//
var instance = undefined;
/**
 * 对底层 dtpweb 打印助手的二次封装。
 */
var DTPWeb = /** @class */ (function () {
    function DTPWeb() {
        //
        this._labelWidth = 0;
        this._labelHeight = 0;
        // 边距，索引从0-3分别表示top|right|bottom|left
        this._margins = [];
        this._localIPs = new Set();
        // dtpweb版本号。
        this._version = "";
    }
    /**
     * 检查打印服务是否运行正常。
     * @param options 打印服务相关初始配置信息。
     * @param options.callback: (api?: DTPWeb, info?: LPA_ServerInfo) => void 打印服务检查回调信息。
     * @returns 成功：返回 DTPWeb 实例，失败：返回 undefined;
     */
    DTPWeb.checkServer = function (options) {
        var opts = typeof options === "function" ? { callback: options } : options || {};
        var api = this.getInstance(opts);
        api.checkPlugin(function (resp) {
            if (typeof opts.callback === "function") {
                var result = resp.statusCode === LPA_Result.OK ? api : undefined;
                opts.callback(result, resp);
            }
        });
        return api;
    };
    /**
     * 获取一个单实例接口对象。
     *
     * @param options 接口初始话配置信息。
     *
     * @returns 返回一个单实例接口对象。
     */
    DTPWeb.getInstance = function (options) {
        var api = instance || (instance = new DTPWeb());
        api.init(options);
        return api;
    };
    Object.defineProperty(DTPWeb.prototype, "LastResponse", {
        /**
         * 最后一次请求的响应信息。
         */
        get: function () {
            return this._Response;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DTPWeb.prototype, "IsJsonMode", {
        get: function () {
            return this._jsonMode || false;
        },
        enumerable: false,
        configurable: true
    });
    DTPWeb.prototype.getIpAddress = function (ip) {
        return ip || this._ip || this._initIp;
    };
    DTPWeb.prototype.getPort = function (port) {
        return port || this._port || this._initPort;
    };
    DTPWeb.prototype.getTimeout = function (timeout, type) {
        if (timeout && timeout > 0)
            return timeout;
        if (this._timeout && this._timeout > 0)
            return this._timeout;
        //
        return this.isLocalPrinter(type) ? CONSTANTS.TIME_OUT : CONSTANTS.OUTER_TIME_OUT;
    };
    DTPWeb.prototype.getDeviceType = function (type) {
        return type || this._deviceType;
    };
    DTPWeb.prototype.getFontName = function (v) {
        return v || this._fontName || CONSTANTS.FONT_NAME;
    };
    DTPWeb.prototype.getFontHeight = function (v) {
        return v || this._fontHeight || CONSTANTS.FONT_HEIGHT;
    };
    DTPWeb.prototype.getLineWidth = function (v) {
        return v || this._lineWidth || CONSTANTS.LINE_WIDTH;
    };
    DTPWeb.prototype.getRadius = function (v) {
        return v || this._radius || CONSTANTS.RADIUS;
    };
    DTPWeb.prototype.getCornerWidth = function (v) {
        return v || this._cornerWidth || CONSTANTS.CORNER_RADIUS;
    };
    DTPWeb.prototype.parseMargin = function (options) {
        this._margins.splice(0);
        var margin = utils.parseMargin(options);
        for (var i = 0; i < 4; i++) {
            // *1 目的是将字符串类型转换为数字；
            this._margins[i] = (margin[i] || 0) * 1;
        }
        //
        return this._margins;
    };
    DTPWeb.prototype.setFontName = function (v) {
        this._fontName = v;
    };
    DTPWeb.prototype.setOffsetX = function (v) {
        this._margins[4] = v;
    };
    DTPWeb.prototype.setOffsetY = function (v) {
        this._margins[5] = v;
    };
    /**
     * 接口初始化配置。
     */
    DTPWeb.prototype.init = function (options) {
        var opts = options || {};
        if (opts.ip)
            this._initIp = opts.ip;
        if (opts.port)
            this._initPort = opts.port;
        if (opts.timeout)
            this._timeout = opts.timeout;
        this._downloadUrl = opts.downloadUrl;
        //
        if (opts.fontName)
            this._fontName = opts.fontName;
        if (opts.fontHeight)
            this._fontHeight = opts.fontHeight;
        if (opts.lineWidth)
            this._lineWidth = opts.lineWidth;
        if (opts.radius)
            this._radius = opts.radius;
        //
        this._showAlert = typeof opts.showAlert === "boolean" ? opts.showAlert : true;
        this._jsonMode = typeof opts.jsonMode === "boolean" ? opts.jsonMode : true;
        this._showLog = typeof opts.showLog === "boolean" ? opts.showLog : true;
    };
    DTPWeb.prototype.logMsg = function (title) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._showLog) {
            var time = utils.formatDate();
            console.log("[".concat(time, "]: ").concat(title));
            console.log.apply(console, args);
        }
    };
    DTPWeb.prototype.logObj = function (obj) {
        if (this._showLog) {
            console.log(obj);
        }
    };
    DTPWeb.prototype.setServerInfo = function (info) {
        var _a;
        if (!info)
            return;
        //
        if (((_a = info.selfIps) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            for (var _i = 0, _b = info.selfIps; _i < _b.length; _i++) {
                var item = _b[_i];
                this._localIPs.add(item);
            }
        }
        // 保存服务版本信息
        var version = (info.version || "").split("/");
        if (version.length > 1) {
            this._version = version[1];
        }
    };
    DTPWeb.prototype.isLocalPrinter = function (printerType) {
        var type = typeof printerType === "number" ? printerType : (printerType === null || printerType === void 0 ? void 0 : printerType.type) || 0;
        if (this._version && this._version >= "2.3.2023.621") {
            // 2.3.20230621及以后的版本中:
            //      1 - 9  : 表示本地打印机，一般为9，表示我们德佟系列的打印机，1表示除此之外的其他打印机。
            //      11 - 19: 表示网络打印机；
            //      29     ：表示WiFi打印机；
            return type < 10;
        }
        else {
            // 旧版本中 1：表示本地打印机，2：表示局域网打印机，3：表示WIFI打印机。
            return type <= 1;
        }
    };
    /**
     * 检测插件是否可用。
     *
     * @param {(api?: DTPWeb) => void | undefined} callback 插件检测结果回调函数。
     */
    DTPWeb.prototype.checkPlugin = function (callback) {
        var _this = this;
        var newCallback = function (resp) {
            // 如果未实现该请求，则状态码为: LPA_Result.NETWORK_EXCEPTION;
            // 如果在http模式下，访问localhost，则错误代码为：LPA_Result.NETWORK_ERROR;
            // 如果端口不对，则返回错误代码为 LPA_Result.NETWORK_TIMEOUT;
            // 如果未检测到dtpweb服务，则返回错误代码为：LPA_Result.NETWORK_TIMEOUT;
            //
            if (resp.statusCode === LPA_Result.OK) {
                console.log("★★★ 打印助手运行正常 ★★★");
            }
            else if ((resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.NETWORK_ERROR && window.location.protocol === "http:") {
                console.log("★★★ 不安全网络[http]环境下需要禁用对本地服务的拦截操作 ★★★");
                if (_this._showAlert) {
                    // window.open("chrome://flags/#block-insecure-private-network-requests", "");
                    // utils.gotoPage("chrome://flags/#block-insecure-private-network-requests");
                    // js中无法直接打开上面的url，chrome://flags 属于本地资源。
                    window.prompt("\u68C0\u6D4B\u5230\u4E0D\u5B89\u5168\u7684\u7F51\u7EDC\u73AF\u5883\uFF0C\u5982\u679C\u9700\u8981\u5728 http \u73AF\u5883\u4E0B\u7EE7\u7EED\u4F7F\u7528\u6253\u5370\u52A9\u624B\uFF0C\u8BF7\u6253\u5F00\u6D4F\u89C8\u5668\uFF0C\u7136\u540E\u5728\u6D4F\u89C8\u5668\u7684\u5730\u5740\u680F\u8F93\u5165\u4E0B\u5217\u94FE\u63A5\uFF0C\u7136\u540E\u5C06\u6D4F\u89C8\u5668\u7684 [Block insecure private network requests] \u6807\u5FD7\u5207\u6362\u5230\u3010disable\u3011:", DTPWeb.URL_BLOCK_PRIVATE_NETWORK);
                }
            }
            else {
                console.log("★★★ 未检测到打印助手 ★★★");
                var downloadUrl = _this._downloadUrl || DTPWeb.URL_DTPWEB_DOWNLOAD;
                if (_this._showAlert && window.confirm("未检测到打印助手，是否要下载最新版本的打印助手？")) {
                    window.open("".concat(downloadUrl, "?protocol=").concat(window.location.protocol), "");
                }
            }
            if (callback)
                callback(resp);
        };
        // 检测主用端口
        this.checkPort(CONSTANTS.PORT1, function (resp) {
            if (resp.statusCode !== LPA_Result.OK) {
                if (resp.statusCode === LPA_Result.NETWORK_ERROR && window.location.protocol === "http:") {
                    // http 模式下需要配置浏览器。
                    newCallback(resp);
                }
                else {
                    // 检测备用端口
                    _this.checkPort(CONSTANTS.PORT2, newCallback);
                }
            }
            else {
                newCallback(resp);
            }
        });
    };
    /**
     * 检查指定的端口号是否可用。
     *
     * @param {number | undefined} port 待检测目标端口，不指定的时候默认端口为{@link CONSTANTS.PORT1}。
     * @param {(api?: DTPWeb) => void} callback 端口检测回调函数，参数表示端口是否可用。
     */
    DTPWeb.prototype.checkPort = function (port, callback) {
        var _this = this;
        this.logMsg("$$$$ DTPWEB request: checkPort(".concat(port, ") $$$$"));
        //
        var ip = this._initIp || CONSTANTS.IP;
        if (!instance)
            instance = this;
        //
        utils.request({
            host: ip,
            port: port || this._port,
            url: "".concat(CONTROLS.LOCAL, "/").concat(ACTIONS.ServerInfo),
            sync: false,
            timeout: this.getTimeout(0),
        }, function (resp) {
            _this.logMsg("#### onResponse: checkPort(".concat(port, ") ####"), resp);
            // 如果statusCode 小于90，表示网络请求环境没问题。
            if (resp.statusCode < LPA_Result.NETWORK_FAILED) {
                var info = resp.resultInfo;
                // 保存有效的IP及端口号
                if (!_this._initIp)
                    _this._initIp = ip;
                if (port)
                    _this._initPort = port;
                // 保存dtpweb服务相关信息。
                _this.setServerInfo(info);
            }
            if (typeof callback === "function") {
                callback(resp);
            }
        });
    };
    /**
     * 请求web服务器。
     *
     * @param {LPA_RequestOptions | string} options HTTP请求相关配置选项。
     * @param {any} data 请求参数;
     */
    DTPWeb.prototype.requestApi = function (options, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var config = utils.getRequestData(["action"], [options]);
        this.logMsg("$$$$ DTPWEB request: ".concat(config.action, " $$$$"), config);
        if (data)
            this.logObj(data);
        // 原始数据
        data = data || {};
        // post 请求参数。
        var postData = config.data || data.data;
        if (data.data) {
            data.data = undefined;
        }
        // get 请求参数
        var getParams = utils.getParamString(config.params || data);
        var urlParams = getParams ? "?".concat(getParams) : "";
        var control = config.control || CONTROLS.LPAPI;
        var deviceType = this.getDeviceType(config.deviceType);
        //
        var resolve = undefined;
        this._Response = undefined;
        // Content-Type的值仅限于下列三者之一，否则会出发预检请求，将POST请求变成OPTIONS请求。
        // text/plain
        // multipart/form-data
        // application/x-www-form-urlencoded
        // post data
        if (config.contentType === LPA_ContentType.Json) {
            postData = JSON.stringify(postData || data);
        }
        else if (config.contentType !== LPA_ContentType.Base64) {
            postData = getParams;
        }
        // content type
        var contentType = CONTENT_TYPE.UrlEncoded;
        if (config.contentType === LPA_ContentType.Json) {
            contentType = CONTENT_TYPE.Json;
        }
        else if (config.contentType === LPA_ContentType.Base64) {
            contentType = CONTENT_TYPE.Base64;
        }
        // 本地打印机最好不要配置IP地址，否则在https模式下请求192.168.xxx.xxx会报错。
        var ipAddress = this.isLocalPrinter(deviceType) ? undefined : config.ip;
        utils.request({
            method: "POST",
            host: this.getIpAddress(ipAddress),
            port: this.getPort(config.port),
            url: "".concat(control, "/").concat(config.action).concat(urlParams),
            params: data,
            headers: {
                "Content-type": contentType,
            },
            data: postData,
            sync: !config.async,
            timeout: this.getTimeout(config.timeout, deviceType),
        }, function (result) {
            _this.logMsg("## onResponse: ".concat(config.action, " ##"), result);
            // 备份请求结果原始信息。
            _this._Response = resolve;
            resolve = result;
            //
            if (typeof config.callback === "function") {
                config.callback(result);
            }
        });
        //
        return resolve;
    };
    /**
     * 获取dtpweb打印助手的版本信息。
     */
    DTPWeb.prototype.getVersion = function () {
        var resp = this.requestApi(ACTIONS.Version);
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK ? resp.resultInfo : undefined;
    };
    /**
     * 获取dtpweb打印助手相关信息。
     */
    DTPWeb.prototype.getServerInfo = function () {
        var resp = this.requestApi(ACTIONS.ServerInfo);
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK ? resp.resultInfo : undefined;
    };
    /**
     * 默认只支持德佟系列的打印机，其他厂家的打印机需要通过该接口来配置后才可以使用。
     */
    DTPWeb.prototype.setSupportedPrinters = function (supportedPrinters) {
        if (utils.isWindows()) {
            var resp = this.requestApi(ACTIONS.SetSupportedPrinters, {
                supportedPrinters: supportedPrinters,
            });
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 获取系统默认打印机相关信息。
     */
    DTPWeb.prototype.getDefaultPrinter = function () {
        if (utils.isWindows()) {
            var resp = this.requestApi(ACTIONS.GetDefaultPrinter);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK ? resp.resultInfo : undefined;
        }
        else {
            return undefined;
        }
    };
    /**
     * 修改系统默认打印机。
     */
    DTPWeb.prototype.setDefaultPrinter = function (printerName) {
        if (utils.isWindows()) {
            this.requestApi(ACTIONS.SetDefaultPrinter, {
                printerName: printerName,
            });
        }
    };
    /**
     * 搜索局域网内的打印机。
     *
     * 建议在搜索命令下发2秒钟之后再通过{@link getPrinters()}来获取打印机列表。
     *
     * @param mode 打印机搜索模式，值默认为1。
     * @returns 成功与否。
     */
    DTPWeb.prototype.discoveryPrinters = function (mode) {
        var resp = this.requestApi(ACTIONS.DiscoveryPrinters, {
            mode: mode !== null && mode !== void 0 ? mode : 1,
        });
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
    };
    /**
     * 获取打印机列表。
     *
     * @param {LPA_PrinterOptions} 打印机设备相关选项。
     *
     * @param {boolean|undefined} options.onlyOnline 是否只获取在线（已连接）的打印机？默认为true。
     * @param {boolean|undefined} options.onlyLocal 是否只获取本地打印机？默认为true。
     * @param {boolean|undefined} options.onlySupported 是否只获取支持的打印机？默认为true。
     *
     * @return {LPA_Device[]} 返回打印机设备列表。
     */
    DTPWeb.prototype.getPrinters = function (options, timeout) {
        var _a;
        options = utils.getRequestData(["onlyOnline"], [options]);
        //
        options.onlyOnline = typeof options.onlyOnline === "boolean" ? options.onlyOnline : true;
        options.onlySupported = true;
        //
        var resp = this.requestApi({
            action: ACTIONS.GetPrinters,
            timeout: timeout || 5000,
        }, options);
        this._deviceList = (_a = resp === null || resp === void 0 ? void 0 : resp.resultInfo) === null || _a === void 0 ? void 0 : _a.printers;
        return this._deviceList || [];
    };
    /**
     * 打开指定的打印机。
     *
     * @param {string|LPA_Printer|undefined} printer 打印机名称或对象。
     *
     * @param {string|undefined} printer.printerName 目标打印机名称。
     * @param {string|undefined} printer.ip 目标打印机IP地址，不指定表示链接本地打印机。
     *
     * @return {boolean} 目标打印机链接成功与否。
     */
    DTPWeb.prototype.openPrinter = function (options, callback) {
        var _this = this;
        var deviceInfo = typeof options === "string" ? { name: options } : options || {};
        //
        this.requestApi({
            action: ACTIONS.OpenPrinter,
            // 为了避免因上一次链接的打印机影响本次打印机的链接，如果用户未指定目标打印机相关信息，此处最好指定初始信息。
            ip: deviceInfo.ip || this._initIp,
            port: deviceInfo.port || this._initPort,
            deviceType: deviceInfo.type,
            // linux中链接蓝牙设备设置了5秒钟的超时时间，为了能够获取到准确的链接状态，此处要稍微多等待一会。
            timeout: 8000,
            async: true,
            callback: function (resp) {
                if (resp.statusCode === LPA_Result.OK) {
                    // 为了避免https下跨域的问题，如果目标打印机是本地打印机就不再设置相关配置了
                    if (!_this.isLocalPrinter(deviceInfo)) {
                        _this._ip = deviceInfo.ip;
                        _this._port = deviceInfo.port;
                        _this._deviceType = deviceInfo.type;
                        _this._deviceName = deviceInfo.name;
                    }
                }
                //
                if (typeof callback === "function") {
                    callback(resp.statusCode === LPA_Result.OK);
                }
            },
        }, deviceInfo);
    };
    /**
     * 获取已连接的打印机名称。
     */
    DTPWeb.prototype.getPrinterName = function () {
        var _a;
        return (_a = this.requestApi(ACTIONS.GetPrinterName)) === null || _a === void 0 ? void 0 : _a.resultInfo;
    };
    /**
     * 判断打印机是否已打开。
     */
    DTPWeb.prototype.isPrinterOpened = function () {
        var _a;
        return ((_a = this.requestApi(ACTIONS.IsPrinterOpened)) === null || _a === void 0 ? void 0 : _a.statusCode) === LPA_Result.OK;
    };
    /**
     * 判断当前打印机是否在线。
     */
    DTPWeb.prototype.isPrinterOnline = function () {
        var _a;
        if (utils.isWindows()) {
            return ((_a = this.requestApi(ACTIONS.IsPrinterOnline)) === null || _a === void 0 ? void 0 : _a.statusCode) === LPA_Result.OK;
        }
        return false;
    };
    /**
     * 关闭已经打开的打印机。
     *
     * @info 关闭打印机时，当前还有未打印的任务/数据将会被自动提交打印，同时所有参数设置将会被保留。
     */
    DTPWeb.prototype.closePrinter = function () {
        var _a;
        return ((_a = this.requestApi(ACTIONS.ClosePrinter)) === null || _a === void 0 ? void 0 : _a.statusCode) === LPA_Result.OK;
    };
    /**
     * 显示打印机属性设置界面或者首选项设置界面。
     *
     * @param {LPA_PrinterPropertyOptions} options 打印机相关相关选项。
     *
     * @param {string|undefined} options.printerName 打印机名称，如果为空则会打开当前已打开的打印机属性或者打印首选项。
     * @param {boolean|undefined} options.showDocument 是否显示打印机首选项？默认为true。
     *          true: 表示显示首选项设置界面；
     *          false:显示打印机属性设置界面。
     *
     * @warning 如果在调用该接口前已通过 openPrinter 函数打开打印机，则可以不指定 printerName。
     */
    DTPWeb.prototype.showProperty = function (data) {
        var resp;
        if (utils.isWindows()) {
            data.showDocument = typeof data.showDocument === "boolean" ? data.showDocument : true;
            resp = this.requestApi(ACTIONS.ShowProperty, data);
        }
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
    };
    /**
     * 获取打印相关参数。
     *
     * @param {LPA_ParamID} id 打印参数ID，ID值可参考 {@link LPA_ParamID}。
     *
     * @return {number} 值参考 {@link LPA_ParamID} 中不同ID所对应的值类型。
     */
    DTPWeb.prototype.getParam = function (id) {
        var data = utils.getRequestData(["id"], [id]);
        //
        var resp = this.requestApi(ACTIONS.GetParam, data);
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK ? resp.resultInfo : -1;
    };
    /**
     * 设置打印参数；
     *
     * @param {number|LPA_PrintParamOptions} options 打印参数相关选项。
     *
     * @param {LPA_ParamID} options.id 打印机参数ID，ID值可参考 {@link LPA_ParamID}。
     * @param {number} options.value id值所对应打印机参数的value，具体可参考 {@link LPA_ParamID}。
     *
     * @return {boolean} 成功与否？
     */
    DTPWeb.prototype.setParam = function (options) {
        options = utils.getRequestData(["id", "value"], arguments);
        //
        var resp = this.requestApi(ACTIONS.SetParam, options);
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
    };
    /**
     * 获取已连接打印机的纸张类型。
     */
    DTPWeb.prototype.getGapType = function () {
        return this.getParam(LPA_ParamID.GapType);
    };
    /**
     * 修改已连接打印机的纸张类型。
     *
     * @param {LPA_GapType} value 纸张类型。
     */
    DTPWeb.prototype.setGapType = function (value) {
        return this.setParam({
            id: LPA_ParamID.GapType,
            value: value,
        });
    };
    /**
     * 返回已连接打印机的打印浓度。
     *
     * @return {number} 打印机浓度值说明可参考 {@link LPA_PrintDarkness};
     */
    DTPWeb.prototype.getPrintDarkness = function () {
        return this.getParam(LPA_ParamID.PrintDarkness);
    };
    /**
     * 修改已连接打印机的打印浓度。
     *
     * @param {number} value 打印浓度。
     */
    DTPWeb.prototype.setPrintDarkness = function (value) {
        return this.setParam({
            id: LPA_ParamID.PrintDarkness,
            value: value,
        });
    };
    /**
     * 返回已连接打印机的打印速度。
     */
    DTPWeb.prototype.getPrintSpeed = function () {
        return this.getParam(LPA_ParamID.PrintSpeed);
    };
    /**
     * 修改已连接打印机的打印速度。
     *
     * @param {number} value 打印速度，值参考{@link LPA_PrintSpeed}。
     */
    DTPWeb.prototype.setPrintSpeed = function (value) {
        return this.setParam({
            id: LPA_ParamID.PrintSpeed,
            value: value,
        });
    };
    /**
     * 获取打印机的分辨率（打印机链接成功后有效）。
     */
    DTPWeb.prototype.getPrinterDPI = function () {
        var resp = this.requestApi(ACTIONS.GetPrinterDPI);
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK ? resp.resultInfo : undefined;
    };
    /**
     * 创建打印任务。
     *
     * 创建打印任务时，如果没有链接打印机，则本函数会自动打开当前系统安装的第一个 LPAPI 支持的打印机，用于打印。
     * 当前还有未打印的任务，已有打印数据将会被全部丢弃。
     *
     * @param {JobOptions} options 标签任务选项。
     *
     * @param {number} options.width 标签宽度，单位毫米，值默认为{@link CONSTANTS.LABEL_WIDTH}。
     * @param {number} options.height 标签高度，单位毫米，值默认为{@link CONSTANTS.LABEL_HEIGHT}。
     * @param {0|90|180|270} options.orientation 标签打印方向，`0`表示不旋转，`90`表示右转90度，`180`表示180度旋转，`270`表示左转90度，默认为0。
     * @param {string|undefined} options.jobName 打印任务名称，特殊情况下的任务不进行打印，可用于生成对应的预览图片，
     *          预览时的值可参考:{@link LPA_JobNames}，默认为{@link LPA_JobNames.Print}，表示打印任务。
     */
    DTPWeb.prototype.startJob = function (options) {
        options = utils.getRequestData(["width", "height", "orientation", "jobName"], arguments);
        var margins = this.parseMargin(options);
        //
        this._labelWidth = options.width || CONSTANTS.LABEL_WIDTH;
        this._labelHeight = options.height || CONSTANTS.LABEL_HEIGHT;
        //
        utils.scaleUnit = this.IsJsonMode ? 0 : 1;
        //
        options.scaleUnit = 1;
        options.width = utils.unitConvert(options.width + margins[1] + margins[3]);
        options.height = utils.unitConvert(options.height + margins[0] + margins[2]);
        options.jobName = options.jobName || LPA_JobNames.Print;
        //
        if (this.IsJsonMode) {
            var printerName = options.printerName || this._deviceName;
            if (!printerName && this._deviceList && this._deviceList.length > 0) {
                for (var _i = 0, _a = this._deviceList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (this.isLocalPrinter(item)) {
                        printerName = item.name;
                        break;
                    }
                }
            }
            // 初始化打印任务信息。
            this._printJobInfo = {
                action: utils.getJobAction(options.jobName),
                jobPages: [],
                jobInfo: {
                    jobWidth: options.width,
                    jobHeight: options.height,
                    orientation: options.orientation,
                },
                printerInfo: {
                    printerName: printerName,
                },
            };
            // 初始化页面信息
            this._jobPage = [];
            this._printJobResult = undefined;
            //
            return true;
        }
        else {
            // 如果制定了打印机名称，则先链接打印机。
            if (options.printerName) {
                this.openPrinter(options.printerName);
            }
            var resp = this.requestApi(ACTIONS.StartJob, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     *  取消当前打印任务。
     *
     *  使用说明：当前还有未打印的任务/数据将会被全部丢弃，但是所有参数设置将会被保留。
     */
    DTPWeb.prototype.abortJob = function () {
        if (!this.IsJsonMode) {
            this.requestApi(ACTIONS.AbortJob);
        }
    };
    /**
     * 提交打印任务，进行真正的打印。
     *
     * @param {PrintOptions|undefined} options 相关打印参数。
     *
     * @param {number|undefined} options.copies 打印份数。
     * @param {number|undefined} options.orientation 打印方向，默认为`0`。
     *          `0`表示不旋转，`90`表示右转90度，`180`表示进行180度旋转，`270`表示左转90度。
     * @param {number|undefined} options.threshold 图片进行黑白转换时的阈值，默认为{@link CONSTANTS.THRESHOLD}，也即：192。
     * @param {LPA_PrintSpeed|undefined} options.speed 打印速度，默认随打印机设置。
     * @param {LPA_PrintDarkness|undefined} options.darkness 打印浓度，默认随打印机设置。
     * @param {LPA_GapType|undefined} options.gapType 纸张类型，默认随打印机设置。
     * @param {(success: boolean) => void} option.callback 打印结果回调函数。
     */
    DTPWeb.prototype.commitJob = function (options) {
        var _this = this;
        var opts = typeof options === "function" ? { callback: options } : options || {};
        if (this.IsJsonMode) {
            // 结束绘制操作
            this.endPage();
            //
            if (this._printJobInfo) {
                if (typeof opts.gapType === "number")
                    this._printJobInfo.jobInfo.gapType = opts.gapType;
                if (typeof opts.darkness === "number")
                    this._printJobInfo.jobInfo.darkness = opts.darkness;
                if (typeof opts.speed === "number")
                    this._printJobInfo.jobInfo.printSpeed = opts.speed;
                //
                this._printJobInfo.callback = function (result) {
                    _this._printJobResult = result;
                    if (typeof opts.callback === "function")
                        opts.callback(!!result);
                };
                //
                this.print(this._printJobInfo);
            }
        }
        else {
            this.requestApi({
                action: ACTIONS.CommitJob,
                timeout: 60 * 1000,
                async: true,
                callback: function (resp) {
                    if (typeof opts.callback === "function") {
                        opts.callback(resp.statusCode === LPA_Result.OK);
                    }
                },
            }, opts);
        }
    };
    /**
     * 得到最近一次打印任务的标识。
     *
     * @return 打印任务标识。
     */
    DTPWeb.prototype.getJobID = function () {
        if (utils.isWindows()) {
            var resp = this.requestApi(ACTIONS.GetJobID);
            return resp === null || resp === void 0 ? void 0 : resp.resultInfo;
        }
        else {
            return 0;
        }
    };
    /**
     * 得到打印任务的状态信息。
     * @param {LPA_JobInfo} options 任务选项。
     *
     * @param {string|undefined} options.printerName 打印机名称，为空表示当前打开的打印机。
     * @param {number|undefined} options.jobID 打印任务标识，为0表示最近一次的打印任务。
     *
     * @return 返回任务信息,格式为 JOB_INFO_1，为 NULL 用于测量需要的空间字节数。
     */
    DTPWeb.prototype.getJobInfo = function (options) {
        if (utils.isWindows()) {
            var resp = this.requestApi(ACTIONS.GetJobInfo, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK ? resp.resultInfo : undefined;
        }
        else {
            return undefined;
        }
    };
    /**
     * 得到刚完成的打印任务的打印任务信息。
     *
     * @return {LPA_PageInfo} 返回刚完成的打印任务信息
     */
    DTPWeb.prototype.getPageInfo = function () {
        var _a;
        if (this.IsJsonMode) {
            if (this._printJobResult && this._printJobInfo) {
                return {
                    width: this._printJobInfo.jobInfo.jobWidth,
                    height: this._printJobInfo.jobInfo.jobHeight,
                    pages: ((_a = this._printJobResult.previewData) === null || _a === void 0 ? void 0 : _a.length) || 0,
                };
            }
            else {
                return {};
            }
        }
        else {
            var resp = this.requestApi(ACTIONS.GetPageInfo);
            return resp === null || resp === void 0 ? void 0 : resp.resultInfo;
        }
    };
    /**
     * 得到刚完成的打印任务的页面图片数据。
     * @param {LPA_PageImageOptions} options 参数选项。
     *
     * @param {number|undefined} options.page 通过getPageInfo获取到的页面总数中的索引，默认为0，表示第一页。
     * @param {LPA_SourceImageFormat|undefined} options.format 获取到的图片的数据格式，具体可参考 {@link LPA_SourceImageFormat}，
     *          默认为{@link LPA_SourceImageFormat.LPASIF_IMAGEDATA}，表示返回BASE64格式的图片数据。
     *
     * @return {LPA_PageImage} 返回页面图片数据。
     */
    DTPWeb.prototype.getPageImage = function (options) {
        var _a;
        if (this.IsJsonMode) {
            var page = options.page || 0;
            if ((_a = this._printJobResult) === null || _a === void 0 ? void 0 : _a.previewData) {
                return {
                    page: page,
                    // format: this._printJobResult.
                    data: this._printJobResult.previewData[page],
                };
            }
            else {
                return {};
            }
        }
        else {
            options = utils.getRequestData(["page", "format"], arguments);
            var resp = this.requestApi(ACTIONS.GetPageImage, options);
            return resp === null || resp === void 0 ? void 0 : resp.resultInfo;
        }
    };
    /**
     * 开始一打印页面。
     *
     * @info 如果之前没有调用 StartJob，则本函数会自动调用 StartJob，然后再开始一打印页面。此后调用 EndPage 结束打印时，打印任务会被自动提交打印。
     *       页面旋转角度非 0 打印时，必须在打印动作之前设置打印页面尺寸信息。
     */
    DTPWeb.prototype.startPage = function () {
        var _a;
        if (this.IsJsonMode) {
            if (!this._printJobInfo)
                return false;
            //
            if (this._jobPage && this._jobPage.length > 0) {
                this.endPage();
            }
            //
            if (!this._jobPage) {
                this._jobPage = [];
            }
            return true;
        }
        else {
            return ((_a = this.requestApi(ACTIONS.StartPage)) === null || _a === void 0 ? void 0 : _a.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 结束一打印页面。
     *
     * @info 如果之前没有调用 StartJob 而直接调用 StartPage，则本函数会自动提交打印。
     */
    DTPWeb.prototype.endPage = function () {
        var _a;
        if (this.IsJsonMode) {
            if (this._printJobInfo && this._jobPage) {
                if (this._jobPage.length > 0) {
                    this._printJobInfo.jobPages.push(this._jobPage);
                }
                this._jobPage = undefined;
                return true;
            }
            return false;
        }
        else {
            return ((_a = this.requestApi(ACTIONS.EndPage)) === null || _a === void 0 ? void 0 : _a.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 设置绘制函数是否返回绘制的详细信息？
     *
     * @param options 字符串打印相关参数。
     *
     * @param {boolean|undefined} options.returnDrawResult 绘制函数是否返回绘制的详细信息。
     */
    DTPWeb.prototype.returnDrawResult = function (options) {
        var _a;
        var opts = utils.getRequestData(["returnDrawResult"], [options]);
        opts.returnDrawResult = (_a = opts.returnDrawResult) !== null && _a !== void 0 ? _a : true;
        //
        var resp = this.requestApi(ACTIONS.ReturnDrawResult, opts);
        return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
    };
    /*********************************************************************
     * 绘制相关内容。
     *********************************************************************/
    /**
     * 将给定的毫米值转换为磅值。
     *
     * 该函数常用于绘制字符串的时候字体大小的单位换算。
     *
     * @param value 待转换的值，单位毫米。
     * @returns 转换后的值，单位磅。
     */
    DTPWeb.prototype.mm2Pound = function (value) {
        return utils.mmToPound(value);
    };
    /**
     * 将给定的磅值转换为毫米值。
     *
     * 该函数常用于绘制字符串的时候字体大小的单位换算。
     *
     * @param value 待转换的值，单位磅。
     * @returns 转换后的值，单位毫米。
     */
    DTPWeb.prototype.pound2Mm = function (value) {
        return utils.poundToMm(value);
    };
    /**
     * 绘制文本。
     *
     * regionCorners regionLeftUpCorner regionRightUpCorner regionRightBottomCorner
     * regionLeftBottomCorner regionLeftBorders regionRightBorders，这些参数都是长度
     * 数组，建议都是通过数组来传递参数，这样接口会对长度都自动转发为接口使用的 0.01mm 的
     * 单位。为了调试方便，这些参数也支持逗号分隔的字符串方式来参数。但是此时参数必须调用者
     * 自己转发为 0.01mm 为单位的长度数据。
     *
     * @param {DrawTextOptions} options 文本绘制相关选项。
     *
     * @param {string} options.text 待绘制的文本数据。
     * @param {number|undefined} options.x 绘制对象的水平坐标位置，单位毫米。值默认为0。
     * @param {number|undefined} options.y 绘制对象的垂直坐标位置，单位毫米。值默认为0。
     * @param {number|undefined} options.width 绘制对象的显示宽度，单位毫米。
     *          值默认为0，表示绘制宽度不做限制。
     * @param {number|undefined} options.height 绘制对象的显示高度，单位毫米。
     *          值默认为0，表示高度不做显示，以实际高度显示。
     * @param {string|undefined} options.fontName 绘制对象的字体名称，值默认为{@link CONSTANTS.FONT_NAME}。
     * @param {number} options.fontHeight 绘制对象的字体高度，单位毫米，
     *          值默认为{@link CONSTANTS.FONT_HEIGHT}。
     * @param {LPA_FontStyle|undefined} options.fontStyle 字体样式，默认为{@link LPA_FontStyle.Regular}。
     * @param {LPA_AutoReturnMode|undefined} options.autoReturn 自动换行模式，默认为{@link LPA_AutoReturnMode.Char}。
     *          {@link LPA_AutoReturnMode.None}：没有自动换行；
     *          {@link LPA_AutoReturnMode.Char}：按字换行；
     *          {@link LPA_AutoReturnMode.Word}：按词换行。
     * @param {number|undefined} options.charSpace 字符间距，默认为0，单位毫米。
     * @param {number|string|undefined} options.lineSpace 行间距，单位毫米，
     *          或为枚举字符串（1_0，1_2，1_5，2_0）。默认为 1_0，也即单倍行距。
     * @param {number|undefined} options.leadingIndent 首行缩进的四个参数，默认为0。四选一，leadingIndent 具有最高优先级。
     *          0         : 表示没有首行缩进；
     *          1 ~ 999   : 表示首行向左缩进 N/10 个中文字符个数（字符高度）
     *          1000      ：表示首行向左缩进到中文冒号、英文冒号、英文冒号+英文空格
     *          > 1000    ：表示首行向左缩进 (N - 1000) 的 ScaleUnit
     *          -999 ~ -1 : 表示首行向右缩进 -N/10 个中文字符个数（字符高度）
     *          < -1000   ：表示首行向右缩进 (-N - 1000) 的 ScaleUnit
     * @param {number|undefined} options.leadingIndentChars，根据指定的中文字符个数进行首行缩进。
     *          其值可以为小数，比方说 1.5表示 1.5 个中文字符 / 3 个英文字符。> 0 表示首行向左缩进，< 0表示首行向右缩进。
     * @param {number|undefined} options.leadingIndentMM 根据指定的毫米数进行首行缩进。
     *          > 0 表示首行向左缩进，< 0 表示首行向右缩进。
     * @param {boolean|undefined} options.leadingIndentColon 表示首行向左缩进到中文冒号、英文冒号、英文冒号+英文空格。
     * @param {number[]|string|undefined} regionCorners 显示区域四个角的删除矩形，分别为左上、右上、右下、左下，格式为:
     *          `[Width, Height, Width, Height, Width, Height, Width, Height]`，单位毫米。
     * @param {number[]|string|undefined} regionLeftUpCorner 显示区域左上角的删除矩形，格式为：`[Width, Height]`，单位毫米。
     * @param {number[]|string|undefined} regionRightUpCorner 显示区域右上角的删除矩形，格式为：`[Width, Height]`，单位毫米。
     * @param {number[]|string|undefined} regionRightBottomCorner 显示区域右下角的删除矩形，格式为：`[Width, Height]`，单位毫米。
     * @param {number[]|string|undefined} regionLeftBottomCorner 显示区域左下角的删除矩形，格式为：`[Width, Height]`，单位毫米。
     * @param {number[]|string|undefined} regionLeftBorders 显示区域左边的删除矩形，最多支持删除两个矩形，
     *          格式为：`[Width, Y, Height, Width, Y, Height]`，单位毫米。
     * @param {number[]|string|undefined} regionRightBorders 显示区域右边的删除矩形，最多支持删除两个矩形，
     *          格式为：`[Width, Y, Height, Width, Y, Height]`，单位毫米。
     * @param {boolean|undefined} onlyMeasureText 表示仅仅度量、而不真正的绘制文本。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     * @param {LPA_ItemAlignment|undefined} options.horizontalAlignment 水平对齐方式。不指定表示使用 {@link setItemHorizontalAlignment()} 设置的参数，
     *          默认为{@link LPA_ItemAlignment.Start}，表示居左对齐。
     * @param {LPA_ItemAlignment|undefined} options.verticalAlignment 垂直对齐方式。不指定表示使用 {@link setItemVerticalAlignment()} 设置的参数,
     *          默认为: {@link LPA_ItemAlignment.Start}，表示居上对齐。
     */
    DTPWeb.prototype.drawText = function (options) {
        options = utils.getRequestData(["text", "x", "y", "width", "height", "fontHeight", "fontStyle"], arguments);
        if (!options.text)
            return false;
        //
        options.fontHeight = this.getFontHeight(options.fontHeight || options.height);
        options.fontName = this.getFontName(options.fontName);
        options = utils.unitConvertOfDrawBase(options, this._margins);
        //
        utils.checkTextOptions(options);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Text }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.DrawText, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 打印一维条码。
     *
     * @param {DrawBarcodeOptions} options 一维码绘制相关选项。
     *
     * @param {string} options.text 待绘制的一维码数据。
     * @param {number|undefined} options.x 绘制对象的水平坐标位置，单位毫米。值默认为0。
     * @param {number|undefined} options.y 绘制对象的垂直坐标位置，单位毫米。值默认为0。
     * @param {number|undefined} options.width 绘制对象的显示宽度，单位毫米。
     *          值默认为0，表示根据 {@link barPixels} 设定的点的大小自动计算对象宽度。
     * @param {number|undefined} options.height 绘制对象的显示高度，单位毫米。
     *          值默认为0，表示根据 {@link barPixels} 设定的点的大小自动计算对象宽度。
     * @param {number|undefined} options.textHeight 一维码中供人识读文本的高度，单位毫米，
     *          值默认为0，表示不显示一维码下面的字符串。
     * @param {LPA_BarcodeType|undefined} options.type 一维码类型，默认为{@link LPA_BarcodeType.LPA_1DBT_AUTO}，表示根据字符串自动采用最佳方式。
     * @param {string|undefined} options.fontName 一维码中供人识读文本的字体名称，默认为{@link CONSTANTS.FONT_NAME}。
     * @param {LPA_FontStyle|undefined} options.fontStyle 一维码供人识读文本的字体风格，默认为{@link LPA_FontStyle.Regular}，表示显示常规字体样式。
     * @param {LPA_ItemAlignment|undefined} options.textAlignment 一维码供人识读文本的水平对齐方式，值参考{@link LPA_ItemAlignment}，
     *          >= 5 表示表示跟随一维码本身的水平对齐方式，默认为{@link LPA_ItemAlignment.Center}，也即居中对齐。
     * @param {LPA_BarcodeFlags|undefined} options.barcodeFlags 一维码编码参数标志，值参考{@link LPA_BarcodeFlags}，默认为 ShowReadDown | ShowStartStop | EanCheckCode。
     * @param {number} options.barPixels 在不指定一维码宽度的情况下，一维码中每个逻辑点的像素大小，单位像素，值为 1 - 7 之间的任意值，默认为2。
     * @param {number|undefined} options.textBarSpace 一维码供人识读文本和条码的垂直间距，单位毫米，默认为约2个像素。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     * @param {LPA_ItemAlignment|undefined} options.horizontalAlignment 水平对齐方式。不指定表示使用 {@link setItemHorizontalAlignment()} 设置的参数，
     *          默认为{@link LPA_ItemAlignment.Start}，表示居左对齐。
     * @param {LPA_ItemAlignment|undefined} options.verticalAlignment 垂直对齐方式。不指定表示使用 {@link setItemVerticalAlignment()} 设置的参数,
     *          默认为: {@link LPA_ItemAlignment.Start}，表示居上对齐。
     */
    DTPWeb.prototype.draw1DBarcode = function (options) {
        options = utils.getRequestData(["text", "x", "y", "width", "height", "textHeight"], arguments);
        if (!options.text)
            return false;
        //
        options = utils.unitConvertOfDrawBase(options, this._margins);
        options.textHeight = utils.unitConvert(options.textHeight);
        options.textBarSpace = utils.unitConvert(options.textBarSpace);
        options.fontName = this.getFontName(options.fontName);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Barcode }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.Draw1DBarcode, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 打印 QrCode 二维码。
     *
     * @param {DrawQrcodeOptions} options QRCode二维码绘制相关参数。
     *
     * @param {string} options.text 待绘制的二维码数据。
     * @param {number|undefined} options.x 绘制对象的水平坐标位置，单位毫米。
     * @param {number|undefined} options.y 绘制对象的垂直坐标位置，单位毫米。
     * @param {number|undefined} options.width 绘制对象的显示宽度，单位毫米
     *          值默认为0，表示根据 {@link qrcPixels} 设定的点的大小自动计算二维码大小。
     * @param {number|undefined} options.height 绘制对象的显示高度，不指定表示按照：{@link width} 来显示，单位毫米。
     * @param {LPA_QRTextEncoding|undefined} options.textEncoding 字符串编码方式，值参考{@link LPA_QRTextEncoding}，默认为{@link LPA_QRTextEncoding.UTF8}。
     * @param {number|undefined} options.qrcPixels 表示在不指定二维码显示宽度的情况下，二维码每个逻辑点的像素个数，默认为2个像素。
     * @param {number|number} options.qrcVersion 二维码编码最小版本号，1~40，默认为根据内容自动计算。
     * @param {LPA_QREncodeMode|undefined} options.encodeMode 二维码编码模式，值参考{@link LPA_QREncodeMode}，默认为{@link LPA_QREncodeMode.ModeNum}。
     *          如果编码内容需要更高级别的编码模式，程序会自动升级模式。
     * @param {LPA_QREccLevel|undefined} options.eccLevel 二维码纠错模式，值参考{@link LPA_QREccLevel}，默认为{@link LPA_QREccLevel.EccLevel_L}。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     * @param {LPA_ItemAlignment|undefined} options.horizontalAlignment 水平对齐方式。不指定表示使用 {@link setItemHorizontalAlignment()} 设置的参数，
     *          默认为{@link LPA_ItemAlignment.Start}，表示居左对齐。
     * @param {LPA_ItemAlignment|undefined} options.verticalAlignment 垂直对齐方式。不指定表示使用 {@link setItemVerticalAlignment()} 设置的参数,
     *          默认为: {@link LPA_ItemAlignment.Start}，表示居上对齐。
     */
    DTPWeb.prototype.draw2DQRCode = function (options) {
        options = utils.getRequestData(["text", "x", "y", "width", "height", "eccLevel"], arguments);
        if (!options.text)
            return false;
        //
        options = utils.unitConvertOfDrawBase(options, this._margins);
        if (!options.height)
            options.height = options.width;
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.QRCode }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.Draw2DQRCode, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 打印 Pdf417 二维码。
     *
     * @param {DrawPdf417Options} options PDF417二维码绘制选项。
     *
     * @param {string} options.text 待绘制的PDF417二维码数据。
     * @param {number|undefined} options.x 绘制对象的水平坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y 绘制对象的垂直坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.width 绘制对象的显示宽度，单位毫米
     *          值默认为0，表示根据 {@link p417Pixels} 设置的大小自动计算二维码宽度。
     * @param {number|undefined} options.height 绘制对象的显示高度，单位毫米
     *          值默认为0，表示根据 {@link p417Pixels} 设置的大小自动计算二维码高度。
     * @param {number|undefined} options.textEncoding 字符串编码方式，{@link LPA_P417TextEncoding}，默认为{@link LPA_P417TextEncoding.UTF8}。
     * @param {number|undefined} options.p417Pixels 在不指定二维码宽度的情况下每个逻辑点的像素个数，默认为2。
     * @param {LPA_P417EncodeMode|undefined} options.encodeMode 二维码编码模式，值参考{@link LPA_P417EncodeMode}，
     *          默认为{@link LPA_P417EncodeMode.Auto}。如果编码内容需要更高级别的编码模式，程序会自动升级模式。
     * @param {LPA_P417EccLevel|undefined} options.eccLevel 二维码纠错模式，值参考{@link LPA_P417EccLevel}，默认为{@link LPA_P417EccLevel.Auto}。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     * @param {LPA_ItemAlignment|undefined} options.horizontalAlignment 水平对齐方式。不指定表示使用 {@link setItemHorizontalAlignment()} 设置的参数，
     *          默认为{@link LPA_ItemAlignment.Start}，表示居左对齐。
     * @param {LPA_ItemAlignment|undefined} options.verticalAlignment 垂直对齐方式。不指定表示使用 {@link setItemVerticalAlignment()} 设置的参数,
     *          默认为: {@link LPA_ItemAlignment.Start}，表示居上对齐。
     */
    DTPWeb.prototype.draw2DPdf417 = function (options) {
        options = utils.getRequestData(["text", "x", "y", "width", "height"], arguments);
        if (!options.text)
            return false;
        //
        options = utils.unitConvertOfDrawBase(options, this._margins);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Pdf417 }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.Draw2DPdf417, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 打印 DataMatrix 二维码。
     *
     * @param {DrawDataMatrixOptions} options DataMatrix 二维码绘制选项。
     *
     * @param {string} options.text 待绘制的二维码数据。
     * @param {number|undefined} options.x 绘制对象的水平坐标位置，单位毫米。
     * @param {number|undefined} options.y 绘制对象的垂直坐标位置，单位毫米。
     * @param {number|undefined} options.width 绘制对象的显示宽度，单位毫米
     *          值默认为0，表示根据 {@link dmtxPixels} 设定的点的大小自动计算二维码大小。
     * @param {number|undefined} options.height 绘制对象的显示高度，不指定表示按照：{@link width} 来显示，单位毫米。
     * @param {LPA_DMTextEncoding|undefined} options.textEncoding 字符串编码方式，值参考{@link LPA_DMTextEncoding}，默认为{@link LPA_QRTextEncoding.UTF8}。
     * @param {number|undefined} options.dmtxPixels 表示在不指定二维码显示宽度的情况下，二维码每个逻辑点的像素个数，默认为2个像素。
     * @param {number|number} options.symbolShape
     * @param {LPA_DMEncodeMode|undefined} options.encodeMode 二维码编码模式，值参考{@link LPA_DMEncodeMode}，默认为{@link LPA_QREncodeMode.ModeNum}。
     *          如果编码内容需要更高级别的编码模式，程序会自动升级模式。
     * @param {number|undefined} options.encodeFlags
     * @param {number|undefined} options.minHeight 二维码最小高度，单位毫米。默认自适应。
     * @param {number|undefined} options.maxHeight 二维码最大高度，单位毫米。默认自适应。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     * @param {LPA_ItemAlignment|undefined} options.horizontalAlignment 水平对齐方式。不指定表示使用 {@link setItemHorizontalAlignment()} 设置的参数，
     *          默认为{@link LPA_ItemAlignment.Start}，表示居左对齐。
     * @param {LPA_ItemAlignment|undefined} options.verticalAlignment 垂直对齐方式。不指定表示使用 {@link setItemVerticalAlignment()} 设置的参数,
     *          默认为: {@link LPA_ItemAlignment.Start}，表示居上对齐。
     * @returns 成功与否。
     */
    DTPWeb.prototype.draw2DDataMatrix = function (options) {
        options = utils.getRequestData(["text", "x", "y", "width", "height"], arguments);
        if (!options.text)
            return false;
        //
        options = utils.unitConvertOfDrawBase(options, this._margins);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.DataMatrix }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.Draw2DDataMatrix, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 绘制矩形框。
     *
     * @param {DrawRectOptions} options 矩形框绘制相关选项。
     *
     * @param {number|undefined} options.x 矩形的水平位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y 矩形的垂直位置，单位毫米，值默认为0。
     * @param {number|undefined} options.width 矩形的水平宽度，单位毫米，默认为{@link CONSTANTS.RECT_WIDTH}。
     * @param {number|undefined} options.height 矩形的垂直高度，单位毫米，值默认与宽度相同。
     * @param {number|undefined} options.cornerWidth 矩形的圆角宽度，单位毫米，值默认为0。
     * @param {number|undefined} options.cornerHeight 矩形的圆角高度，单位毫米，值默认为0。
     * @param {number|undefined} options.lineWidth 圆角矩形的线宽，单位毫米，值默认为{@link CONSTANTS.LINE_WIDTH}。
     * @param {boolean|undefined} options.fill 是否绘制填充圆角矩形，值默认为false，表示显示矩形边框。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     */
    DTPWeb.prototype.drawRectangle = function (options) {
        options = utils.getRequestData(["x", "y", "width", "height", "lineWidth"], arguments);
        if (options.cornerWidth || options.cornerHeight) {
            return this.drawRoundRectangle(options);
        }
        //
        options.lineWidth = this.getLineWidth(options.lineWidth);
        options = utils.unitConvertOfDrawRect(options, this._margins);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Rect }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.DrawRectangle, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 绘制圆角矩形。
     *
     * @param {DrawRectOptions} 绘制圆角矩形的相关选项。
     *
     * @param {number|undefined} options.x 圆角矩形的水平位置，单位毫米，值默认为0
     * @param {number|undefined} options.y 圆角矩形的垂直位置，单位毫米，值默认为0
     * @param {number|undefined} options.width 圆角矩形的水平宽度，单位毫米，值默认为{@link CONSTANTS.RECT_WIDTH}。
     * @param {number|undefined} options.height 圆角矩形的垂直高度，单位毫米，值默认与宽度相同。
     * @param {number|undefined} options.cornerWidth 圆角宽度，单位毫米，值默认为0。
     * @param {number|undefined} options.cornerHeight 圆角高度，单位毫米，值默认为0。
     * @param {number|undefined} options.lineWidth 圆角矩形的线宽，单位毫米，值默认为{@link CONSTANTS.LINE_WIDTH}。
     * @param {boolean|undefined} options.fill 是否绘制填充圆角矩形，默认false，表示绘制圆角矩形框。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     */
    DTPWeb.prototype.drawRoundRectangle = function (options) {
        options = utils.getRequestData(["x", "y", "width", "height", "cornerWidth", "lineWidth"], arguments);
        //
        options.cornerWidth = this.getCornerWidth(options.cornerWidth || options.cornerHeight);
        options.lineWidth = this.getLineWidth(options.lineWidth);
        options = utils.unitConvertOfDrawRect(options, this._margins);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.RoundRect }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.DrawRoundRectangle, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 绘制椭圆边框。
     *
     * @param {DrawRectOptions} 椭圆绘制相关选项。
     *
     * @param {number|undefined} options.x 椭圆的水平位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y 椭圆的垂直位置，单位毫米，值默认为0。
     * @param {number|undefined} options.width 椭圆的水平宽度，单位毫米，值默认为{@link CONSTANTS.RECT_WIDTH}。
     * @param {number|undefined} options.height 椭圆的垂直高度，单位毫米，值默认与宽度相同。
     * @param {number|undefined} options.lineWidth 椭圆的线宽，单位毫米，值默认为{@link CONSTANTS.LINE_WIDTH}。
     * @param {boolean|undefined} options.fill 是否绘制填充椭圆，默认为false，表示绘制椭圆边框。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     */
    DTPWeb.prototype.drawEllipse = function (options) {
        options = utils.getRequestData(["x", "y", "width", "height", "lineWidth"], arguments);
        //
        options.lineWidth = this.getLineWidth(options.lineWidth);
        options = utils.unitConvertOfDrawRect(options, this._margins);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Ellipse }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.DrawEllipse, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 绘制圆形。
     *
     * @param {DrawCircleOptions} options 圆形绘制相关参数。
     *
     * @param {number|undefined} options.x 水平方向上的圆心坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y 垂直方向上的圆心坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.radius 圆形半径，单位毫米，值默认为{@link CONSTANTS.RADIUS}。
     * @param {number|undefined} options.lineWidth 圆形边框宽度，单位毫米，值默认为{@link CONSTANTS.LINE_WIDTH}。
     * @param {boolean|undefined} options.fill 是否绘制填充圆形，默认为false，表示只绘制圆形边框。
     */
    DTPWeb.prototype.drawCircle = function (options) {
        options = utils.getRequestData(["x", "y", "radius", "lineWidth"], arguments);
        //
        var radius = this.getRadius(options.radius);
        var width = radius * 2;
        delete options.radius;
        //
        var opts = options;
        opts.x = (options.x || 0) - radius;
        opts.y = (options.y || 0) - radius;
        opts.width = opts.height = width;
        //
        return this.drawEllipse(opts);
    };
    /**
     * 绘制直线。
     *
     * @param {DrawLineOptions} options 直线绘制相关选项。
     *
     * @param {number|undefined} options.x1 点划线起点位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y1 点划线起点位置，单位毫米，值默认为0。
     * @param {number|undefined} options.x2 点划线终点位置，单位毫米，值默认等于x1。
     * @param {number|undefined} options.y2 点划线终点位置，单位毫米，值默认等于y1。
     * @param {number|undefined} options.lineWidth lineWidth: 直线线宽，单位毫米，值默认为{@link CONSTANTS.lineWidth}。
     * @param {number[]|undefined} options.dashLens 点化线线段长度的数组。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     */
    DTPWeb.prototype.drawLine = function (options) {
        options = utils.getRequestData(["x1", "y1", "x2", "y2", "lineWidth"], arguments);
        if ((options.dashLens || options.dashLen || []).length > 0) {
            return this.drawDashLine(options);
        }
        //
        options.lineWidth = this.getLineWidth(options.lineWidth);
        options = utils.unitConvertOfLine(options, this._margins);
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Line }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.DrawLine, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 打印点划线。
     *
     * @param {DrawDashLineOptions} options 点划线绘制相关选项。
     *
     * @param {number|undefined} options.x1 点划线起点位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y1 点划线起点位置，单位毫米，值默认为0。
     * @param {number|undefined} options.x2 点划线终点位置，单位毫米，值默认为x1。
     * @param {number|undefined} options.y2 点划线终点位置，单位毫米，值默认为y1。
     * @param {number|undefined} options.lineWidth lineWidth: 直线线宽，单位毫米，值默认为{@link CONSTANTS.LINE_WIDTH}。线宽是向线的下方延伸的。
     * @param {number[]} options.dashLen 点化线线段长度的数组，默认为{@link CONSTANTS.DASH_LEN}。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     *
     * @info       如果之前没有调用 LPAStartPage 而直接进行打印，则打印函数会自动调用 LPAStartPage(0) 开始一打印页面，然后进行打印。
     * @info       打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     */
    DTPWeb.prototype.drawDashLine = function (options) {
        options = utils.getRequestData(["x1", "y1", "x2", "y2", "dashLen", "lineWidth"], arguments);
        if ((options.dashLen || options.dashLens || []).length < 1) {
            options.dashLens = CONSTANTS.DASH_LEN;
        }
        options.lineWidth = this.getLineWidth(options.lineWidth);
        options = utils.unitConvertOfLine(options, this._margins);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.DashLine }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.DrawDashLine, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     *  打印指定的URL图片。
     *
     * @param {DrawImageUrlOptions} options URL图片绘制相关选项。
     *
     * @param {string} options.imageFile 图片文件或者URL路径。
     * @param {number|undefined} options.x 绘制对象的水平坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y 绘制对象的垂直坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.width 绘制对象的显示宽度，单位毫米，值默认为0，表示图片的实际大小。
     * @param {number|undefined} options.height 绘制对象的显示高度，单位毫米，值默认为0，表示图片的实际大小。
     * @param {number|undefined} options.threshold 图片黑白打印的灰度阈值。
     *          0 表示使用参数设置中的值；
     *          256 表示取消黑白打印，用灰度打印；
     *          257 表示直接打印图片原来的颜色。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     *
     * @info        如果之前没有调用 StartPage 而直接进行打印，则打印函数会自动调用 StartPage开始一打印页面，然后进行打印。
     * @info        打印位置和宽度高度是基于当前页面的位置和方向，不考虑页面和打印动作的旋转角度。
     * @info        图片打印时会被缩放到指定的宽度和高度。
     * @info        标签打印都是黑白打印，因此位图会被转变成灰度图片（RGB三分量相同，0～255取值的颜色）之后，然后根据一阀值将位图再次转换黑白位图再进行打印。
     *              默认灰度阀值为 192，也就是说 >= 192 的会被认为是白色，而 < 192 的会被认为是黑色。
     */
    DTPWeb.prototype.drawImage = function (options) {
        options = utils.getRequestData(["imageFile", "x", "y", "width", "height"], arguments);
        if (!options.imageFile)
            return false;
        //
        options = utils.unitConvertOfDrawBase(options, this._margins);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Image }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi(ACTIONS.DrawImage, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 绘制图片对象。
     *
     * @param {DrawImageDataOptions} options 图片对象绘制选项。
     *
     * @param {any} options.data 图片数据，一般情况下是图片base64字符串。
     * @param {number|undefined} options.x 绘制对象的水平坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.y 绘制对象的垂直坐标位置，单位毫米，值默认为0。
     * @param {number|undefined} options.drawWidth 图片显示宽度，单位毫米，值默认为0，表示图片的实际宽度。
     * @param {number|undefined} options.drawHeight 图片显示高度，单位毫米，值默认为0，表示图片的实际高度。
     * @param {number|undefined} options.threshold 图片黑白转换的灰度阀值，默认为{@link CONSTANTS.THRESHOLD}。
     *          0 表示使用参数设置中的值；
     *          256 表示取消黑白打印，用灰度打印；
     *          257 表示直接打印图片原来的颜色。
     * @param {LPA_SourceImageFormat|undefined} options.format 目标图片数据格式，默认为{@link LPA_SourceImageFormat.LPASIF_IMAGEDATA}，表示BASE64图片。
     * @param {number|undefined} options.imageWidth data中图片的实际宽度，单位像素。
     * @param {number|undefined} options.lineSize 位图数据每一行数据的字节数，默认为零。
     *          如果指定 lineSize，则必须 >= 默认长度；如果为零，则采用如下的默认长度：
     *
     *          LPASIF_BPP_1   : (width + 7) / 8
     *          LPASIF_BPP_1N  : (width + 7) / 8
     *          LPASIF_32_RGBA : width * 4
     *          LPASIF_32_BGRA : width * 4
     *          LPASIF_32_RGB  : width * 4
     *          LPASIF_32_BGR  : width * 4
     *          LPASIF_PACKAGE : 报文格式未使用 lineSize 参数。
     * @param {0|90|180|270|undefined} options.orientation 旋转角度，0、90、180、270。
     *          不指定表示使用 {@link setItemOrientation()} 设置的参数。默认为0，表示不旋转。
     */
    DTPWeb.prototype.drawImageD = function (options) {
        var _a;
        options = utils.getRequestData(["data", "x", "y", "drawWidth", "drawWidth"], arguments);
        if (!options.data)
            return false;
        //
        options.threshold = (_a = options.threshold) !== null && _a !== void 0 ? _a : CONSTANTS.THRESHOLD;
        //
        options = utils.unitConvertOfDrawBase(options, this._margins);
        options.drawWidth = utils.unitConvert(options.drawWidth || this._labelWidth);
        options.drawHeight = utils.unitConvert(options.drawHeight || this._labelHeight);
        //
        if (this.IsJsonMode) {
            if (this._jobPage) {
                options.imageFile = options.data;
                delete options.data;
                this._jobPage.push(Object.assign(options, { type: LPA_DrawType.Image }));
                return true;
            }
            return false;
        }
        else {
            var resp = this.requestApi({
                action: ACTIONS.DrawImageD,
                contentType: LPA_ContentType.Base64,
                data: options.data,
            }, options);
            return (resp === null || resp === void 0 ? void 0 : resp.statusCode) === LPA_Result.OK;
        }
    };
    /**
     * 直接打印指定位图对象。
     *
     * @param {PrintImageOptions} options 图片打印相关选项。
     *
     * @param {string} options.data 打印数据，一般情况下为BASE64格式的图片数据。
     * @param {string|undefined} options.printerName 打印机名称，不指定表示上次连接过的打印机。
     * @param {LPA_SourceImageFormat|undefined} options.format 图片格式，默认为{@link LPA_SourceImageFormat.LPASIF_IMAGEDATA}，
     *          现阶段只支持该格式。
     * @param {number|undefined} options.imageWidth 如果以二进制流的方式传递打印数据，则需要指定对应图片的宽度，单位像素。
     * @param {number|undefined} options.lineSize 二进制流单行数据大小。
     * @param {number|undefined} options.printWidth 图片打印区域宽度，单位毫米，值默认为0，表示按照实际大小来打印。
     * @param {number|undefined} options.printHeight 图片打印区域高度，单位毫米，值默认为0，表示按照实际大小来打印。
     * @param {number|undefined} options.threshold 图片进行黑白转换时的阈值，默认为{@link CONSTANTS.THRESHOLD}。
     * @param {number|undefined} options.orientation 图片打印方向，默认为0，表示打印前不进行图片的旋转操作。
     * @param {number|undefined} options.copies 打印份数，默认只打印1份。
     * @param {string|undefined} options.jobName 打印任务名称。
     */
    DTPWeb.prototype.printImage = function (options) {
        var _a;
        options = utils.getRequestData(["data"], [options]);
        if (!options.data)
            return;
        //
        options.scaleUnit = 1;
        options.printWidth = utils.unitConvert(options.printWidth);
        options.printHeight = utils.unitConvert(options.printHeight);
        options.threshold = (_a = options.threshold) !== null && _a !== void 0 ? _a : CONSTANTS.THRESHOLD;
        options.jobName = options.jobName || LPA_JobNames.Print;
        //
        this.requestApi({
            action: ACTIONS.PrintImageD,
            contentType: LPA_ContentType.Base64,
            data: options.data,
            // linux下多份打印的时候，数据传输时间比较长
            timeout: 3 * 60000,
            callback: function (resp) {
                if (typeof options.callback === "function") {
                    options.callback(resp.statusCode === LPA_Result.OK);
                }
            },
        }, options);
    };
    // /**
    //  * 直接打印打印机所支持的控制命令数据，可以是打印数据，也可以是参数设置命令等。
    //  *
    //  * @param options 命令打印相关选项。
    //  *
    //  * @param {string|undefined} options.printerName 打印机名称，不指定表示上次连接过的打印机。
    //  * @param {number|undefined} options.copies 打印份数，默认只打印1份。
    //  * @param {string|undefined} options.jobName 打印任务名称。
    //  */
    // public printRawData(options: RawDataPrintOptions): boolean {
    //     options = utils.getRequestData(["data"], arguments);
    //     if (!options.data) return false;
    //     //
    //     const resp = this.requestApi(ACTIONS.PrintRawData, options);
    //     return resp ? resp.statusCode === LPA_Result.OK : false;
    // }
    // /**
    //  * 直接打印 LPASIF_PACKAGE 格式的图片数据。
    //  *
    //  * @param options LPASIF_PACKAGE 格式图片打印相关选项。
    //  *
    //  * @param {string|undefined} options.printerName 打印机名称，不指定表示上次连接过的打印机。
    //  * @param {number|undefined} options.width 打印位图水平宽度，单位是像素。
    //  * @param {number|undefined} options.copies 打印份数，默认只打印1份。
    //  * @param {string|undefined} options.jobName 打印任务名称。
    //  */
    // public printPackage(options: PackagePrintOptions): boolean {
    //     options = utils.getRequestData(["data"], [options]);
    //     if (!options.data) return false;
    //     //
    //     const resp = this.requestApi(ACTIONS.PrintPackage, options);
    //     return resp ? resp.statusCode === LPA_Result.OK : false;
    // }
    /**
     * 根据给定的标签配置信息，打印整个打印任务。
     *
     * @param {PrintJobOptions} options 打印配置信息。
     *
     * @returns 打印成功与否
     */
    DTPWeb.prototype.print = function (options) {
        if (!options || !options.jobPages)
            return undefined;
        //
        var actionParam = options.action || CONSTANTS.PRINT_ACTION;
        if (options.action)
            delete options.action;
        //
        this.requestApi({
            action: ACTIONS.Print,
            timeout: 60 * 1000,
            contentType: LPA_ContentType.Json,
            params: {
                action: actionParam,
            },
            data: options,
            async: true,
            callback: function (resp) {
                if (typeof options.callback === "function") {
                    options.callback(resp.statusCode === LPA_Result.OK ? resp.resultInfo : undefined);
                }
            },
        });
    };
    DTPWeb.URL_DTPWEB_DOWNLOAD = "https://weida.dothantech.com/assets/dtpweb/index.html";
    DTPWeb.URL_BLOCK_PRIVATE_NETWORK = "chrome://flags/#block-insecure-private-network-requests";
    return DTPWeb;
}());
function getInstance(options) {
    return DTPWeb.getInstance(options);
}
function checkServer(options) {
    return DTPWeb.checkServer(options);
}

export { DTPWeb, LPA_DrawType, LPA_FontStyle, LPA_GapType, LPA_ItemAlignment, LPA_JobNames, LPA_ParamID, LPA_PrintActions, LPA_PrintDarkness, LPA_PrintSpeed, LPA_Result, checkServer, getInstance };
