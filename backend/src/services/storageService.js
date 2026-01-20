import ImageKit from "imagekit";

function getImageKitInstance() {
    return new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
}

export async function uploadFile(fileBuffer, fileName) {
    const imagekit = getImageKitInstance();

    const base64File = fileBuffer.toString("base64");

    const result = await imagekit.upload({
        file: base64File,
        fileName,
    });

    return result;
}
