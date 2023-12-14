import axios from "axios";
import Qs from "qs";
import { sessionConfig } from "../constants/config.js";

/**
 * Lớp này dùng để thao tác với restful
 */
class AxiosHttpClient {
  async postAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contentType = ApplicationJson
  ) {
    return await this.requestAsync(
      config,
      POST,
      isShowLoading,
      isCancelRequest,
      contentType
    );
  }

  async putAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contentType = ApplicationJson
  ) {
    return await this.requestAsync(
      config,
      PUT,
      isShowLoading,
      isCancelRequest,
      contentType
    );
  }

  async deleteAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contentType = ApplicationJson
  ) {
    return await this.requestAsync(
      config,
      DELETE,
      isShowLoading,
      isCancelRequest,
      contentType
    );
  }

  async getAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contentType = ApplicationJson
  ) {
    return await this.requestAsync(
      config,
      GET,
      isShowLoading,
      isCancelRequest,
      contentType
    );
  }

  async requestAsync(
    config,
    method,
    isShowLoading = false,
    isCancelRequest = true,
    contentType = ApplicationJson
  ) {
    try {
      // Cập nhật các tham số của headers
      await this._processHeaders(config);

      // Cập nhật data
      this._processDataOrParams(config, method, contentType);

      // Thực hiện gọi service
      let result = await axios(config);

      // Trả kết quả xử lý thành công
      if (result) {
        return result.data;
      }

      // Trường hợp request bị hủy nên trả về empty dữ liệu
      return {
        Success: false,
        Data: null,
        Code: 0,
      };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  _processDataOrParams(config, method, contentType = ApplicationJson) {
    if (!config) return;

    // Xử lý method
    config.method = method;

    switch (method) {
      case GET:
        // case DELETE:
        if (config.data) {
          let queryString = Qs.stringify(config.data || {});
          if (queryString) {
            config.url = [config.url, queryString].join(
              config.url.indexOf("?") === -1 ? "?" : "&"
            );
          }
        }
        break;
      case POST:
      case PUT:
      case DELETE:
        if (contentType == FormUrlEncoded) {
          config.data = Qs.stringify(config.data || {});
        }

        break;
    }
  }

  async _processHeaders(config, contentType = ApplicationJson) {
    if (!config) return;

    // Lấy dữ liệu của headers
    let headers = config.headers || {};

    // Content type
    headers["Content-Type"] = contentType;

    headers["Cookie"] = `${sessionConfig.Name}=${sessionConfig.Value}`;
    // Cập nhật lại header
    config.headers = headers;

    //thiết lập timeout cho request
    config.timeout = 10000;

  }


  setCookie(e, t) {
    let a = encodeURIComponent(e) + "=" + encodeURIComponent(t) + ";path=/";
  }
}
// Instance của axios client
export default new AxiosHttpClient();

// Các method của http
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const GET = "GET";

// Content-type
export const ApplicationJson = "application/json";
export const FormUrlEncoded = "application/x-www-form-urlencoded";
export const FormMultiPart = "multipart/form-data";
