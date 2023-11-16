//
//  ViewController.h
//  LPAPIDemo
//
//  Created by 蔡俊杰 on 2016/10/25.
//  Copyright © 2018年 DothanTech. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController

@property (weak, nonatomic) IBOutlet UIImageView *previewImageView;
@property (weak, nonatomic) IBOutlet UILabel     *currentPrinterLabel;
@property (weak, nonatomic) IBOutlet UILabel     *printCountLabel;

- (IBAction)scanPrinters:(id)sender;
- (IBAction)connectPrinter:(id)sender;
- (IBAction)disconnect:(id)sender;
- (IBAction)printText:(id)sender;
- (IBAction)printQRCode:(id)sender;
- (IBAction)printBarcode:(id)sender;
- (IBAction)printLocalImage:(id)sender;
- (IBAction)printNetworkImage:(id)sender;
- (IBAction)minusPrintCount:(id)sender;
- (IBAction)addPrintCount:(id)sender;

@end
