const express = require("express");
const router = express.Router();

const validator = require("./validator");

module.exports = controller => {
    router.get("/get-all-collections", controller.getAllCollections);
    // router.get("/get-collection", controller.getCollection);
    router.get("/:collectionName/get-all-documents", controller.getAllDocuments);
    router.post("/get-document-by-id", validator.getDocumentById, controller.getDocumentById);
    router.post("/edit-document", validator.editDocument, controller.editDocument);
    // router.post("/query-documents", controller.queryDocuments);

    router.post("/document", validator.createDocument, controller.createDocument);
    

    return router;
}
