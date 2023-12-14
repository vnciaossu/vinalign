import httpClient, {
    FormMultiPart,
    FormUrlEncoded,
    ApplicationJson,
    POST,
    PUT,
    GET,
    DELETE
  } from "./httpClient.js";
import {urlBase} from '../constants/config.js';

class BaseAPI{
    constructor(){}

    /**
     * Lấy danh sách bệnh nhân
     * CreatedBy: tmquy (14/12/2023)
     */
    async GetClinicList(page){
        let url = [urlBase.baseUrl, urlBase.subGetClinicList.replace("{slug}", page)].join("/")
        let config = {
            url: url
        }
        let res = await httpClient.getAsync(config);  
        return res;
    }

    async GetPaTientRecordsByClinicId(id, page = 1){
        if(!id) return;
        let url = [urlBase.baseUrl, urlBase.subGetPatientRecords.replace("{PatientId}", id).replace("{slug}", page)].join("/")
        let config = {
            url: url
        }
        let res = await httpClient.getAsync(config);
        return res;
    }

    async GetTreatmentPhases(subPath){
        if(!subPath) return;
        let url = [urlBase.baseUrl, subPath].join("/")
        let config = {
            url: url
        }
        let res = await httpClient.getAsync(config);
        return res;
    }
}
export default new BaseAPI();