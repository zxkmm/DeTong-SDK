<template>
    <div>
        <div class="dz-title">VUE打印测试</div>
        <ul class="dz-opt-group">
            <div class="dz-opt-item">
                <label class="dz-opt-item-title">打印机:</label
                ><select class="dz-opt-item-value" v-model="currPrinter">
                    <option v-for="item in printers" :key="item.title" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
            <div class="dz-opt-item">
                <label class="dz-opt-item-title">纸张类型:</label
                ><select class="dz-opt-item-value" v-model="currGapType">
                    <option v-for="item in gapTypes" :key="item.value" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
            <div class="dz-opt-item">
                <label class="dz-opt-item-title">打印浓度:</label
                ><select class="dz-opt-item-value" v-model="currDarkness">
                    <option v-for="item in darkness" :key="item.value" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
            <div class="dz-opt-item">
                <label class="dz-opt-item-title">打印速度:</label
                ><select class="dz-opt-item-value" v-model="currSpeed">
                    <option v-for="item in speeds" :key="item.value" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
            <div class="dz-opt-item">
                <label class="dz-opt-item-title">打印模式:</label
                ><select class="dz-opt-item-value" v-model="currJobName">
                    <option v-for="item in jobTypes" :key="item.value" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
            <div class="dz-opt-item">
                <label class="dz-opt-item-title">打印方向:</label
                ><select class="dz-opt-item-value" v-model="currOrientation">
                    <option v-for="item in orientations" :key="item.value" :value="item.value">{{ item.name }}</option>
                </select>
            </div>
        </ul>
        <fieldset>
            <legend>打印机相关</legend>
            <ul class="dz-btn-group">
                <a class="button" @click="onOpenPrinter()">打开打印机</a>
                <a class="button" @click="onClosePrinter()">关闭打印机</a>
                <a class="button" @click="onGetPrinterName()">获取打印机名称</a>
                <a class="button" @click="onIsPrinterOpened()">打印机是否打开</a>
                <a class="button" @click="onShowPrinterProperty()">显示打印机属性</a>
            </ul>
        </fieldset>
        <fieldset>
            <legend>任务绘制测试</legend>
            <ul class="dz-btn-group">
                <a class="button" @click="onDrawText()">绘制文本</a>
            </ul>
            <ul class="dz-btn-group">
                <a class="button" @click="onSetAlign()">对齐方式测试</a>
                <a class="button" @click="onSetRotation()">内容旋转测试</a>
            </ul>
            <ul class="dz-btn-group">
                <a class="button" @click="onDrawBarcode()">绘制一维码</a>
                <a class="button" @click="onDrawQrcode()">绘制二维码</a>
                <a class="button" @click="onDrawPDF417()">绘制PDF417</a>
                <a class="button" @click="onDrawDataMatrix()">绘制DataMatrix</a>
            </ul>
            <ul class="dz-btn-group">
                <a class="button" @click="onDrawImageFile()">绘制url图片</a>
                <a class="button" @click="onDrawImageData()">绘制BASE64图片</a>
            </ul>
            <ul class="dz-btn-group">
                <a class="button" @click="onDrawLine()">绘制直线</a>
                <a class="button" @click="onDrawRect()">绘制矩形</a>
                <a class="button" @click="onDrawEllipse()">绘制椭圆</a>
                <a class="button" @click="onDrawCircle()">绘制圆形</a>
            </ul>
        </fieldset>
        <fieldset>
            <legend>打印测试</legend>
            <ul class="dz-btn-group">
                <a class="button" @click="onPrintImageData()">打印BASE64(预览)图片</a>
                <a class="button" @click="onPrintJson()">打印JSON绘制任务</a>
            </ul>
        </fieldset>
        <fieldset class="dz-preview-group">
            <legend>打印预览</legend>
            <div class="dz-preview" ref="preview-list"></div>
        </fieldset>
    </div>
</template>

<script>
import { DTPWeb, LPA_JobNames, LPA_PrintActions } from "dtpweb";
import TestData from "./data";

