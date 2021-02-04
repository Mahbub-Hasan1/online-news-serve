var express = require('express')
var cors = require('cors')
var app = express()
const db = require('db')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.nsfyh.mongodb.net:27017,cluster0-shard-00-01.nsfyh.mongodb.net:27017,cluster0-shard-00-02.nsfyh.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-o69sfx-shard-0&authSource=admin&retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

    if (err) {
        console.log(err)
    }
    
    else {
        const registrationCollection = client.db(`${process.env.DB_NAME}`).collection("UserRegistrationData")
        const sliderImagesCollection = client.db(`${process.env.DB_NAME}`).collection("sliderImages")
        const adminDataCollection = client.db(`${process.env.DB_NAME}`).collection("adminData")
        const updateMarqueeCollection = client.db(`${process.env.DB_NAME}`).collection("updateMarquee")
        const aboutUsCollection = client.db(`${process.env.DB_NAME}`).collection("aboutUs")
        const ourEventCollection = client.db(`${process.env.DB_NAME}`).collection("ourEvent")
        const latestUpdateCollection = client.db(`${process.env.DB_NAME}`).collection("latestUpdate")
        const photoGalleryCollection = client.db(`${process.env.DB_NAME}`).collection("photoGallery")
        const WatchFeaturedVideoCollection = client.db(`${process.env.DB_NAME}`).collection("FeaturedVideo")
        console.log("connected successfully")


        // registration form ara start 

        // post Registration form Data
        app.post('/AddRegistrationData', (req, res) => {
            const registrationData = req.body;
            registrationCollection.insertOne(registrationData)
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
        })


        // get Registration form Data
        app.get('/allRegistrationData', (req, res) => {
            registrationCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents);
                })
        });

        // registration form area end

        // ------------

        // slider img area start 

        //post slider images
        app.post('/AddSliderImages', (req, res) => {
            const registrationData = req.body;
            sliderImagesCollection.insertOne(registrationData)
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
        })


        // get slider img Data
        app.get('/allSliderImages', (req, res) => {
            sliderImagesCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents);
                })
        });


        //delete image Data
        app.delete('/ImageDelete/:_id', (req, res) => {
            sliderImagesCollection.deleteOne({ _id: ObjectId(req.params._id) })
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
        })

        // slider img area end 


        // ------------

        // admin data area start 

        //post new admin data
        app.post('/addNewAdmin', (req, res) => {
            const adminData = req.body;
            adminDataCollection.insertOne(adminData)
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
        })


        //delete admin Data
        app.delete('/deleteAdmin/:_id', (req, res) => {
            adminDataCollection.deleteOne({ _id: ObjectId(req.params._id) })
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
        })


        // get all admin data
        app.get('/allAdmin', (req, res) => {
            adminDataCollection.find({ newAdmin: req.query.newAdmin })
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })

        // admin data area end

        // ------------

        // event Marquee home page start 

        //post event Marquee home page

        // app.post('/addEventMarquee', (req, res) => {
        //     const eventMarqueeData = req.body;
        //     updateMarqueeCollection.insertOne(eventMarqueeData)
        //         .then(result => {
        //             res.send(result.insertedCount > 0)
        //         })
        // })

        // get event Marquee home page
        app.get('/eventMarqueHomePage', (req, res) => {
            updateMarqueeCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })

        // Update event Marquee home page
        app.patch('/updateEventMarqueeHomPage/:_id', (req, res) => {
            // console.log(req.body)
            updateMarqueeCollection.updateOne({ _id: ObjectId(req.params._id) },
                {
                    $set: { eventMarquee: req.body.eventMarquee }
                })
                .then(result => {
                    res.send(result.modifiedCount > 0);
                })
        })


        // event Marquee home page end

        // ------------

        // about Us area start 

        // get about us home page
        app.get('/aboutUsHomePage', (req, res) => {
            aboutUsCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })

        // Update about us home page
        app.patch('/updateAboutUsHomPage/:_id', (req, res) => {
            aboutUsCollection.updateOne({ _id: ObjectId(req.params._id) },
                {
                    $set: { aboutText: req.body.aboutText }
                })
                .then(result => {
                    res.send(result.modifiedCount > 0);
                })
        })


        // about Us area end 

        // ------------

        // our event area start 

        // get our events home page
        app.get('/AllOurEventHomePage', (req, res) => {
            ourEventCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })


        // Update our events home page
        app.patch('/updateOurEventHomPage/:_id', (req, res) => {
            ourEventCollection.updateOne({ _id: ObjectId(req.params._id) },
                {
                    $set: { title: req.body.title, eventDetails: req.body.eventDetails, img: req.body.img, }
                })
                .then(result => {
                    res.send(result.modifiedCount > 0);
                })
        })


        // end

        // --------


        //our events area start

        app.get('/AllLatestUpdateData', (req, res) => {
            latestUpdateCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })


        // Update our events home page
        app.patch('/updateLatestUpdateData/:_id', (req, res) => {
            latestUpdateCollection.updateOne({ _id: ObjectId(req.params._id) },
                {
                    $set: { title: req.body.title, latestDetails: req.body.latestDetails, img: req.body.img, }
                })
                .then(result => {
                    res.send(result.modifiedCount > 0);
                })
        })



        // --------


        // start photo gallery area

        //our Photo Gallery start

        app.get('/AllPhotoGalleryData', (req, res) => {
            photoGalleryCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })


        // Update Photo Gallery home page
        app.patch('/updatePhotoGalleryData/:_id', (req, res) => {
            photoGalleryCollection.updateOne({ _id: ObjectId(req.params._id) },
                {
                    $set: { src: req.body.src, thumbnail: req.body.thumbnail, }
                })
                .then(result => {
                    res.send(result.modifiedCount > 0);
                })
        })


        // -------------------


        // video area start 
        app.post('/addVideoData', (req, res) => {
            const VideoData = req.body;
            WatchFeaturedVideoCollection.insertMany(VideoData)
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
        })

        app.get('/AllVideoData', (req, res) => {
            WatchFeaturedVideoCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })

        // Update Photo Gallery home page
        app.patch('/updateVideoData/:_id', (req, res) => {
            WatchFeaturedVideoCollection.updateOne({ _id: ObjectId(req.params._id) },
                {
                    $set: { videoA: req.body.videoA, videoB: req.body.videoB, videoC: req.body.videoC }
                })
                .then(result => {
                    res.send(result.modifiedCount > 0);
                })
        })





    }

});




app.listen(process.env.PORT || 5050)