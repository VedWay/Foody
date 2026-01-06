import ImageKit from "imagekit";

function getImageKitInstance() {
    return new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
}

export async function uploadFile(file, fileName) {
    const imagekit = getImageKitInstance();  // Initialize now
    const result = await imagekit.upload({
        file,
        fileName
    });
    return result;
}
