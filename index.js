import BaseAPI from "./apis/apiBase.js";
import commonFn from "./functions/commonFn.js"
import Table from "./functions/table.js";
//Phòng khám Trung Tâm Chỉnh Nha Khay Trong Suốt Việt Nam
const clinicId = 152;

const table = new Table(clinicId)
await table.initData()