//
//  ViewController.m
//  LPAPIDemo
//
//  Created by 蔡俊杰 on 2016/10/25.
//  Copyright © 2018年 DothanTech. All rights reserved.
//

#import "ViewController.h"

#import "DzProgress.h"
#import "LPAPI.h"

static int settingPrintCount = 1;

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self refreshCurrentPrinterName];
    [self refreshPrintCount];
        
    __weak typeof(self) weakSelf = self;
    
    // 监听打印机状态变化的回调
    [LPAPI didReadPrinterStateHandler:^(int code, NSString *message)
    {
        NSLog(@"提示编号：%d", code);
        NSLog(@"提示信息：%@", message);
        
        [weakSelf refreshCurrentPrinterName];
    }];
}

// 搜索打印机并连接
- (IBAction)scanPrinters:(id)sender
{
    __weak typeof(self) weakSelf = self;
    
    [LPAPI scanPrinters:YES  // 传 NO 可以不显示内置的列表组件
             completion:^(NSArray *scanedPrinterNames)
    {
        // 列表中的名称，可以传递给 openPrinter，去连接指定的打印机
        NSLog(@"搜索到的打印机列表：%@", scanedPrinterNames);
    }
didOpenedPrinterHandler:^(BOOL isSuccess)
    {
        if (isSuccess)
        {
            NSLog(@"连接成功");
        }
        else
        {
            NSLog(@"连接断开");
        }
        
        [weakSelf refreshCurrentPrinterName];
    }];
}

- (IBAction)connectPrinter:(id)sender
{
    __weak typeof(self) weakSelf = self;
    
    [LPAPI openPrinter:@""  // 可以填写打印机型号，或者打印机型号+全名
            completion:^(BOOL isSuccess)
    {
        if (isSuccess)
        {
            NSLog(@"连接成功");
        }
        else
        {
            NSLog(@"连接失败");
        }
        
        [weakSelf refreshCurrentPrinterName];
    }];
}

- (IBAction)disconnect:(id)sender
{
    [LPAPI closePrinter];
}

- (IBAction)printText:(id)sender
{
    double labelWidth  = 40.0;
    double labelHeight = 30.0;
    
    [LPAPI startDraw:labelWidth
              height:labelHeight
         orientation:0];
    
    double margin = 2.0;
    
    [LPAPI drawRectangleWithX:margin
                            y:margin
                        width:labelWidth - margin * 2
                       height:labelHeight - margin * 2
                    lineWidth:1
                     isFilled:NO];
    
    // 水平居左打印文本
    [LPAPI setItemHorizontalAlignment:0];
    
    [LPAPI drawText:@"123123123"
                  x:5.0
                  y:5.0
              width:labelWidth - 5.0 * 2
             height:5.0
         fontHeight:4.0];
    
    // 水平居中打印文本
    [LPAPI setItemHorizontalAlignment:1];
    
    [LPAPI drawText:@"123123123"
                  x:5.0
                  y:12.0
              width:labelWidth - 5.0 * 2
             height:5.0
         fontHeight:4.0];
    
    // 水平居右打印文本
    [LPAPI setItemHorizontalAlignment:2];
    
    [LPAPI drawText:@"123123123"
                  x:5.0
                  y:20.0
              width:labelWidth - 5.0 * 2
             height:5.0
         fontHeight:4.0];
    
    [LPAPI endDraw];
    
    [self printLabels];
    
    [self showPreviewImage];
}

- (IBAction)printQRCode:(id)sender
{
    double labelWidth  = 40.0;
    double labelHeight = 40.0;
    
    [LPAPI startDraw:labelWidth
              height:labelHeight
         orientation:0];
    
    double margin = 2.0;
    
    [LPAPI drawRectangleWithX:margin
                            y:margin
                        width:labelWidth - margin * 2
                       height:labelHeight - margin * 2
                    lineWidth:1
                     isFilled:NO];
    
    double codeWidth = 20.0;
    
    [LPAPI drawQRCode:@"0123456789_ABCDEFG"
                    x:(labelWidth - codeWidth) / 2
                    y:(labelHeight - codeWidth) / 2
                width:codeWidth];
    
    [LPAPI endDraw];
    
    [self printLabels];
    
    [self showPreviewImage];
}

