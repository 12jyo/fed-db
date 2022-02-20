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

      console.log(allRecords)

      return res.json(allRecords);
    },
    // getCollection: function (req, res) {},
    getAllDocuments: async function (req, res) {
      let collectionName = req.params.collectionName;
      let allRecords = fs.readFileSync(persistantCollectionsPath, {encoding:'utf8', flag:'r'})
        .split("\n")
        .filter(el => el.split(":")[0] === collectionName);
      
      let resultSet = [];
      for (let i = 0; i < allRecords.length; i++) {
        await gun.get(allRecords[i]).once((node, key, _msg, _ev) => {
          let result = JSON.parse(JSON.stringify(node))
          delete result._;
          resultSet.push(result);
        }, );
      }

      return res.json(resultSet);
    },
    getDocumentById: async function (req, res) {
      const id = req.body.id;
      const collectionName = req.body.collectionName;
      let data = {};
      await gun.get(`${collectionName}:${id}`).once(node => {
        let result = JSON.parse(JSON.stringify(node))
        delete result._;
        data = result;
      });

      return res.json(data);
    },
    // queryDocuments: function (req, res) {},

    // SETTERS
    createDocument: async function (req, res) {
      req.body.document["id"] = uuidv4();
      let uniqueCollectionName = `${req.body.collectionName}:${req.body.document.id}` 
      await gun.get(uniqueCollectionName).put(req.body.document);
      fs.appendFileSync(persistantCollectionsPath, uniqueCollectionName + "\n");

      return res.json({
        operation: "complete"
      });
    },

    // RELATOR
    editDocument: async function (req, res) {
      const id = req.body.id;
      const collectionName = req.body.collectionName;
      let data = {};

      await gun.get(`${collectionName}:${id}`).once(node => {
        let result = JSON.parse(JSON.stringify(node))
        delete result._;
        data = result;
      });

      data = {
        ...data,
        ...req.body.modifiedData,
      }

      await gun.get(`${collectionName}:${id}`).put(data);

      return res.json({
        operation: "complete"
      });
    },

    // relateDocument: async function (req, res) {
    //   const id = req.body.id;
    //   const collectionName = req.body.collectionName;
    //   let data = {};

    //   await gun.get(`${collectionName}:${id}`).once(node => {
    //     let result = JSON.parse(JSON.stringify(node))
    //     delete result._;
    //     data = result;
    //   });


    //   await gun.get(`${collectionName}:${}`).put(data);

    //   data = {
    //     ...data,
    //     ...req.body.modifiedData,
    //   }

    //   return res.json({
    //     operation: "complete"
    //   });
    // },
  };
};
