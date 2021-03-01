
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Mon, 01 Mar 2021 21:00:02 GMT
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorNeutral01,
ColorNeutral02,
ColorNeutral03,
ColorNeutral04,
ColorNeutral05,
ColorBrandPrimary01,
ColorBrandPrimary02,
ColorBrandPrimary03,
ColorBrandPrimary04,
ColorBrandPrimary05
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
