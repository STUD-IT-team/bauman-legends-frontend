import {getImageAsDataURL} from "@korolion/get-image-as-dataurl/getImageAsDataURL";

export default class ImageUploader {
    popups = null;
    cropSize = null;
    compressSize = null;
    apiUpload = (dataURL) => {};

    constructor(popups, apiUpload, cropSize=null, compressSize=null) {
        this.popups = popups
        this.apiUpload = apiUpload;
        this.cropSize = cropSize;
        this.compressSize = compressSize;
    }

    async getUserImage() {
        let dataURL;
        try {
            dataURL = await getImageAsDataURL(this.cropSize, this.compressSize, undefined, Infinity);
        } catch (err) {
            this.popups.error("Ошибка загрузки изображения", err.toString());
            throw err;
        }
        return dataURL;
    }

    async upload(dataURL) {
        if (dataURL === undefined) {
            try {
                dataURL = await this.getUserImage();
            } catch {
                return;
            }
        }
        const {data, code, ok} = await this.apiUpload(dataURL);

        if (!ok) {
            this.popups.error(`Ошибка ${code}!`, `Не удалось загрузить картинку на сервер: ${JSON.stringify(data)}`);
            return;
        }
        this.popups.success('Загружено', 'Картинка загружена');
        const url = data.url;

        return url;
    }
}
