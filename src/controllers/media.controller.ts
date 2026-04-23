import { Response } from "express"
import { IReqUser } from "../utils/interface"
import uploader from "../utils/uploader"
import response from "../utils/response"

export default {
    async single(req: IReqUser, res: Response) {
        if (!req.file) {
            return response.error(res, null, "File is required");
        }

        try {
            const result = await uploader.uploadSingle(req.file as Express.Multer.File);
            response.success(res, result, "Successfully upload a file");
        } catch (error) {
            response.error(res, null, "Failed upload a file");
        }
    },
    async multiple(req: IReqUser, res: Response) {
        if (!req.files || req.files.length === 0) {
            return response.error(res, null, "Files are not exists");
        }

        try {
            const result = await uploader.uploadMultiple(req.files as Express.Multer.File[]);
            response.success(res, result, "Success upload multiple files");
        } catch (error) {
            response.error(res, null, "Failed upload multiple files");
        }
    },
    async remove(req: IReqUser, res: Response) {
        try {
            const { fileUrl } = req.body;
            const result = await uploader.remove(fileUrl);

            response.success(res, result, "Success remove file");
        } catch (error) {
            response.error(res, null, "Failed remove file");
        }
    }
}