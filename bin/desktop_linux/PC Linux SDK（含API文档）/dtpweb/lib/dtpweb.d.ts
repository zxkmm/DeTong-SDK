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
import { LPA_JobStartOptions, LPA_Response, LPA_FontStyle, LPA_GapType, LPA_ItemAlignment, LPA_JobNames, LPA_PageImage, LPA_PageInfo, LPA_ParamID, LPA_PrintDarkness, LPA_PrintSpeed, LPA_Result, LPA_PrinterPropertyOptions, LPA_PrinterOptions, LPA_Device, LPA_PrintParamOptions, LPA_JobInfoOptions, LPA_JobInfo, LPA_PageImageOptions, PrintOptions, DrawTextOptions, DrawBarcodeOptions, DrawQrcodeOptions, DrawPdf417Options, DrawRectOptions, DrawLineOptions, DrawImageUrlOptions, DrawImageDataOptions, PrintImageOptions, DrawCircleOptions, LPA_DrawResultOptions, LPA_InitOptions, PrintJobOptions, DrawDataMatrixOptions, LPA_PrintActions, LPA_VersionInfo, LPA_DefaultPrinter, LPA_PrinterDPI, LPA_ServerInfo, LPA_DrawType } from "./utils";
/**
 * 接口初始信息配置选项。
 */
interface InitOptions extends LPA_InitOptions {
    callback?: (api: DTPWeb | undefined, resp: LPA_Response<LPA_ServerInfo>) => void;
}
/**
 * 对底层 dtpweb 打印助手的二次封装。
 */
