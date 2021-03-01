
//
// StyleDictionaryColor.m
//
// Do not edit directly
// Generated on Mon, 01 Mar 2021 21:00:02 GMT
//

#import "StyleDictionaryColor.h"


@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.439f green:0.455f blue:0.482f alpha:1.000f],
[UIColor colorWithRed:0.651f green:0.667f blue:0.686f alpha:1.000f],
[UIColor colorWithRed:0.894f green:0.898f blue:0.906f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.412f green:0.110f blue:0.027f alpha:1.000f],
[UIColor colorWithRed:0.561f green:0.149f blue:0.039f alpha:1.000f],
[UIColor colorWithRed:0.941f green:0.306f blue:0.137f alpha:1.000f],
[UIColor colorWithRed:0.984f green:0.820f blue:0.776f alpha:1.000f],
[UIColor colorWithRed:0.996f green:0.941f blue:0.925f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
