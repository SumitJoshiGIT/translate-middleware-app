const path=require('path');
const controllers=require(path.join('../','controllers','settings'))
console.log(controllers)
const router=express.Router();

router.post('/keys',controllers.updateKeys);