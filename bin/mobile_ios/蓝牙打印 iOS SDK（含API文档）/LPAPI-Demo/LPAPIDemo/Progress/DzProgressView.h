//
//  DzProgressView.h
//  DzPrinterParser
//
//  Created by 蔡俊杰 on 15/5/14.
//  Copyright © 2019 Dothantech. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DzProgressView : UIView

+ (void)show:(NSString *)message;
+ (void)showSuccess:(NSString *)message;
+ (void)showError:(NSString *)message;
+ (void)showState:(NSString *)message;
+ (void)showLoad;
+ (void)showLoad:(NSTimeInterval)timeInterval;
+ (void)dismiss;

@property (atomic, strong) UIWindow                 *window;
@property (atomic, strong) UIView                   *view;
@property (atomic, strong) UIToolbar                *hud;
@property (atomic, strong) UIActivityIndicatorView  *spinner;
@property (atomic, strong) UIImageView              *image;
@property (atomic, strong) UILabel                  *label;

@end
