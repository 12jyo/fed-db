const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const persistantCollectionsPath = "./node-persistance-layer/collections.layer";

module.exports = (gun) => {
  return {
    // GETTERS
    getAllCollections: async function (req, res) {
      let allRecords = fs.readFileSync(persistantCollectionsPath, {encoding:'utf8', flag:'r'}).split("\n");
      allRecords.pop();
      allRecords = [...new Set(allRecords.map(el => el.split(":")[0]))];

      return res.json(allRecords);
    },
    // getCollection: function (req, res) {},
    getAllDocuments: async function (req, res) {
      let collectionName = req.params.collectionName;
      // let allRecords = fs.readFileSync(persistantCollectionsPath, {encoding:'utf8', flag:'r'})
      //   .split("\n")
      //   .filter(el => el.split(":")[0] === collectionName);
      
      // let resultSet = [];
      // for (let i = 0; i < allRecords.length; i++) {
      //   await gun.get(allRecords[i]).once((node, key, _msg, _ev) => {
      //     console.log("here")
      //     resultSet.push(node);
      //   }, );
      // }
      
      let allDocuments = gun.get(collectionName);

      let x = await allDocuments.map(doc => doc);

      console.log(x)

      return res.json(allDocuments);
    },
    // getDocumentById: function (req, res) {},
    // queryDocuments: function (req, res) {},

    // SETTERS
    createDocument: function (req, res) {
      req.body.document["id"] = uuidv4();
      let uniqueCollectionName = `${req.body.collectionName}:${req.body.document.id}` 
      gun.get(uniqueCollectionName).put(req.body.document);
      fs.appendFileSync(persistantCollectionsPath, uniqueCollectionName + "\n");

      // let collection = gun.get(req.body.collectionName);
      // let document = gun.get("document");
      // document.put(req.body.document);

      // collection.set(document)

      return res.json({
        operation: "complete"
      });
    },
  };
};
