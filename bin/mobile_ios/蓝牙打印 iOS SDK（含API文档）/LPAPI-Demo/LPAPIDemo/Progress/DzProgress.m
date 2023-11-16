//
//  DzProgress.m
//  DzPrinterParser
//
//  Created by 蔡俊杰 on 16/2/23.
//  Copyright © 2019 Dothantech. All rights reserved.
//

#import "DzProgress.h"

#import "DzProgressView.h"

@implementation DzProgress

+ (void)showState:(NSString *)message
{
    [DzProgressView showState:message];
}

+ (void)showSuccess:(NSString *)message
{
    [DzProgressView showSuccess:message];
}

+ (void)showError:(NSString *)message
{
    [DzProgressView showError:message];
}

+ (void)showLoad
{
    [DzProgressView showLoad];
}

+ (void)dismiss
{
    [DzProgressView dismiss];
}

@end
