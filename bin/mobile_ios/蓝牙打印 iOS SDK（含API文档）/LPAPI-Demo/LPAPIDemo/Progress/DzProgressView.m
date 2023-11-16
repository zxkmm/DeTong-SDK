//
//  DzProgressView.m
//  DzPrinterParser
//
//  Created by 蔡俊杰 on 15/5/14.
//  Copyright © 2019 Dothantech. All rights reserved.
//

#import "DzProgressView.h"

#define MESSAGE_FONT        [UIFont boldSystemFontOfSize:16]
#define MESSAGE_COLOR       [UIColor whiteColor]
#define SPINNER_COLOR       [UIColor whiteColor]
#define BACKGROUND_COLOR    [UIColor colorWithWhite:0 alpha:0.5]
#define IMAGE_SUCCESS       [UIImage imageNamed:@"STPrinter.bundle/success-white.png"]
#define IMAGE_ERROR         [UIImage imageNamed:@"STPrinter.bundle/error-white.png"]

@implementation DzProgressView

@synthesize window, view, hud, spinner, image, label;

NSTimeInterval intervalHide = 1.0f;

+ (instancetype)shared
{
    static id               shared  = nil;
    static dispatch_once_t  once    = 0;
    dispatch_once(&once, ^
                  {
                      shared = [[self alloc] init];
                  });
    
    return shared;
}

+ (void)dismiss
{
	[[self shared] hudHide];
}

+ (void)show:(NSString *)message
{
	[[self shared] hudMake:message
                     image:nil
                      spin:NO
                      hide:YES];
}

+ (void)showSuccess:(NSString *)message
{
	[[self shared] hudMake:message
                     image:IMAGE_SUCCESS
                      spin:NO
                      hide:YES];
}

+ (void)showError:(NSString *)message
{
	[[self shared] hudMake:message
                     image:IMAGE_ERROR
                      spin:NO
                      hide:YES];
}

+ (void)showState:(NSString *)message
{
    [[self shared] hudMake:message
                     image:nil
                      spin:YES
                      hide:NO];
}

+ (void)showLoad
{
    [self showLoad:0];
}

+ (void)showLoad:(NSTimeInterval)timeInterval
{
    intervalHide = timeInterval;
    [[self shared] hudMake:nil
                     image:nil
                      spin:YES
                      hide:YES];
}

- (id)init
{
	self = [super initWithFrame:[[UIScreen mainScreen] bounds]];
	id<UIApplicationDelegate> delegate = [[UIApplication sharedApplication] delegate];
	if ([delegate respondsToSelector:@selector(window)])
    {
		window = [delegate performSelector:@selector(window)];
    }
	else
    {
        window = [[UIApplication sharedApplication] keyWindow];
    }
    
    [self setAlpha:0];
    view    = nil;
	hud     = nil;
    spinner = nil;
    image   = nil;
    label   = nil;

	return self;
}

- (void)hudMake:(NSString *)status
          image:(UIImage *)img
           spin:(BOOL)spin
           hide:(BOOL)hide
{
    [self hudCreate];
	[label setText:status];
	[label setHidden:(status == nil) ? YES : NO];
	[image setImage:img];
	[image setHidden:(img == nil) ? YES : NO];
	if (spin)
    {
        [spinner startAnimating];
    }
    else
    {
        [spinner stopAnimating];
    }
    
	[self hudOrient];
	[self hudSize];
	[self hudShow];
    if (hide)
    {
        [self timedHide];
    }
}

- (void)hudCreate
{
	if (hud == nil)
	{
		hud = [[UIToolbar alloc] initWithFrame:CGRectZero];
		[hud            setBarTintColor:BACKGROUND_COLOR];
        [hud            setTranslucent:YES];
        [[hud layer]    setCornerRadius:10];
        [[hud layer]    setMasksToBounds:YES];
		[[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(rotate:)
                                                     name:UIDeviceOrientationDidChangeNotification
                                                   object:nil];
	}
    
	if ([hud superview] == nil)
    {
        view = [[UIView alloc] initWithFrame:CGRectMake(0.0,
                                                        0.0,
                                                        [window bounds].size.width,
                                                        [window bounds].size.height)];
        [view   setBackgroundColor:[UIColor colorWithWhite:0.0 alpha:0.2]];
        [view   addSubview:hud];
        [window addSubview:view];
        [window bringSubviewToFront:hud];
    }
    
	if (spinner == nil)
	{
		spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
		[spinner setColor:SPINNER_COLOR];
		[spinner setHidesWhenStopped:YES];
	}
    
	if ([spinner superview] == nil)
    {
        [hud addSubview:spinner];
    }
    
	if (image == nil)
	{
		image = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 28, 28)];
	}
    
	if ([image superview] == nil)
    {
        [hud addSubview:image];
    }

	if (label == nil)
	{
		label = [[UILabel alloc] initWithFrame:CGRectZero];
		[label setFont:MESSAGE_FONT];
		[label setTextColor:MESSAGE_COLOR];
		[label setBackgroundColor:[UIColor clearColor]];
        [label setTextAlignment:NSTextAlignmentCenter];
        [label setBaselineAdjustment:UIBaselineAdjustmentAlignCenters];
        [label setNumberOfLines:0];
	}
    
	if ([label superview] == nil)
    {
        [hud addSubview:label];
    }
}

