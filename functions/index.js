const functions = require("firebase-functions");
const admin = require('firebase-admin');
const {Storage} = require("@google-cloud/storage");
const { object } = require("firebase-functions/v1/storage");
admin.initializeApp();


const storage = new Storage(); 





exports.moveFilesToLowCostStorage = functions.https.onRequest(async (request, response) => {
    try {
       
        const sourceBucketName = 'authdemo-b5947.appspot.com'; // Source bucket name
        const destinationBucketName = 'authdemo-b5947'; // Destination bucket name

        const sourceBucket = storage.bucket(sourceBucketName);
        const destinationBucket = storage.bucket(destinationBucketName);
        
        // List all files in the "files" folder of the source bucket
        const [files] = await sourceBucket.getFiles({ prefix: 'files/' });


        // Calculate file age
        const now = new Date();
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);


          // Iterate over each file
          for (const file of files) {
            // Get metadata to check creation time
            const [metadata] = await file.getMetadata();
            const creationTime = new Date(metadata.timeCreated);

       

            // Check if the file is older than 30 days
            if (creationTime < thirtyDaysAgo) {
                // Move the file to the destination bucket
                const destinationFile = destinationBucket.file(file.name);
                await file.move(destinationFile);

              
            }
        }

        response.status(200).send('Files moved successfully');
    } catch (error) {
        console.error('Error moving files:', error);
        response.status(500).send('Error moving files');
    }
       
});


/// now I need to loop over the 30 days and put in 60 days -- run it every 15 days 





/// now loop over the 60 days bucket and move to 120 day --- run every 30 days 