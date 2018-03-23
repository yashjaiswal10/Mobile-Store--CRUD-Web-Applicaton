var mongoose=require("mongoose");
var express=require("express");
var app=express();
var mobile=require("./models/mobile");
var Comment=require("./models/comment");
var mobiles=[
    {name:"Redmi Note 4", image:"http://xiaomi-mi.co.uk/uploads/ck/xiaomi-redmi-note-4-high-edition-3gb64gb-dual-sim-gold-017.jpg",description:
        "Xiaomi Redmi Note 4 smartphone was launched in August 2016. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 401 pixels per inch. Xiaomi Redmi Note 4 price in India starts from Rs. 8,999. \n" +
        "\n" +
        "The Xiaomi Redmi Note 4 is powered by 2GHz octa-core Qualcomm Snapdragon 625 processor and it comes with 4GB of RAM. The phone packs 64GB of internal storage that can be expanded up to 128GB via a microSD card. As far as the cameras are concerned, the Xiaomi Redmi Note 4 packs a 13-megapixel primary camera on the rear and a 5-megapixel front shooter for selfies.\n" +
        "\n" +
        "The Xiaomi Redmi Note 4 runs Android 6.0 and is powered by a 4100mAh non removable battery. It measures 151.00 x 76.00 x 8.30 (height x width x thickness) and weigh 175.00 grams.\n",author:{username:"Yash Jaiswal"}},
    {name:"Lenovo k4 note",author:{username:"Yash Jaiswal"},image:"https://i.ytimg.com/vi/RkPm5AcSRdA/maxresdefault.jpg",description: "Lenovo Vibe K4 Note smartphone was launched in January 2016. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 401 pixels per inch. Lenovo Vibe K4 Note price in India starts from Rs. 10,115. \n" +
        "\n" +
        "The Lenovo Vibe K4 Note is powered by 1.3GHz octa-core MediaTek MT6753 processor and it comes with 3GB of RAM. The phone packs 16GB of internal storage that can be expanded up to 128GB via a microSD card. As far as the cameras are concerned, the Lenovo Vibe K4 Note packs a 13-megapixel primary camera on the rear and a 5-megapixel front shooter for selfies."},
    {name:"Iphone 6",author:{username:"Yash Jaiswal"},image:"https://www.pixelstalk.net/wp-content/uploads/2016/05/iPhone-5-black-and-white-1080p-hd-wallpaper.jpg",description:"Apple iPhone 6 smartphone was launched in September 2014. The phone comes with a 4.70-inch touchscreen display with a resolution of 750 pixels by 1334 pixels at a PPI of 326 pixels per inch. Apple iPhone 6 price in India starts from Rs. 23,999.Apple A8It comes with 1GB of RAM. The phone packs 16GB of internal storage that cannot be expanded. As far as the cameras are concerned, the Apple iPhone 6 packs a 8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies."},
    {name:"Asus Zenfone 2",author:{username:"Yash Jaiswal"},image:"http://ksassets.timeincuk.net/wp/uploads/sites/54/2015/06/P1110262.jpg",description:"Asus ZenFone 2 ZE600KL smartphone was launched in June 2015. The phone comes with a 6.00-inch touchscreen display with a resolution of 720 pixels by 1280 pixels.\n" +
        "\n" +
        "The Asus ZenFone 2 ZE600KL is powered by octa-core Qualcomm Snapdragon 615 processor and it comes with 2GB of RAM. The phone packs 16GB of internal storage that can be expanded. As far as the cameras are concerned, the Asus ZenFone 2 ZE600KL packs a 13-megapixel primary camera on the rear and a 5-megapixel front shooter for selfies."},
    {name:"Oppo S5",author:{username:"Yash Jaiswal"},image:"https://i.ytimg.com/vi/FCSWo2bSeF0/maxresdefault.jpg",description:"The new flagship smartphone from Oppo - Oppo F5 - features a bigger 6-inch touchscreen display having a resolution of 1080 X 2160 pixels. The device is powered by an octa-core MediaTek MT6763T processor and has 4GB of RAM. A 32GB internal storage is provided inside the phone which can be expanded up to 256GB via a microSD card"},
    {name:"Nokia 6",author:{username:"Yash Jaiswal"},image:"https://technonow.in/wp-content/uploads/2017/01/nokia-6-21.jpg",description:"Nokia 6 smartphone was launched in January 2017. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 403 pixels per inch. Nokia 6 price in India starts from Rs. 13,249. \n" +
        "\n" +
        "The Nokia 6 is powered by 1.4GHz octa-core Qualcomm Snapdragon 430 processor processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card. As far as the cameras are concerned, the Nokia 6 packs a 16-megapixel primary camera on the rear and a 8-megapixel front shooter for selfies.\n"},
    {name:"Sony Xperia Z",author:{username:"Yash Jaiswal"},image:"https://www.japanbullet.com/images/2013/05/sonyxperiaxrgal1.jpg",description:"Sony Xperia Z5 Dual smartphone was launched in September 2015. The phone comes with a 5.20-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 424 pixels per inch. Sony Xperia Z5 Dual price in India starts from Rs. 31,890. \n" +
        "\n" +
        "The Sony Xperia Z5 Dual is powered by octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 200GB via a microSD card. As far as the cameras are concerned, the Sony Xperia Z5 Dual packs a 23-megapixel primary camera on the rear and a 5-megapixel front shooter for selfies."},
    {name:"Xiaomi A1",author:{username:"Yash Jaiswal"},image:"https://www.xiaomitoday.it/wp-content/uploads/2018/01/xiaomi-mi-a1-21.jpeg",description:"Xiaomi Mi A1 smartphone was launched in September 2017. The phone comes with a 5.50-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels. Xiaomi Mi A1 price in India starts from Rs. 13,999. \n" +
        "\n" +
        "The Xiaomi Mi A1 is powered by 2GHz octa-core Qualcomm Snapdragon 625 processor and it comes with 4GB of RAM. The phone packs 64GB of internal storage that can be expanded up to 128GB via a microSD card. As far as the cameras are concerned, the Xiaomi Mi A1 packs a 12-megapixel primary camera on the rear and a 5-megapixel front shooter for selfies.\n" +
        "\n" +
        "The Xiaomi Mi A1 runs Android 7.1.2 and is powered by a 3080mAh non removable battery. It measures 155.40 x 75.80 x 7.30 (height x width x thickness) and weigh 168.00 grams."}
];
function seedDB(){

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
                            text:"Very Good Phone",
                            author: {
                                username:"yash"

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

}

module.exports=seedDB;