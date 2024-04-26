import fs from 'fs'
import path from 'path'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'

// Input and output folder paths
const inputFolder = 'input'; // Replace 'input' with the name of your input folder
const outputFolder = 'output'; // Replace 'output' with the name of your output folder

// Ensure the output folder exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Get a list of all files in the input folder
fs.readdir(inputFolder, async (err, files) => {
    if (err) {
        console.error('Error reading input folder:', err);
        return;
    }

    // Filter out non-image files
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    // Process each image file
    for (const file of imageFiles) {
        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, file);

        try {
            // Optimize the image
            await imagemin([inputPath], {
                destination: outputFolder,
                plugins: [
                    imageminJpegtran(),
                    imageminPngquant({
                        quality: [0.6, 0.8] // Adjust quality as needed (0.0 - 1.0, default: 0.6)
                    })
                ]
            });

            console.log('Image optimized successfully:', outputPath);
        } catch (error) {
            console.error('Error optimizing image:', error);
        }
    }
});
