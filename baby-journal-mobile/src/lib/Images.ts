import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

const imageDir = FileSystem.cacheDirectory + 'images/';
const imageFileUri = async (imageUrl: string) => {
  const sha1 = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1, imageUrl);
  return imageDir + `image_${sha1}_200.image`;
};

// Checks if image directory exists. If not, creates it
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imageDir);
  if (!dirInfo.exists) {
    console.log("Image directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
  }
}

// Downloads all images specified as array of IDs
export async function addMultipleImages(imageUrls: string[]) {
  try {
    await ensureDirExists();

    console.log('Downloading', imageUrls.length, 'image files...');
    await Promise.all(
      imageUrls.map(async (url) => FileSystem.downloadAsync(url, await imageFileUri(url))),
    );
  } catch (e) {
    console.error("Couldn't download image files:", e);
  }
}

// Returns URI to our local image file
// If our image doesn't exist locally, it downloads it
export async function getSingleImage(imageUrl: string) {
  await ensureDirExists();

  const fileUri = await imageFileUri(imageUrl);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    console.log("Image isn't cached locally. Downloading...");
    await FileSystem.downloadAsync(imageUrl, fileUri);
  }

  return fileUri;
}

// Exports shareable URI - it can be shared outside your app
export async function getImageContentUri(imageUrl: string) {
  return FileSystem.getContentUriAsync(await getSingleImage(imageUrl));
}

// Deletes whole images directory with all its content
export async function deleteAllImages() {
  console.log('Deleting all Image files...');
  await FileSystem.deleteAsync(imageDir);
}
