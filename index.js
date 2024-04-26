const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Input and output folder paths
const inputFolder = 'input'; // Replace 'input' with the name of your input folder
const outputFolder = 'output'; // Replace 'output' with the name of your output folder

// Compression options
const compressionOptions = {
    quality: 80 // Adjust the quality as needed (0 - 100, default: 80)
};

// Ensure the output folder exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Get a list of all files in the input folder
fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error('Error reading input folder:', err);
        return;
    }

    // Filter out non-image files
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Process each image file
    imageFiles.forEach(file => {
        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, file);

        // Compress the image
        sharp(inputPath)
            .jpeg(compressionOptions)
            .toFile(outputPath, (err, info) => {
                if (err) {
                    console.error('Error compressing image:', err);
                } else {
                    console.log('Image compressed successfully:', info);
                }
            });
    });
});
