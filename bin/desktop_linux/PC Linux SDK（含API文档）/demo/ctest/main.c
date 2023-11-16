#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <lpapi/lpapi.h>
// #include "lpapi.h"

//
const char *pngData = "data:image/png;base64,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";
//
const char *jpegData = "data:image/jpeg;base64,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";
// 默认打印机
static char sPrinter[64] = "";

void getPrinterInfo()
{
	int selectedIndex = 0;
	// 获取打印机列表。
	dzptr_device *devices[10];
	int count = lpapi_get_printers(devices, 10, "");
	if (count <= 0)
	{
		printf("未检测到打印机。\n");
		return;
	}
	for (int i = 0; i < count; i++)
	{
		printf("--------------- device (%d): -------------------\n", i);
		printf("deviceName     : %s\n", devices[i]->deviceName);
		printf("deviceAddress  : %s\n", devices[i]->address);
		printf("addressType    : %d\n", devices[i]->addressType);
		printf("------------------------------------------\n");
	}
	printf("================================\n");
	printf("==== 请选择打印机[0 - %d]: \n", count);
	printf("====> :");
	scanf("%d", &selectedIndex);
	if (selectedIndex >= 0 && selectedIndex < count)
	{
		strcpy(sPrinter, devices[selectedIndex]->deviceName);
		printf("---- 已选择打印机：%s\n", sPrinter);
	}
	int result = lpapi_open_printer(sPrinter);
	if (result != 0)
	{
		printf("打印机打开失败!\n");
		printf("error code = %d\n", result);
		return;
	}
	// 获取打印机信息
	LPA_PRINTER_INFO info;
	if (lpapi_get_printer_info(&info) == 0)
	{
		printf("================== PrinterInfo ================\n");
		printf("deviceName      : %s\n", info.deviceName);
		printf("deviceAddress   : %s\n", info.deviceAddress);
		printf("deviceType      : %d\n", info.deviceType);
		printf("deviceDPI       : %d\n", info.deviceDPI);
		printf("deviceWidth     : %d\n", info.deviceWidth);
		printf("manufacturer    : %s\n", info.manufacturer);
		printf("seriesName      : %s\n", info.seriesName);
		printf("deviceVersion   : %s\n", info.deviceVersion);
		printf("softwareVersion : %s\n", info.softwareVersion);
		printf("================================================\n");
	}
	// 关闭打印机
	lpapi_close_printer();
}
/**
 * 字符串打印测试。
 */
