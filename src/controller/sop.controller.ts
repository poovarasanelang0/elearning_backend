import { Sop, SopDocument } from "../models/sop.modal";
import { response, generate } from "../helper/commonResponseHandler";
import { errorMessage, clientError } from "../helper/ErrorMessage";
import { validationResult } from "express-validator";
import * as TokenManager from "../utils/tokenManager";

var activity = "Sop";

export let saveSop = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const sopData = req.body;

            // Validate fields
            if (!sopData.sopName) {
                throw new Error("SOP name is required.");
            }

            const newSop = new Sop(sopData);
            const savedSop = await newSop.save();

            response(
                req,
                res,
                activity,
                'Level-2',
                'Save-Sop',
                true,
                200,
                savedSop,
                clientError.success.savedSuccessfully
            );
        } catch (err) {
            console.error("Error saving SOP:", err);
            response(
                req,
                res,
                activity,
                'Level-3',
                'Save-Sop',
                false,
                500,
                {},
                errorMessage.internalServer,
                err.message
            );
        }
    } else {
        console.warn("Validation errors:", errors.mapped());
        response(
            req,
            res,
            activity,
            'Level-3',
            'Save-Sop',
            false,
            422,
            {},
            errorMessage.fieldValidation,
            JSON.stringify(errors.mapped())
        );
    }
};

export let getAllSop = async (req, res, next) => {
    try {
        const data = await Sop.find({ isDeleted: false });
        response(req, res, activity, 'Level-1', 'GetAll-Sop', true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetAll-Sop', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

export let updateSop = async (req, res, next) => {
    try {
        const updateData: SopDocument = req.body;
        const updatedSop = await Sop.findByIdAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    sopName: updateData.sopName,
                    pdfurl: updateData.pdfurl,
                }
            }
        );
        response(req, res, activity, 'Level-1', 'Update-Sop', true, 200, updatedSop, clientError.success.updateSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Update-Sop', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

export let getSingleSop = async (req, res, next) => {
  try {
      const { sopName } = req.query;  // Extract sopName from query params
      if (!sopName) {
          throw new Error("SOP name is required.");
      }

      const sopData = await Sop.findOne({ sopName });  // Use findOne instead of findByName
      if (!sopData) {
          return response(req, res, activity, 'Level-3', 'Get-SingleSop', false, 404, {}, 'SOP not found');
      }

      response(req, res, activity, 'Level-1', 'Get-SingleSop', true, 200, sopData, clientError.success.fetchedSuccessfully);
  } catch (err) {
      response(req, res, activity, 'Level-3', 'Get-SingleSop', false, 500, {}, errorMessage.internalServer, err.message);
  }
};


export let deletedSop = async (req, res, next) => {
    try {
        let id = req.query._id;
        let { modifiedBy, modifiedOn } = req.body;
        const sopData = await Sop.findByIdAndUpdate({ _id: id },
            {
                $set: {
                    isDeleted: true,
                    modifiedBy: modifiedBy,
                    modifiedOn: modifiedOn
                }
            });
        response(req, res, activity, 'Level-2', 'Delete-Sop', true, 200, sopData, clientError.success.deleteSuccess);
    } catch (error: any) {
        response(req, res, activity, 'Level-3', 'Delete-Sop', false, 500, {}, errorMessage.internalServer, error.message);
    }
};

export let getFilterSop = async (req, res, next) => {
    try {
        var findQuery;
        var andList: any = [];
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false });
        andList.push({ status: 1 });
        if (req.body.sopName) {
            andList.push({ sopName: req.body.sopName });
        }

        findQuery = (andList.length > 0) ? { $and: andList } : {};
        const sopList = await Sop.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page);
        const sopCount = await Sop.find(findQuery).count();
        response(req, res, activity, 'Level-2', 'Get-FilterSop', true, 200, { sopList, sopCount }, clientError.success.fetchedSuccessfully);
    } catch (err) {
        response(req, res, activity, 'Level-3', 'Get-FilterSop', false, 500, {}, errorMessage.internalServer, err.message);
    }
};