- (IBAction)printBarcode:(id)sender
{
    double labelWidth  = 40.0;
    double labelHeight = 40.0;
    
    [LPAPI startDraw:labelWidth
              height:labelHeight
         orientation:0];
        
    double margin = 4.0;
    
    // 一维码底部文字居中
    [LPAPI setItemHorizontalAlignment:1];
    
    [LPAPI drawBarcode:@"1234567"
                     x:margin
                     y:(labelHeight - 15.0) / 2
                 width:labelWidth - margin * 2
                height:15.0
              fontName:nil
            fontHeight:3.0
             fontStyle:0
              textFlag:2
            encodeMode:DzBarcodeEncodeMode_Code128
        autoResetWidth:YES];
    
    [LPAPI endDraw];
    
    [self printLabels];
    
    [self showPreviewImage];
}

- (IBAction)printLocalImage:(id)sender
{
    double labelWidth  = 40.0;
    double labelHeight = 40.0;
    
    [LPAPI startDraw:labelWidth
              height:labelHeight
         orientation:0];
    
    double margin = 4.0;
    
    [LPAPI drawImage:[[NSBundle mainBundle] pathForResource:@"123" ofType:@"jpg"]
                   x:margin
                   y:margin
               width:labelWidth - margin * 2
              height:labelHeight - margin * 2
           threshold:0]; // 灰度阈值，根据不同的图片，可以选择不同的值，调整合适的效果
    
    [LPAPI endDraw];
    
    [self printLabels];
    
    [self showPreviewImage];
}

- (IBAction)printNetworkImage:(id)sender
{
    double labelWidth  = 40.0;
    double labelHeight = 40.0;
    
    [LPAPI startDraw:labelWidth
              height:labelHeight
         orientation:0];
    
    double margin = 4.0;
    
    [LPAPI drawImage:@"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
                   x:margin
                   y:margin
               width:labelWidth - margin * 2
              height:labelHeight - margin * 2
           threshold:128]; // 灰度阈值，根据不同的图片，可以选择不同的值，调整合适的效果
    
    [LPAPI endDraw];
    
    [self printLabels];
    
    [self showPreviewImage];
}

- (IBAction)addPrintCount:(id)sender
{
    settingPrintCount++;
    settingPrintCount = MIN(settingPrintCount, 999);
        
    [self refreshPrintCount];
}

- (IBAction)minusPrintCount:(id)sender
{
    settingPrintCount--;
    settingPrintCount = MAX(settingPrintCount, 1);
    
    [self refreshPrintCount];
}

// 展示预览图
- (void)showPreviewImage
{
    [_previewImageView setContentMode:UIViewContentModeScaleAspectFit];
    [_previewImageView setImage:[LPAPI previewImage]];
}

// 连续打印多张
static int printCount = 1;
- (void)printLabels
{
    ShowState(@"正在打印")
    
    printCount = settingPrintCount;
    
    [self printOneLabel];
}

- (void)printOneLabel
{
    if ([LPAPI connectingPrinterDetailInfos] == nil)
    {
        dispatch_async(dispatch_get_main_queue(), ^
        {
            ShowError(@"没有连接打印机")
        });
        
        return;
    }
    
    if (printCount <= 0)
    {
        dispatch_async(dispatch_get_main_queue(), ^
        {
            ShowSuccess(@"打印完成")
        });
        
        return;
    }
    
    [LPAPI print:^(BOOL isSuccess)
    {
        NSLog(@"打印成功");
        
        printCount--;
        
        [self printOneLabel];
    }];
}

- (void)refreshCurrentPrinterName
{
//    NSString *strName = [LPAPI connectingPrinterName];
    NSString *strName = [[LPAPI connectingPrinterDetailInfos] deviceName];
    
    if (strName && [strName length] > 0)
    {
        [_currentPrinterLabel setText:strName];
    }
    else
    {
        [_currentPrinterLabel setText:@"未连接打印机"];
    }
}

- (void)refreshPrintCount
{
    [_printCountLabel setText:[NSString stringWithFormat:@"%d", settingPrintCount]];
}

@end
