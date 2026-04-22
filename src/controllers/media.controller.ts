import { Response } from "express"
import { IReqUser } from "../utils/interface"
import uploader from "../utils/uploader"

export default {
    async single(req: IReqUser, res: Response) {
        if (!req.file) {
            return res.status(400).json({
                message: "File is required",
                data: null
            })
        }

        try {
            const result = await uploader.uploadSingle(req.file as Express.Multer.File);
            return res.status(200).json({
                message: "Upload single success",
                data: result
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Failed upload a file",
                data: null
            })
        }
    },
    async multiple(req: IReqUser, res: Response) {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "Files are not exists",
                data: null
            })
        }

        try {
            const result = await uploader.uploadMultiple(req.files as Express.Multer.File[]);
            return res.status(200).json({
                message: "Success upload files",
                data: result
            })
        } catch {
            return res.status(500).json({
                message: "Failed upload files",
                data: null
            })
        }
    },
    async remove(req: IReqUser, res: Response) {
        try {
            const { fileUrl } = req.body;
            const result = await uploader.remove(fileUrl);

            res.status(200).json({
                data: result,
                message: "Success remove file",
            })
        } catch {
            res.status(500).json({
                data: null,
                message: "Failed remove file",
            })
        }
    }
}