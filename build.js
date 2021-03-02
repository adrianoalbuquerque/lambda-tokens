const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, platform) {
    let source = "tokens/properties/globals/**/*.json";
    let buildPath = {
        web: 'dist/web/',
        ios: 'dist/ios/',
        android: 'dist/android/'

    }
    if(brand !== 'globals'){
        source = `tokens/properties/brands/${brand}/**/*.json`;
        buildPath ={
            web: `dist/web/${brand}/`,
            ios: `dist/ios/${brand}/`,
            android: `dist/android/${brand}/`
        }
    }

    return {
        "source": [source],
        "platforms": {
            "web/scss": {
                "transformGroup": "tokens-scss",
                "buildPath": buildPath.web,
                "files": [
                    {
                        "destination": `_${brand}-tokens.scss`,
                        "format": "scss/variables",
                        "filter": {
                          "type": brand
                        }
                      }
                ]
            },
            // there are different possible formats for iOS (JSON, PLIST, etc.) so you will have to agree with the iOS devs which format they prefer
            "ios": {
                // I have used custom formats for iOS but keep in mind that Style Dictionary offers some default formats/templates for iOS,
                // so have a look at the documentation before creating custom templates/formats, maybe they already work for you :)
                "transformGroup": "tokens-ios",
                "buildPath": buildPath.ios,
                "files": [
                    {
                        "destination": "tokens-all.plist",
                        "template": "ios/plist",
                        "filter": {
                            "type": brand
                          }
                    },
                    {
                        "destination": "tokens-colors.plist",
                        "template": "ios/plist",
                        "filter":{
                            "type": "color",
                            "atributes": {
                                "brand": brand
                            }
                        }
                    }
                ]
            },
            "android": {
                // I have used custom formats for Android but keep in mind that Style Dictionary offers some default formats/templates for Android,
                // so have a look at the documentation before creating custom templates/formats, maybe they already work for you :)
                "transformGroup": "tokens-android",
                "buildPath": buildPath.android,
                "files": [
                    {
                        "destination": "tokens-all.xml",
                        "template": "android/xml",
                        "filter": {
                            "type": brand
                          }
                    },
                    {
                        "destination": "tokens-colors.xml",
                        "template": "android/xml",
                        "filter":{
                            "type": "color",
                            "atributes": {
                                "brand": brand
                            }
                        }
                    }
                ]
            }
        }
    };
}

// REGISTER CUSTOM FORMATS + TEMPLATES + TRANSFORMS + TRANSFORM GROUPS

// if you want to see the available pre-defined formats, transforms and transform groups uncomment this
// console.log(StyleDictionaryPackage);

StyleDictionaryPackage.registerFormat({
    name: 'json/flat',
    formatter: function(dictionary) {
        return JSON.stringify(dictionary.allProperties, null, 2);
    }
});

StyleDictionaryPackage.registerTemplate({
    name: 'ios/plist',
    template: __dirname + '/templates/ios-plist.template'
});

StyleDictionaryPackage.registerTemplate({
    name: 'android/xml',
    template: __dirname + '/templates/android-xml.template'
});

StyleDictionaryPackage.registerTemplate({
    name: 'android/colors',
    template: __dirname + '/templates/android-xml.template'
});

StyleDictionaryPackage.registerTransform({
    name: 'size/pxToPt',
    type: 'value',
    matcher: function(prop) {
        return prop.value.toString().match(/^[\d.]+px$/);
    },
    transformer: function(prop) {
        return prop.value.toString().replace(/px$/, 'pt');
    }
});

StyleDictionaryPackage.registerTransform({
    name: 'size/pxToDp',
    type: 'value',
    matcher: function(prop) {
        return prop.value.toString().match(/^[\d.]+px$/);
    },
    transformer: function(prop) {
        return prop.value.toString().replace(/px$/, 'dp');
    }
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-scss',
    // to see the pre-defined "scss" transformation use: console.log(StyleDictionaryPackage.transformGroup['scss']);
    transforms: [ "name/cti/kebab", "time/seconds", "size/px", "color/css" ]
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-ios',
    // to see the pre-defined "ios" transformation use: console.log(StyleDictionaryPackage.transformGroup['ios']);
    transforms: [ "attribute/cti", "name/cti/camel", "size/pxToPt"]
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-android',
    // to see the pre-defined "android" transformation use: console.log(StyleDictionaryPackage.transformGroup['android']);
    transforms: [ "attribute/cti", "name/cti/camel", "size/pxToDp"]
});

StyleDictionaryPackage.transformGroup['android'];

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['web', 'ios', 'android'].map(function(platform) {

    //OS VALORES DOS INDICES DO ARRAY SÃO REFERENTES AS PASTAS DE CADA MARCA
    ['globals', 'brand-01', 'brand-02'].map(function(brand) {

        console.log('\n==============================================');
        console.log(`\nProcessing: [${platform}] [${brand}]`);

        const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));

        if (platform === 'web') {
            StyleDictionary.buildPlatform('web/scss');
        } else if (platform === 'ios') {
            StyleDictionary.buildPlatform('ios');
        } else if (platform === 'android') {
            StyleDictionary.buildPlatform('android');
        }

        console.log('\nEnd processing');

    })
})

console.log('\n==============================================');
console.log('\nBuild completed!');