import {JSDOM } from "jsdom"


export default new class commonFn{
    /**
     * Ép kiểu sang HTML
     * CreatedBy: tmquy (14/12/2023)
     */
    htmlParser(html){
        const regex = /\s{2,}|\n/g; 
        return new JSDOM(html.replace(regex,""));
    }


}