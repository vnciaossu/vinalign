import commonFn from "./commonFn.js";
import BaseAPI from "../apis/apiBase.js";
import { urlBase, tableConfig } from "../constants/config.js";
export default class Table {
  constructor(clinicId) {
    this.clinicId = clinicId;
    this.tableConfig = {
      page: tableConfig.page,
      pageSize: tableConfig.pageSize,
    };
    this.document = "";
    this.patientDatas = [];
  }
  async initData() {
    await this.loadHtmlNextPage();

    this.tableConfig.totalPage = this.getLastPage();

    while (this.tableConfig.page <= this.tableConfig.totalPage) {
      this.extractTableData();
      this.tableConfig.page++;
      await this.loadHtmlNextPage();
    }
    console.log(this.patientDatas);

    return this.patientDatas;
  }

  async getTreatmentPhases(){
    this.patientDatas.forEach(async (item) => {
        if(item.storage_url){
            let html = await BaseAPI.GetPaTientRecordDetail(item.storage_url)

        }


    })
  }

  getLastPage() {
    const url = this.document.querySelector(".last a").getAttribute("href");
    const urlObject = new URL(urlBase.baseUrl + url);
    const pageValue = urlObject.searchParams.get("page");
    return pageValue ? parseInt(pageValue, 10) : null;
  }

  async loadHtmlNextPage() {
    var html = await BaseAPI.GetPaTientRecordsByClinicId(
      this.clinicId,
      this.tableConfig.page
    );
    const { document } = commonFn.htmlParser(html).window;
    this.document = document;
  }

  extractTableData(html = null) {
    let table = null;
    if (!html) {
      table = this.document.getElementsByClassName("table")[0];
    } else {
      const { document } = commonFn.htmlParser(html).window;
      table = document.getElementsByClassName("table")[0];
    }

    // Lấy tất cả các dòng (tr) từ tbody
    let rows = table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");

    // Duyệt qua từng dòng và lấy dữ liệu từ các ô (td)
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].getElementsByTagName("td");
      let rowData = {
        index: cells[0].textContent,
        name: cells[1].textContent,
        gender: cells[2].textContent,
        age: cells[3].textContent,
        number: cells[4].textContent,
        birthday: cells[5].textContent,
        status: cells[6].textContent,
        storage_url: cells[1].querySelector("a").getAttribute("href"),
      };
      this.patientDatas.push(rowData);
    }
  }
}