declare class DTPWeb {
    private static readonly URL_DTPWEB_DOWNLOAD;
    private static readonly URL_BLOCK_PRIVATE_NETWORK;
    /**
     * 检查打印服务是否运行正常。
     * @param options 打印服务相关初始配置信息。
     * @param options.callback: (api?: DTPWeb, info?: LPA_ServerInfo) => void 打印服务检查回调信息。
     * @returns 成功：返回 DTPWeb 实例，失败：返回 undefined;
     */
    static checkServer(options?: InitOptions | ((api: DTPWeb | undefined, resp: LPA_Response<LPA_ServerInfo>) => void)): DTPWeb;
    /**
     * 获取一个单实例接口对象。
     *
     * @param options 接口初始话配置信息。
     *
     * @returns 返回一个单实例接口对象。
     */
    static getInstance(options?: LPA_InitOptions): DTPWeb;
    /** 是否显示相关提示信息？ */
    private _showAlert?;
    /** 是否使用 JSON 方式进行数据的统一发送？ */
    private _jsonMode?;
    /** 是否显示打印日志信息。 */
    private _showLog?;
    /** 初始化IP地址 */
    private _initIp?;
    /** 初始化端口号 */
    private _initPort?;
    /** 用户初始化时指定的请求超时时间 */
    private _timeout?;
    private _ip?;
    private _port?;
    private _deviceType?;
    private _deviceName?;
    private _labelWidth;
    private _labelHeight;
    private _fontName?;
    private _fontHeight?;
    private _lineWidth?;
    private _radius?;
    private _cornerWidth?;
    private _downloadUrl?;
    private readonly _margins;
    private _localIPs;
    private _version;
    private _Response?;
    private _printJobInfo?;
    private _jobPage?;
    private _printJobResult?;
    /** 获取到的打印机列表 */
    private _deviceList?;
    /**
     * 最后一次请求的响应信息。
     */
    get LastResponse(): LPA_Response<any> | undefined;
    get IsJsonMode(): boolean;
    protected getIpAddress(ip?: string): string | undefined;
    protected getPort(port?: number): number | undefined;
    protected getTimeout(timeout?: number, type?: number): number;
    protected getDeviceType(type?: number): number | undefined;
    protected getFontName(v?: string): string;
    protected getFontHeight(v?: number): number;
    protected getLineWidth(v?: number): number;
    protected getRadius(v?: number): number;
    protected getCornerWidth(v?: number): number;
    protected parseMargin(options: LPA_JobStartOptions): number[];
    setFontName(v: string): void;
    setOffsetX(v: number): void;
    setOffsetY(v: number): void;
    /**
     * 接口初始化配置。
     */
    init(options?: LPA_InitOptions): void;
    private logMsg;
    private logObj;
    protected setServerInfo(info: LPA_ServerInfo): void;
    isLocalPrinter(printerType?: number | LPA_Device): boolean;
    /**
     * 检测插件是否可用。
     *
     * @param {(api?: DTPWeb) => void | undefined} callback 插件检测结果回调函数。
     */
    checkPlugin(callback?: (resp: LPA_Response<LPA_ServerInfo>) => void): void;
    /**
     * 检查指定的端口号是否可用。
     *
     * @param {number | undefined} port 待检测目标端口，不指定的时候默认端口为{@link CONSTANTS.PORT1}。
     * @param {(api?: DTPWeb) => void} callback 端口检测回调函数，参数表示端口是否可用。
     */
    checkPort(port?: number, callback?: (resp: LPA_Response<LPA_ServerInfo>) => void): void;
    /**
     * 请求web服务器。
     *
     * @param {LPA_RequestOptions | string} options HTTP请求相关配置选项。
     * @param {any} data 请求参数;
     */
    private requestApi;
    /**
     * 获取dtpweb打印助手的版本信息。
     */
    getVersion(): LPA_VersionInfo | undefined;
    /**
     * 获取dtpweb打印助手相关信息。
     */
    getServerInfo(): LPA_ServerInfo | undefined;
    /**
     * 默认只支持德佟系列的打印机，其他厂家的打印机需要通过该接口来配置后才可以使用。
     */
    setSupportedPrinters(supportedPrinters: string): boolean | undefined;
    /**
     * 获取系统默认打印机相关信息。
     */
    getDefaultPrinter(): LPA_DefaultPrinter | undefined;
    /**
     * 修改系统默认打印机。
     */
    setDefaultPrinter(printerName: string): void;
    /**
     * 搜索局域网内的打印机。
     *
     * 建议在搜索命令下发2秒钟之后再通过{@link getPrinters()}来获取打印机列表。
     *
     * @param mode 打印机搜索模式，值默认为1。
     * @returns 成功与否。
     */
    discoveryPrinters(mode?: number): boolean;
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
    getPrinters(options: LPA_PrinterOptions, timeout?: number): LPA_Device[];
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
    openPrinter(options?: string | LPA_Device, callback?: (success: boolean) => void): void;
    /**
     * 获取已连接的打印机名称。
     */
    getPrinterName(): string;
    /**
     * 判断打印机是否已打开。
     */
    isPrinterOpened(): boolean;
    /**
     * 判断当前打印机是否在线。
     */
    isPrinterOnline(): boolean;
    /**
     * 关闭已经打开的打印机。
     *
     * @info 关闭打印机时，当前还有未打印的任务/数据将会被自动提交打印，同时所有参数设置将会被保留。
     */
    closePrinter(): boolean;
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
    showProperty(data: LPA_PrinterPropertyOptions): boolean;
    /**
     * 获取打印相关参数。
     *
     * @param {LPA_ParamID} id 打印参数ID，ID值可参考 {@link LPA_ParamID}。
     *
     * @return {number} 值参考 {@link LPA_ParamID} 中不同ID所对应的值类型。
     */
    getParam(id: LPA_ParamID): number;
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
    setParam(options: LPA_PrintParamOptions): boolean;
    /**
     * 获取已连接打印机的纸张类型。
     */
    getGapType(): LPA_GapType;
    /**
     * 修改已连接打印机的纸张类型。
     *
     * @param {LPA_GapType} value 纸张类型。
     */
    setGapType(value: LPA_GapType): boolean;
    /**
     * 返回已连接打印机的打印浓度。
     *
     * @return {number} 打印机浓度值说明可参考 {@link LPA_PrintDarkness};
     */
    getPrintDarkness(): number;
    /**
     * 修改已连接打印机的打印浓度。
     *
     * @param {number} value 打印浓度。
     */
    setPrintDarkness(value: number): boolean;
    /**
     * 返回已连接打印机的打印速度。
     */
    getPrintSpeed(): number;
    /**
     * 修改已连接打印机的打印速度。
     *
     * @param {number} value 打印速度，值参考{@link LPA_PrintSpeed}。
     */
    setPrintSpeed(value: number): boolean;
    /**
     * 获取打印机的分辨率（打印机链接成功后有效）。
     */
    getPrinterDPI(): LPA_PrinterDPI | undefined;
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
    startJob(options: LPA_JobStartOptions): boolean;
    /**
     *  取消当前打印任务。
     *
     *  使用说明：当前还有未打印的任务/数据将会被全部丢弃，但是所有参数设置将会被保留。
     */
    abortJob(): void;
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
    commitJob(options?: PrintOptions | ((success: boolean) => void)): void;
    /**
     * 得到最近一次打印任务的标识。
     *
     * @return 打印任务标识。
     */
    getJobID(): number;
    /**
     * 得到打印任务的状态信息。
     * @param {LPA_JobInfo} options 任务选项。
     *
     * @param {string|undefined} options.printerName 打印机名称，为空表示当前打开的打印机。
     * @param {number|undefined} options.jobID 打印任务标识，为0表示最近一次的打印任务。
     *
     * @return 返回任务信息,格式为 JOB_INFO_1，为 NULL 用于测量需要的空间字节数。
     */
    getJobInfo(options: LPA_JobInfo): LPA_JobInfoOptions | undefined;
    /**
     * 得到刚完成的打印任务的打印任务信息。
     *
     * @return {LPA_PageInfo} 返回刚完成的打印任务信息
     */
    getPageInfo(): LPA_PageInfo;
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
    getPageImage(options: LPA_PageImageOptions): LPA_PageImage;
    /**
     * 开始一打印页面。
     *
     * @info 如果之前没有调用 StartJob，则本函数会自动调用 StartJob，然后再开始一打印页面。此后调用 EndPage 结束打印时，打印任务会被自动提交打印。
     *       页面旋转角度非 0 打印时，必须在打印动作之前设置打印页面尺寸信息。
     */
    startPage(): boolean;
    /**
     * 结束一打印页面。
     *
     * @info 如果之前没有调用 StartJob 而直接调用 StartPage，则本函数会自动提交打印。
     */
    endPage(): boolean;
    /**
     * 设置绘制函数是否返回绘制的详细信息？
     *
     * @param options 字符串打印相关参数。
     *
     * @param {boolean|undefined} options.returnDrawResult 绘制函数是否返回绘制的详细信息。
     */
    returnDrawResult(options: LPA_DrawResultOptions | boolean): boolean;
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
    mm2Pound(value: number): number;
    /**
     * 将给定的磅值转换为毫米值。
     *
     * 该函数常用于绘制字符串的时候字体大小的单位换算。
     *
     * @param value 待转换的值，单位磅。
     * @returns 转换后的值，单位毫米。
     */
    pound2Mm(value: number): number;
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
    drawText(options: DrawTextOptions): boolean;
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
    draw1DBarcode(options: DrawBarcodeOptions): boolean;
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
    draw2DQRCode(options: DrawQrcodeOptions): boolean;
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
    draw2DPdf417(options: DrawPdf417Options): boolean;
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
    draw2DDataMatrix(options: DrawDataMatrixOptions): boolean;
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
    drawRectangle(options: DrawRectOptions): boolean;
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
    drawRoundRectangle(options: DrawRectOptions): boolean;
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
    drawEllipse(options: DrawRectOptions): boolean;
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
    drawCircle(options: DrawCircleOptions): boolean;
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
    drawLine(options: DrawLineOptions): boolean;
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
    drawDashLine(options: DrawLineOptions): boolean;
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
    drawImage(options: DrawImageUrlOptions): boolean;
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
    drawImageD(options: DrawImageDataOptions): boolean;
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
    printImage(options: PrintImageOptions): void;
    /**
     * 根据给定的标签配置信息，打印整个打印任务。
     *
     * @param {PrintJobOptions} options 打印配置信息。
     *
     * @returns 打印成功与否
     */
    print(options: PrintJobOptions): void;
}
declare function getInstance(options?: InitOptions): DTPWeb;
declare function checkServer(options?: InitOptions | ((api: DTPWeb | undefined, resp: LPA_Response<LPA_ServerInfo>) => void)): DTPWeb;
export { DTPWeb, LPA_Device, LPA_ParamID, LPA_GapType, LPA_PrintSpeed, LPA_PrintDarkness, LPA_ItemAlignment, LPA_FontStyle, LPA_DrawType, LPA_JobNames, LPA_JobInfo, LPA_PrintActions, LPA_PrinterOptions, LPA_ServerInfo, LPA_Response, LPA_Result, DrawImageDataOptions, PrintImageOptions, getInstance, checkServer, };