export default {
    name: "App",
    data() {
        return {
            printers: [{ name: "未检测到打印机", value: {} }],
            currPrinter: { name: "" },
            gapTypes: [
                { name: "随打印机", value: 255 },
                { name: "连续纸", value: 0 },
                { name: "定位孔", value: 1 },
                { name: "间隙纸", value: 2 },
            ],
            currGapType: 255,
            speeds: [
                { name: "随打印机", value: 255 },
                { name: "1(特慢)", value: 0 },
                { name: "2(慢)", value: 1 },
                { name: "3(正常)", value: 2 },
                { name: "4(快)", value: 3 },
                { name: "5(特快)", value: 4 },
            ],
            currSpeed: 255,
            darkness: [
                { name: "随打印机", value: 255 },
                { name: "6(正常)", value: 5 },
                { name: "7", value: 6 },
                { name: "8", value: 7 },
                { name: "9", value: 8 },
                { name: "10(较浓)", value: 9 },
                { name: "11", value: 10 },
                { name: "12", value: 11 },
                { name: "13", value: 12 },
                { name: "14", value: 13 },
                { name: "15(特浓)", value: 14 },
            ],
            currDarkness: 255,
            jobTypes: [
                { name: "打印模式", value: LPA_JobNames.Print },
                { name: "白色底色图片", value: LPA_JobNames.Preview },
                { name: "透明底色图片", value: LPA_JobNames.Transparent },
            ],
            currJobName: LPA_JobNames.Preview,
            orientations: [
                { name: "水平方向", value: 0 },
                { name: "右转90度", value: 90 },
                { name: "180度旋转", value: 180 },
                { name: "左转90度", value: 270 },
            ],
            currOrientation: 0,
            /**
             * @type {DTPWeb | undefined}
             */
            api: undefined,
            showDocument: false,
            jobName: "",
        };
    },
    mounted() {
        DTPWeb.checkServer({
            downloadUrl: "https://weida.dothantech.com/beta/assets/dtpweb/index.html",
            callback: (api, server) => {
                this.api = api;
                console.log(`---- ---- check server ---- ----`);
                console.log(server);
                if (api) {
                    this.updatePrinterList();
                } else {
                    this.printers[0].name = "未检测到打印插件";
                }
            },
        });
    },
    watch: {
        currPrinter() {
            this.updatePrintParams();
        },
    },
    methods: {
        isPrintJob() {
            return this.currJobName !== LPA_JobNames.Preview && this.currJobName !== LPA_JobNames.Transparent;
        },
        getJobAction() {
            if (this.currJobName === LPA_JobNames.Preview) return LPA_PrintActions.PrevBase64;
            else if (this.currJobName === LPA_JobNames.Transparent) return LPA_PrintActions.TransBase64;
            else return LPA_PrintActions.Print;
        },
        /**
         * 更新打印机列表。
         */
        updatePrinterList() {
            if (!this.api) return;
            //
            const api = this.api;
            //
            const values = api.getPrinters();
            // 清空旧打印机列表
            this.printers.splice(0);
            //
            if (values?.length > 0) {
                for (const item of values) {
                    const title = api.isLocalPrinter(item) ? item.name : `${item.name}@${item.ip}`;
                    this.printers.push({
                        name: title,
                        value: item,
                    });
                }
                //
                this.currPrinter = values[0];
            } else {
                this.printers.push({ name: "未检测到打印机", value: "" });
            }
        },
        /**
         * 获取并更新打印参数
         */
        updatePrintParams() {
            if (!this.api) return;
            //
            this.api.openPrinter(this.currPrinter, (success) => {
                if (success) {
                    this.currGapType = this.api.getGapType();
                    this.currDarkness = this.api.getPrintDarkness();
                    this.currSpeed = this.api.getPrintSpeed();
                    //
                    this.api.closePrinter();
                }
            });
        },
        /**
         * 打开打印机测试
         */
        onOpenPrinter() {
            const printer = this.printers[0].value;
            this.api?.openPrinter(printer, function (value) {
                alert(value ? "打印机打开成功!" : "打印机打开失败");
            });
        },
        /**
         * 关闭打印机测试
         */
        onClosePrinter() {
            this.api.closePrinter();
        },
        /**
         * 获取打印机名称
         */
        onGetPrinterName() {
            if (this.api?.isPrinterOpened()) {
                const name = this.api.getPrinterName();
                alert(name);
            } else {
                alert("打印机未连接");
            }
        },
        /**
         * 检测打印机是否打开
         */
        onIsPrinterOpened() {
            const value = this.api?.isPrinterOpened();
            alert(value);
        },
        /**
         * 显示打印机首选项/属性
         */
        onShowPrinterProperty() {
            // 打印机首选项与打印机属性交替显示。
            this.api.showProperty({ showDocument: this.showDocument });
            // 切换下次的显示状态。
            this.showDocument = !this.showDocument;
        },
        openPrinter(callback) {
            if (this.api) {
                this.api.openPrinter(this.currPrinter, callback);
            } else if (callback) {
                callback(false);
            }
        },
        /**
         * 直线绘制测试
         */
        onDrawLine() {
            this.openPrinter((success) => {
                if (!this.isPrintJob || success) {
                    //
                    const width = 45;
                    const lineSpace = 5;
                    const height = lineSpace * 4;
                    const lineWidth = 0.5;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;

                    // 开始打印任务；
                    if (this.api.startJob({ width, height, orientation, jobName })) {
                        this.api.drawLine({ x1: 0, y1: 5, x2: 45, lineWidth });
                        this.api.drawLine({ x1: 0, y1: 10, x2: 45, lineWidth, dashLens: [0.5, 0.5] });
                        this.api.drawLine({ x1: 0, y1: 15, x2: 45, lineWidth, dashLens: [0.7, 0.3] });
                        // 提交打印任务；
                        this.api.commitJob((success) => {
                            if (success) {
                                // 如果当前任务类型为预览类型，则显示预览效果
                                this.previewJobs();
                            }
                        });
                    }
                }
            });
        },
        /**
         * 矢量图-绘制矩形测试
         */
        onDrawRect() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 45;
                    const height = 30;
                    const padding = 2;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;

                    // 创建打印任务
                    if (this.api.startJob({ width, height, orientation, jobName })) {
                        this.api.startPage();
                        // 第一页，打印矩形框
                        this.api.drawRectangle({
                            x: 0,
                            y: 0,
                            width: width,
                            height: height,
                            lineWidth: 0.4,
                        });
                        // 打印填充矩形
                        this.api.drawRectangle({
                            x: padding,
                            y: padding,
                            width: width - padding * 2,
                            height: height - padding * 2,
                            fill: true,
                        });
                        this.api.endPage();

                        // 第二页，打印圆角矩形框
                        this.api.startPage();
                        // 绘制圆角矩形框
                        this.api.drawRoundRectangle({
                            width: width,
                            height: height,
                            cornerWidth: 3,
                            lineWidth: 0.4,
                        });
                        // 绘制填充圆角矩形
                        this.api.drawRoundRectangle({
                            x: padding,
                            y: padding,
                            width: width - padding * 2,
                            height: height - padding * 2,
                            cornerWidth: 3,
                            fill: true,
                        });
                        this.api.endPage();

                        // 提交打印任务
                        this.api.commitJob((success) => {
                            if (success) {
                                // 如果当前任务类型为预览类型，则显示预览效果
                                this.previewJobs();
                            }
                        });
                    }
                }
            });
        },
        /**
         * 矢量图-椭圆绘制测试
         */
        onDrawEllipse() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 45;
                    const height = 30;
                    const padding = 2;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;

                    // 创建打印任务。
                    if (this.api.startJob({ width, height, orientation, jobName })) {
                        // 绘制椭圆边框
                        this.api.drawEllipse({
                            x: 0,
                            y: 0,
                            width: width,
                            height: height,
                            lineWidth: 0.4,
                        });
                        // 绘制填充椭圆
                        this.api.drawEllipse({
                            x: padding,
                            y: padding,
                            width: width - padding * 2,
                            height: height - padding * 2,
                            fill: true,
                        });
                        // 提交打印任务。
                        this.api.commitJob((success) => {
                            if (success) {
                                // 如果当前任务类型为预览类型，则显示预览效果
                                this.previewJobs();
                            }
                        });
                    }
                }
            });
        },
        /**
         * 矢量图-椭圆绘制测试
         */
        onDrawCircle() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 30;
                    const height = 30;
                    const padding = 2;
                    const radius = width * 0.5;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;

                    // 创建打印任务。
                    if (this.api.startJob({ width, height, orientation, jobName })) {
                        // 绘制椭圆边框
                        this.api.drawCircle({ x: width * 0.5, y: height * 0.5, radius: radius, lineWidth: 0.4 });
                        // 绘制填充圆行
                        this.api.drawCircle({ x: width * 0.5, y: height * 0.5, radius: radius - padding, fill: true });
                        // 提交打印任务。
                        this.api.commitJob((success) => {
                            if (success) {
                                // 如果当前任务类型为预览类型，则显示预览效果
                                this.previewJobs();
                            }
                        });
                    }
                }
            });
        },
        /**
         * 字符串绘制测试
         */
        onDrawText() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    //
                    const width = 40;
                    const height = 20;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    const text = "www.detonger.com";
                    //
                    this.api.startJob({ width, height, orientation, jobName });
                    this.api.drawRectangle({ width, height, lineWidth: 0.35 });
                    this.api.drawText({ text, width, height, fontHeight: 4 });
                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * 一维码绘制测试
         */
        onDrawBarcode() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 45;
                    const height = 30;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    const text = "1234567890";
                    const margin = 5;

                    this.api.startJob({ width, height, orientation, jobName });
                    this.api.draw1DBarcode({
                        text,
                        x: margin,
                        y: margin,
                        width: width - margin * 2,
                        height: height - margin * 2,
                        textHeight: 5,
                        horizontalAlignment: 1,
                    });
                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * 二维码绘制测试
         */
        onDrawQrcode() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 30;
                    const height = 30;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    const margin = 5;
                    const text = "上海道臻信息技术有限公司";
                    // const text = "www.dothantech.com";

                    this.api.startJob({ width, height, orientation, jobName });
                    this.api.draw2DQRCode({
                        text,
                        x: margin,
                        y: margin,
                        width: width - margin * 2,
                    });
                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * PDF417绘制测试
         */
        onDrawPDF417() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 45;
                    const height = 30;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    const text = "上海道臻信息技术有限公司";
                    // const text = "www.dothantech.com";
                    const margin = 5;

                    this.api.startJob({ width, height, orientation, jobName });
                    this.api.draw2DPdf417({
                        text,
                        x: margin,
                        y: margin,
                        width: width - margin * 2,
                        height: height - margin * 2,
                    });

                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * DataMatrix绘制测试
         */
        onDrawDataMatrix() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 40;
                    const height = 40;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    // const text = "上海道臻信息技术有限公司";
                    const text = "www.dothantech.com";
                    const margin = 5;

                    this.api.startJob({ width, height, orientation, jobName });
                    this.api.draw2DDataMatrix({
                        text,
                        x: margin,
                        y: margin,
                        width: width - margin * 2,
                        height: height - margin * 2,
                    });

                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * 绘制图片URL测试
         */
        onDrawImageFile() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 45;
                    const height = 45;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    const url = "http://www.detonger.com/img/QRCode_OfficialAccounts.png";
                    const margin = 5;
                    if (this.api.startJob({ width, height, orientation, jobName })) {
                        this.api.drawImage({
                            imageFile: url,
                            x: margin,
                            y: margin,
                            width: width - margin * 2,
                            height: height - margin * 2,
                        });
                        this.api.commitJob((success) => {
                            if (success) {
                                // 如果当前任务类型为预览类型，则显示预览效果
                                this.previewJobs();
                            }
                        });
                    }
                }
            });
        },
        /**
         * 绘制BASE64图片测试
         */
        onDrawImageData() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const data = TestData.ImageData;
                    const labelWidth = 30;
                    const labelHeight = 30;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;

                    this.api.startJob({ width: labelWidth, height: labelHeight, orientation, jobName });
                    this.api.drawImageD({ data, drawWidth: labelWidth, drawHeight: labelHeight });
                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * 设置内容的对其方式测试
         */
        onSetAlign() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 45;
                    const height = 30;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    const itemWidth = width * 0.5;
                    const itemHeight = height * 0.5;
                    const fontHeight = 3.5;
                    const lineWidth = 0.4;
                    const text = "@上海道臻信息技术有限公司#";
                    // const text = "www.dothantech.com";

                    this.api.startJob({ width, height, orientation, jobName });
                    // 绘制辅助边框
                    this.api.drawRectangle({ width: width, height: height, lineWidth: lineWidth });
                    this.api.drawLine({
                        x1: 0,
                        y1: itemHeight,
                        x2: width,
                        y2: itemHeight,
                        lineWidth: lineWidth,
                    });
                    this.api.drawLine({
                        x1: itemWidth,
                        y1: 0,
                        x2: itemWidth,
                        y2: height,
                        lineWidth: lineWidth,
                    });
                    // 居左，常规字体；
                    this.api.drawText({
                        text: text,
                        x: 0,
                        y: 0,
                        width: itemWidth,
                        height: itemHeight,
                        fontHeight: fontHeight,
                        horizontalAlignment: 0,
                        verticalAlignment: 0,
                    });
                    this.api.drawText({
                        text: text,
                        x: itemWidth,
                        y: 0,
                        width: itemWidth,
                        height: itemHeight,
                        fontHeight: fontHeight,
                        fontStyle: 1,
                        horizontalAlignment: 1,
                        verticalAlignment: 1,
                    });
                    this.api.drawText({
                        text: text,
                        x: itemWidth,
                        y: itemHeight,
                        width: itemWidth,
                        height: itemHeight,
                        fontHeight: fontHeight,
                        fontStyle: 2,
                        horizontalAlignment: 2,
                        verticalAlignment: 2,
                    });
                    this.api.drawText({
                        text: text,
                        x: 0,
                        y: itemHeight,
                        width: itemWidth,
                        height: itemHeight,
                        fontHeight: fontHeight,
                        fontStyle: 2,
                        horizontalAlignment: 3,
                        verticalAlignment: 3,
                    });
                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * 设置内容的旋转测试。
         */
        onSetRotation() {
            this.openPrinter((success) => {
                if (!this.isPrintJob() || success) {
                    const width = 45;
                    const height = 30;
                    const orientation = this.currOrientation;
                    const jobName = this.currJobName;
                    const lineWidth = 0.35;
                    const text = "上海道臻信息技术有限公司";
                    const fontHeight = 3.5;
                    const halfWidth = width * 0.5;
                    const halfHeight = height * 0.5;
                    //
                    this.api.startJob({ width, height, orientation, jobName });
                    // 将整张标签分割成四个区域，分别设置不同的旋转
                    this.api.drawRectangle({ width, height, lineWidth });
                    this.api.drawLine({ x1: 0, y1: halfHeight, x2: width, y2: halfHeight, lineWidth });
                    this.api.drawLine({ x1: halfWidth, y1: 0, x2: halfWidth, y2: height, lineWidth });
                    // 左上角内容不进行旋转
                    this.api.drawText({
                        text,
                        x: 0,
                        y: 0,
                        width: halfWidth,
                        height: halfHeight,
                        fontHeight,
                        orientation: 0,
                    });
                    // 右上角内容，右转90度
                    this.api.drawText({
                        text,
                        x: halfWidth,
                        y: 0,
                        width: halfWidth,
                        height: halfHeight,
                        fontHeight,
                        orientation: 90,
                    });
                    // 左下角内容，180度旋转
                    this.api.drawText({
                        text,
                        x: halfWidth,
                        y: halfHeight,
                        width: halfWidth,
                        height: halfHeight,
                        fontHeight,
                        orientation: 180,
                    });
                    // 右下角内容，270度旋转
                    this.api.drawText({
                        text,
                        x: 0,
                        y: halfHeight,
                        width: halfWidth,
                        height: halfHeight,
                        fontHeight,
                        orientation: 270,
                    });
                    //
                    this.api.commitJob((success) => {
                        if (success) {
                            // 如果当前任务类型为预览类型，则显示预览效果
                            this.previewJobs();
                        }
                    });
                }
            });
        },
        /**
         * 直接打印BASE64图片测试
         */
        onPrintImageData() {
            /**
             * @type {HTMLElement}
             */
            const datas = this.$refs["preview-list"];
            if (datas && datas.childNodes) {
                const childNodes = datas.childNodes;
                for (let i = 0; i < childNodes.length; i++) {
                    if (childNodes[i].src) {
                        this.api.printImage({
                            data: childNodes[i].src,
                            printerName: this.currPrinter?.name,
                        });
                    }
                }
            }
        },
        /**
         * 打印JSON格式绘制任务。
         */
        onPrintJson() {
            const printerName = this.currPrinter ? this.currPrinter.name : undefined;
            if (this.isPrintJob() && !printerName) return;
            //
            const printAction = this.getJobAction();
            const labelWidth = 40;
            const labelHeight = 30;
            // var url = 'http://www.detonger.com/img/QRCode_OfficialAccounts.png';
            // var text1 = '上海道臻信息技术有限公司';
            // var text2 = '1234567';
            //
            this.api.print({
                action: printAction,
                printerInfo: {
                    printerName: this.currPrinter.name,
                },
                jobInfo: { jobWidth: labelWidth, jobHeight: labelHeight, orientation: 0 },
                jobPages: [
                    // 第一张标签，外边框里面套个二维码
                    [
                        { type: "rectangle", width: labelWidth, height: labelHeight, lineWidth: 0.4 },
                        // { type: 'roundRectangle', width: labelWidth, height: labelHeight, lineWidth: 0.4, cornerWidth: 2 },
                        // { type: 'text', text: text1, width: labelWidth, height: labelHeight, fontHeight: 4 },
                        {
                            type: "barcode",
                            text: "12345678",
                            x: 5,
                            y: 5,
                            width: 30,
                            height: 20,
                            textHeight: 4,
                            textAlignment: 3,
                        },
                        // { type: 'qrcode', text: text1, x: 10, y: 5, width: 20, eccLevel: 1 },
                        // { type: 'pdf417', text: text2, x: 5, y: 5, width: 30, height: 20 },
                        // // 绘制图片url
                        // { type: 'image', imageFile: url, x: 10, y: 5, width: 20, height: 20 },
                        // // 绘制BASE64字符串
                        // { type: 'image', imageFile: imgSrc, x: 10, y: 5, width: 20, height: 20 },
                        // { type: 'line', x1: 0, y1: 5, x2: labelWidth, y2: 5, lineWidth: 0.4 },
                        // { type: 'dashLine', x1: 0, y1: 10, x2: labelWidth, y2: 10, lineWidth: 0.4, dashLen: '1,0.5' },
                    ],
                ],
                callback: (results) => {
                    // 先清空预览区域；
                    this.$refs["preview-list"].innerHTML = "";
                    // 显示预览效果
                    if (printAction !== 0x1000 && results) {
                        this.previewPages(results.previewData);
                    }
                },
            });
        },
        addPreview(data) {
            if (!data) return;
            const previewGroup = this.$refs["preview-list"];
            const img = document.createElement("img");
            img.src = data;
            previewGroup.appendChild(img);
            // 换行
            previewGroup.appendChild(document.createElement("br"));
        },
        /**
         * 获取当前任务的图片信息；
         */
        previewJobs() {
            // 先清空预览区域；
            this.$refs["preview-list"].innerHTML = "";

            // 现获取当前打印任务的页数，然后遍历页面图片；
            const info = this.api.getPageInfo();
            // 遍历所有页面数据，然后添加到预览区域
            if (info) {
                const pages = [];
                for (let i = 0; i < info.pages; i++) {
                    const page = this.api.getPageImage({ page: i });
                    pages.push(page.data);
                }
                this.previewPages(pages);
            }
        },
        previewPages(pages) {
            if (pages && pages.length > 0) {
                for (const page of pages) {
                    this.addPreview(page);
                }
            }
        },
        /**
         * 获取 #preview-list中所有img的src；
         */
        getPreviewList() {
            const previewGroup = this.$refs["preview-list"];
            const pageList = [];
            for (let i = 0; i < previewGroup.children.length; i++) {
                const imgElement = previewGroup.children[i];
                if (imgElement?.src) pageList.push(imgElement.src);
            }

            return pageList;
        },
        pix2mm(pxValue, printDpi) {
            printDpi = printDpi || 203;
            return (pxValue * 25.4) / printDpi;
        },
    },
};
</script>

<style lang="stylus">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body {
    text-align: center;
}
.dz-title {
    font-weight: bold;
    font-size: 20px;
}
.dz-opt-group .dz-opt-item {
    display: flex;
    width: 400px;
    height: 28px;
    margin: 0 auto 10px auto;
}
.dz-opt-group .dz-opt-item .dz-opt-item-title {
    flex: 2;
    display: inline-block;
    text-align: right;
    background-color: lightblue;
    // margin: 5px;
    padding: 5px;
}
.dz-opt-group .dz-opt-item .dz-opt-item-value {
    flex: 5;
    background-color: lightyellow;
    max-width: 280px;
}
fieldset {
    width: 600px;
    margin: auto;
    min-height: 50px;
}
a {
    color: #42b983;
    cursor: pointer;
}
a.button {
    cursor: pointer;
    padding: 0.4em 2em;
    margin: 0.25em 0.5em;
    border-radius: 0.5em;
    display: inline-block;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
}
.dz-btn-group {
    text-align: center;
    margin: 0;
}
.dz-btn-group a {
    display: inline-block;
    width: 250px;
    margin: 10px 5px 0 5px;
}
.dz-preview-group {
    background-color: lightgoldenrodyellow;
}
</style>