void printText()
{
	char text1[] = "德佟电子科技（上海）有限公司！";
	char text2[] = "https://www.detonger.com";
	double labelWidth = 45;
	double labelHeight = 30;
	double fontSize = 4;
	double itemHeight = labelHeight * 0.5;
	// 打开打印机
	if (lpapi_open_printer(sPrinter) != 0)
	{
		printf("打印机打开失败!\n");
		return;
	}
	// 多份打印
	lpapi_set_print_param(dzptr_ppid_copies, 2);
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "textTest") == 0)
	{
		// 绘制字符串
		lpapi_draw_text(text1, 0, 0, labelWidth, itemHeight, fontSize, 0);
		// 设置字体
		lpapi_set_fontname("Arial");
		lpapi_draw_text(text2, 0, itemHeight, labelWidth, itemHeight, fontSize, 0);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 字符串打印测试。
 */
void printTextWithAlign()
{
	char text[] = "德佟电子科技（上海）有限公司！";
	double labelWidth = 45;
	double labelHeight = 60;
	double fontSize = 4;
	double lineWidth = 0.4;
	// 从上到下，分成四行，每一行显示不同的对齐方式
	double lineHeight = labelHeight / 4.0;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "alignTest") == 0)
	{
		// 第一页，设置水平对齐方式
		// 绘制辅助边框
		lpapi_draw_rect(0, 0, labelWidth, labelHeight, lineWidth);
		lpapi_draw_line(0, lineHeight, labelWidth, lineHeight, lineWidth);
		lpapi_draw_line(0, lineHeight * 2, labelWidth, lineHeight * 2, lineWidth);
		lpapi_draw_line(0, lineHeight * 3, labelWidth, lineHeight * 3, lineWidth);
		// 默认水平靠左对齐
		lpapi_set_item_horizontal_alignment(0);
		lpapi_set_item_vertical_alignment(0);
		lpapi_draw_text(text, 0, 0, labelWidth, lineHeight, fontSize, 0);
		// 第二行，水平居中对齐
		lpapi_set_item_horizontal_alignment(1);
		lpapi_set_item_vertical_alignment(1);
		lpapi_draw_text(text, 0, lineHeight, labelWidth, lineHeight, fontSize, 1);
		// 第3行，水平靠右对齐
		lpapi_set_item_horizontal_alignment(2);
		lpapi_set_item_vertical_alignment(2);
		lpapi_draw_text(text, 0, lineHeight * 2, labelWidth, lineHeight, fontSize, 2);
		// 第4行，水平拉伸
		lpapi_set_item_horizontal_alignment(3);
		lpapi_set_item_vertical_alignment(3);
		lpapi_draw_text(text, 0, lineHeight * 3, labelWidth, lineHeight, fontSize, 3);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 字符串打印测试。
 */
void printTextWithRotate()
{
	char text[] = "德佟电子科技（上海）有限公司！";
	double labelWidth = 60;
	double labelHeight = 45;
	double halfWidth = labelWidth * 0.5;
	double halfHeight = labelHeight * 0.5;
	double lineWidth = 0.4;
	double fontSize = 4;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 90, "rotateTest") == LPA_OK)
	{
		// 绘制辅助线
		lpapi_draw_rect(0, 0, labelWidth, labelHeight, lineWidth);
		lpapi_draw_line(0, halfHeight, labelWidth, halfHeight, lineWidth);
		lpapi_draw_line(halfWidth, 0, halfWidth, labelHeight, lineWidth);
		// 绘制字符串
		// 默认不旋转
		lpapi_set_item_orientation(0);
		lpapi_draw_text(text, 0, 0, halfWidth, halfHeight, fontSize, 0);
		// 右转90度
		lpapi_set_item_orientation(90);
		lpapi_draw_text(text, halfWidth, 0, halfWidth, halfHeight, fontSize, 0);
		// 180度旋转
		lpapi_set_item_orientation(180);
		lpapi_draw_text(text, 0, halfHeight, halfWidth, halfHeight, fontSize, 0);
		// 左传90度
		lpapi_set_item_orientation(270);
		lpapi_draw_text(text, halfWidth, halfHeight, halfWidth, halfHeight, fontSize, 0);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 一维码打印测试。
 */
void printBarcode()
{
	char text[] = "detonger";
	double labelWidth = 40;
	double labelHeight = 15;
	double textHeight = 5;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "barcodeTest") == LPA_OK)
	{
		// 绘制一维码，一维码下面的字符串拉伸显示
		lpapi_set_item_horizontal_alignment(3);
		lpapi_draw_barcode(text, 0, 0, labelWidth, labelHeight, textHeight, 0);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 二维码打印测试。
 */
void printQrcode()
{
	char text[] = "德佟电子科技（上海）有限公司！";
	double labelWidth = 30;
	double labelHeight = 30;
	double fontSize = 5;
	double qrcodeWidth = 20;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "qrcodeTest") == 0)
	{
		// 绘制字符串
		lpapi_draw_qrcode(text, 5, 5, qrcodeWidth, qrcodeWidth, 1);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
void printPdf417()
{
	char text[] = "www.detonger.com";
	double labelWidth = 40;
	double labelHeight = 20;
	double fontSize = 5;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "pdf417Test") == 0)
	{
		// 绘制字符串
		lpapi_draw_pdf417(text, 0, 0, labelWidth, labelHeight, 0);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 矩形打印测试。
 */
void printRect()
{
	double labelWidth = 30;
	double labelHeight = 20;
	double fontSize = 5;
	double margin = 5;
	double lineWidth = 0.4;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "rectTest") == 0)
	{
		// 绘制矩形框
		lpapi_draw_rect(0, 0, labelWidth, labelHeight, lineWidth);
		// 绘制填充矩形
		lpapi_fill_rect(margin, margin, labelWidth - margin * 2, labelHeight - margin * 2);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 圆角矩形打印测试。
 */
void printRoundRect()
{
	double labelWidth = 30;
	double labelHeight = 20;
	double fontSize = 5;
	double margin = 5;
	double cornerRadius = 2;
	double lineWidth = 0.4;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "roundRectTest") == 0)
	{
		// 绘制矩形框
		lpapi_draw_round_rect(0, 0, labelWidth, labelHeight, cornerRadius, lineWidth);
		// 绘制填充矩形
		lpapi_fill_round_rect(margin, margin, labelWidth - margin * 2, labelHeight - margin * 2, cornerRadius);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 椭圆打印测试。
 */
void printEllipse()
{
	double labelWidth = 30;
	double labelHeight = 20;
	double fontSize = 5;
	double margin = 5;
	double lineWidth = 0.4;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "ellipseTest") == 0)
	{
		// 绘制矩形框
		lpapi_draw_ellipse(0, 0, labelWidth, labelHeight, lineWidth);
		// 绘制填充矩形
		lpapi_fill_ellipse(margin, margin, labelWidth - margin * 2, labelHeight - margin * 2);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 圆形打印测试。
 */
void printCircle()
{
	double labelWidth = 30;
	double labelHeight = 20;
	double margin = 5;
	double lineWidth = 0.4;
	double centerX = labelWidth * 0.5;
	double centerY = labelHeight * 0.5;
	double radius = labelWidth < labelHeight ? labelWidth * 0.5 : labelHeight * 0.5;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "circleTest") == 0)
	{
		// 绘制矩形框
		lpapi_draw_circle(centerX, centerY, radius, lineWidth);
		// 绘制填充矩形
		lpapi_fill_circle(centerX, centerY, radius - margin);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 直线/虚线打印测试。
 */
void printLines()
{
	double labelWidth = 45;
	double labelHeight = 30;
	double lineSpace = 5;
	double lineWidth = 0.4;
	//
	double dashLen1[] = {1};
	double dashLen2[] = {1, 2};
	double dashLen3[] = {1, 2, 1};
	double dashLen4[] = {1, 2, 1, 3};
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, 0, "pathTest") == 0)
	{
		// 绘制矩形框
		lpapi_draw_line(0, lineSpace, labelWidth, lineSpace, lineWidth);
		lpapi_draw_dash_line(0, lineSpace * 2, labelWidth, lineSpace * 2, lineWidth, dashLen1, 1);
		lpapi_draw_dash_line(0, lineSpace * 3, labelWidth, lineSpace * 3, lineWidth, dashLen2, 2);
		lpapi_draw_dash_line(0, lineSpace * 4, labelWidth, lineSpace * 4, lineWidth, dashLen3, 3);
		lpapi_draw_dash_line(0, lineSpace * 5, labelWidth, lineSpace * 5, lineWidth, dashLen4, 4);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 绘制png/jpeg图片。
 */
void drawImage()
{
	const char *url = "http://detonger.com/img/QRCode_OfficialAccounts.png";
	int labelWidth = 30;
	int labelHeight = 30;
	int orientation = 90;
	int imageWidth = 25;
	int imageHeight = 25;

	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, orientation, "drawImageTest") == LPA_OK)
	{
		lpapi_draw_rect(0, 0, labelWidth, labelHeight, 0.5);
		// 绘制矩形框
		lpapi_draw_image(url, (labelWidth - imageWidth) * 0.5, (labelHeight - imageHeight) * 0.5, imageWidth, imageHeight, 0);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
/**
 * 绘制png/jpeg图片。
 */
void drawImageD()
{
	int labelWidth = 30;
	int labelHeight = 30;
	int orientation = 90;
	int imageWidth = 25;
	int imageHeight = 25;

	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	// 1. 创建打印任务，指定标签纸大小。
	if (lpapi_start_job(labelWidth, labelHeight, orientation, "drawImageTest") == 0)
	{
		lpapi_draw_rect(0, 0, labelWidth, labelHeight, 0.5);
		// 绘制矩形框
		lpapi_draw_image(pngData, (labelWidth - imageWidth) * 0.5, (labelHeight - imageHeight) * 0.5, imageWidth, imageHeight, 0);
		// 提交打印任务，开始打印
		lpapi_commit_job();
	}
	//
	lpapi_close_printer();
}
void printImage()
{
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	lpapi_print_image("https://detonger.com/img/QRCode_OfficialAccounts.png", NULL, 0, 0, 0);
	//
	lpapi_close_printer();
}
/**
 * 直接打印图片。
 */
void printImageD()
{
	const char *imageFile = jpegData;
	// 打开打印机
	int ret = lpapi_open_printer(sPrinter);
	if (ret != 0)
	{
		printf("打印机链接失败：code=%d\n", ret);
		return;
	}
	lpapi_print_image(imageFile, NULL, 0, 0, 0);
	//
	lpapi_close_printer();
}

int main(int argc, char const *argv[])
{
	lpapi_init(NULL);
	//
	sleep(3);
	//
	getPrinterInfo();
	//
	printText();
	//
	printTextWithAlign();
	//
	printTextWithRotate();
	//
	printBarcode();
	//
	printQrcode();
	//
	printPdf417();
	//
	printRect();
	//
	printRoundRect();
	//
	printEllipse();
	//
	printCircle();
	//
	printLines();
	//
	drawImage();
	//
	drawImageD();
	//
	printImage();
	//
	printImageD();

	// 退出
	return 0;
}
