//
//  DzProgress.h
//  DzPrinterParser
//
//  Created by 蔡俊杰 on 16/2/23.
//  Copyright © 2019 Dothantech. All rights reserved.
//

#import <Foundation/Foundation.h>

#define ShowState(string)       [DzProgress showState:string];
#define ShowSuccess(string)     [DzProgress showSuccess:string];
#define ShowError(string)       [DzProgress showError:string];
#define ShowLoad                [DzProgress showLoad];
#define DismissLoad             [DzProgress dismiss];

/**
 * @brief   定义了进度条操作的接口
 */
@interface DzProgress : NSObject

+ (void)showState:(NSString *)message;
+ (void)showSuccess:(NSString *)message;
+ (void)showError:(NSString *)message;
+ (void)showLoad;
+ (void)dismiss;

@end