- (void)hudDestroy
{
	[[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:UIDeviceOrientationDidChangeNotification
                                                  object:nil];
	[label      removeFromSuperview];
    [image      removeFromSuperview];
    [spinner    removeFromSuperview];
    [hud        removeFromSuperview];
    [view       removeFromSuperview];
    label       = nil;
    image       = nil;
    spinner     = nil;
    hud         = nil;
    view        = nil;
}

- (void)rotate:(NSNotification *)notification
{
	[self hudOrient];
}

- (void)hudOrient
{
	CGFloat rotate = 0.0f;
	UIInterfaceOrientation orient = [[UIApplication sharedApplication] statusBarOrientation];
	if (orient == UIInterfaceOrientationPortrait)
    {
        rotate = 0.0f;
    }
	if (orient == UIInterfaceOrientationPortraitUpsideDown)
    {
        rotate = M_PI;
    }
	if (orient == UIInterfaceOrientationLandscapeLeft)
    {
        rotate = 0.0f - M_PI_2;
    }
	if (orient == UIInterfaceOrientationLandscapeRight)
    {
        rotate = 0.0f + M_PI_2;
    }

    [hud setTransform:CGAffineTransformMakeRotation(rotate)];
}

- (void)hudSize
{
    CGRect labelRect  = CGRectZero;
    CGFloat hudWidth  = 100.0f;
    CGFloat hudHeight = 100.0f;

	if ([label text])
	{
		NSDictionary    *attributes = @{NSFontAttributeName:[label font]};
        NSInteger       options     = NSStringDrawingUsesFontLeading
        | NSStringDrawingTruncatesLastVisibleLine
        | NSStringDrawingUsesLineFragmentOrigin;
        labelRect           = [[label text] boundingRectWithSize:CGSizeMake(200, 300)
                                                         options:options
                                                      attributes:attributes
                                                         context:NULL];
		labelRect.origin.x  = 12;
		labelRect.origin.y  = 66;
		hudWidth            = labelRect.size.width + 24;
		hudHeight           = labelRect.size.height + 80;
		if (hudWidth < 100)
		{
			hudWidth                = 100;
			labelRect.origin.x      = 0;
			labelRect.size.width    = 100;
		}
	}

	CGSize  screen = [[UIScreen mainScreen] bounds].size;
	[hud        setCenter:CGPointMake(screen.width / 2, screen.height / 3)];
	[hud        setBounds:CGRectMake(0, 0, hudWidth, hudHeight)];
	CGFloat imagex = hudWidth / 2;
	CGFloat imagey = ([label text] == nil) ? hudHeight / 2 : 36;
	[image      setCenter:CGPointMake(imagex, imagey)];
    [spinner    setCenter:CGPointMake(imagex, imagey)];
	[label      setFrame:labelRect];
}

- (void)hudShow
{
	if ([self alpha] == 0)
	{
		[self setAlpha:1];
        [hud setAlpha:1];
//		[hud setTransform:CGAffineTransformScale([hud transform], 1.4, 1.4)];
//        NSUInteger options = UIViewAnimationOptionAllowUserInteraction | UIViewAnimationCurveEaseOut;
//        [UIView animateWithDuration:0.15
//                              delay:0
//                            options:options
//                         animations:^
//         {
//             [hud setTransform:CGAffineTransformScale([hud transform], 1 / 1.4, 1 / 1.4)];
//             [hud setAlpha:1];
//         }
//                         completion:nil];
	}
}

- (void)hudHide
{
    dispatch_async(dispatch_get_main_queue(), ^
    {
        [self->hud  setAlpha:0];
        [self setAlpha:0];
        [self hudDestroy];
    });
}

- (void)timedHide
{
	@autoreleasepool
    {
        NSTimeInterval inter = [[label text] length] > 0 ? [[label text] length] * 0.1 + 1.0 : intervalHide;
        if (inter > 0)
        {
            dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
            dispatch_async(queue, ^
                           {
                               [NSThread sleepForTimeInterval:inter];
                               dispatch_async(dispatch_get_main_queue(), ^
                                              {
                                                  [self hudHide];
                                              });
                           });
        }
	}
}

@end
