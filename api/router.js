const express = require("express");
const router = express.Router();

module.exports = controller => {
    router.get("/get-all-collections", controller.getAllCollections);
    router.get("/get-collection", controller.getCollection);
    router.get("/get-all-documents", controller.getAllDocuments);
    router.get("/get-document-by-id", controller.getDocumentById);
    router.post("/query-documents", controller.queryDocuments);

    return router;
}
