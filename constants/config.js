const sessionConfig = {
  Name: "_vinalign_session",
  Value:
    "WElGaW9XRFFNeUlXa240OVI2TEtBMUgzVndLYjhGNlRBdHJOZktDUnBSRUlJSWlqWERCQ3lTa1ViL1RYWXJFbWFDU3N5QzFaa015VVNwK29JbmNTMUx4MlY5ZWl1WWRFK1ZMVXBDN1FsbW9IMGVFeS9NS2h6aUhGdU8wS1RTRDZ4UHQxUisvSXRpVXJGakRDbDlhMlJMeFY2ZlBnSXdkbWR0aXhGSThKbGV5UXpGTHRvSGhtZXA3dzRRNTZuTEIzT3Q1VDVnaTJVZ04zUVJ5QnpBeit0dlpzbkZobHFWUlJJbEtiVXUxYlpTcz0tLWc5cnVZd0Evb2x6RXN4aDU5ay9BNUE9PQ%3D%3D--b0cb5c967d0110f47336df37c36cbd92dab1b5ed",
};
const urlBase = {
  baseUrl: "https://admin.vinalign.com",
  subGetClinicList: "admin?page={slug}",
  subGetPatientRecords: "admin/clinics/{PatientId}/patient_records?page={slug}",
};

const tableConfig = {
  page: 1,
  pageSize: 15,
};

export { sessionConfig, urlBase, tableConfig };
