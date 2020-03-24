var mongoose=require("mongoose");
var express=require("express");
var app=express();
var mobile=require("./models/mobile");
var Comment=require("./models/comment");
var mobiles=[
    {name:"Redmi Note 4", image:"download.jpg",description:
        "Xiaomi Redmi Note 4 smartphone was launched in August 2016. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 401 pixels per inch. Xiaomi Redmi Note 4 price in India starts from Rs. 8,999. \n" +
        "\n" +
        "The Xiaomi Redmi Note 4 is powered by 2GHz octa-core Qualcomm Snapdragon 625 processor and it comes with 4GB of RAM. The phone packs 64GB of internal storage that can be expanded up to 128GB via a microSD card. As far as the cameras are concerned, the Xiaomi Redmi Note 4 packs a 13-megapixel primary camera on the rear and a 5-megapixel front shooter for selfies.\n" +
        "\n" +
        "The Xiaomi Redmi Note 4 runs Android 6.0 and is powered by a 4100mAh non removable battery. It measures 151.00 x 76.00 x 8.30 (height x width x thickness) and weigh 175.00 grams.\n",author:{username:"Yash Jaiswal"}},
    {name:"Realme 5 Pro",author:{username:"Yash Jaiswal"},image:"realme5pro.jpg",description: "Realme 5 Pro smartphone was launched on 20th August 2019. The phone comes with a 6.30-inch touchscreen display with a resolution of 1080x2340 pixels and an aspect ratio of 19.5:9. \n" +
        "\n" +
        " Realme 5 Pro is powered by a 2.3GHz octa-core Qualcomm Snapdragon 712 processor. It comes with 4GB of RAM"},
    {name:"Apple Iphone X",author:{username:"Yash Jaiswal"},image:"IphoneX.jpg",description:"iPhone X - the device that's so smart that it responds to a tap, your voice, and even a glance. Elegantly designed with a large 14.73 cm (5.8) Super Retina screen and a durable front-and-back glass, this smartphone is designed to impress.Apple iPhone X best price is Rs. 69999 as on 23rd March 2020"},
    {name:"One Plus 7T",author:{username:"Yash Jaiswal"},image:"Oneplus7T.jpg",description:"Rebuilt from the ground up using 7 nm technology, the new Qualcomm® Snapdragon 855™ mobile platform raises the bar for mobile power. Enjoy better gaming, sharper photos and amazing battery life. \n" +
        "\n" +
        "With the OnePlus 7T, everything is effortless."},

    {name:"Oppo S5",author:{username:"Yash Jaiswal"},image:"oppos5.jpg",description:"The new flagship smartphone from Oppo - Oppo F5 - features a bigger 6-inch touchscreen display having a resolution of 1080 X 2160 pixels. The device is powered by an octa-core MediaTek MT6763T processor and has 4GB of RAM. A 32GB internal storage is provided inside the phone which can be expanded up to 256GB via a microSD card"},
    
    {name:"Nokia 6",author:{username:"Yash Jaiswal"},image:"nokia6.jpg",description:"Nokia 6 smartphone was launched in January 2017. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 403 pixels per inch. Nokia 6 price in India starts from Rs. 13,249. \n" +
        "\n" +
        "The Nokia 6 is powered by 1.4GHz octa-core Qualcomm Snapdragon 430 processor processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card. As far as the cameras are concerned, the Nokia 6 packs a 16-megapixel primary camera on the rear and a 8-megapixel front shooter for selfies.\n"},
    
        {name:"Mi 8",author:{username:"Yash Jaiswal"},image:"Mi8.jpg",description:"The 2018 Xiaomi Flagship. Qualcomm® Snapdragon™ 845 | AI dual camera with optical zoom \n" +
        "\n" +
        "It sports a 20-megapixel camera on the front for selfies, with an f/2.0 aperture and a pixel size of 0.9-micron. The Mi 8 runs MIUI 10 based on Android Oreo and packs 64GB of inbuilt storage. "},
    
    
        {name:"Vivo S1",author:{username:"Yash Jaiswal"},image:"vivos1.jpg",description:"Xiaomi Mi A1 smartphone was launched in September 2017. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels. Xiaomi Mi A1 price in India starts from Rs. 13,999. \n" +
        "\n" +
        "The Vivo S1 features a huge 6.5-inch IPS LCD display panel which offers a full HD+ screen resolution of 1080 x 2340 pixels. \n" +
        "\n" +
        "The display does not have any notch or camera cutout at the top as the selfie camera is housed in a slider."}
];
function seedDB(){

    Comment.remove({},function(err){  
    mobile.remove({},function (err) {
        if(err)
            console.log(err);
        else
            console.log("mobiles removed");
        mobiles.forEach(function (seed) {
            mobile.create(seed,function(err,mobile){
                if(err)
                    console.log(err);
                else {
                    console.log("Mobile added");
                    Comment.create(
                        {
                            text:"Very good phone having lots of features.",
                            author: {
                                username:"Yash Jaiswal"

                            }

                        },function (err,comment) {
                            if(err)
                                console.log(err);
                            else
                            {
                                mobile.comments.push(comment);
                                mobile.save();

                                console.log(mobile.comments+"fuuuuuu");

                            }

                        }
                    )
                }


            });
        });
        
    });
});

}

module.exports=seedDB;