const GUN = require("gun");

const gun = GUN(['http://localhost:8080', 'http://localhost:8081']);

gun.get("name").on(node => {
    console.log(node);
});