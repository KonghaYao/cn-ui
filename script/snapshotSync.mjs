import "dotenv/config";
import fs from "fs-extra";
import * as tar from "tar";

const compressedFile = "./temp/snapshots.tar.gz";
const compress = async () => {
    await fs.ensureDir("./temp");
    const writeStream = fs.createWriteStream(compressedFile);
    tar.c(
        {
            gzip: true,
        },
        ["./__snapshots__"],
    ).pipe(writeStream);

    return new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
    });
};

const uploadFile = () => {
    const form = new FormData();
    form.append("file", new Blob([fs.readFileSync(compressedFile)]));
    form.append("fileName", "snapshots.tar.gz");
    form.append("useUniqueFileName", "false");
    form.append("folder", "/cn-ui/");
    form.append("isPrivateFile", "false");
    form.append("isPublished", "true");
    form.append("overwriteFile", "true");

    return fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: form,
        headers: {
            Authorization: "Basic " + btoa(process.env.UPLOAD_TOKEN + ":"),
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
};
const uncompress = async () => {
    const file = await fetch("https://ik.imagekit.io/cnui/cn-ui/snapshots.tar.gz").then((res) => {
        return res.arrayBuffer();
    });
    fs.outputFileSync(compressedFile, Buffer.from(file));
    tar.x({
        // or tar.extract
        file: compressedFile,
        cwd: "./",
    });
};
const arg = process.argv[2];
if (arg === "upload") {
    await compress();
    await uploadFile();
} else if (arg === "download") {
    await uncompress();
} else {
    console.log("Invalid argument");
}
